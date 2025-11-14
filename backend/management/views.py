from django.views.generic import TemplateView
from django.shortcuts import redirect, get_object_or_404
from django.contrib import messages
from django.contrib.admin.sites import site
from django.db.models import Prefetch
from django.contrib.postgres.aggregates import ArrayAgg

from menu.models import MenuItemModel
from management.models import AdminOrder, AdminOrderItem
from ingredient.models import IngredientModel
from table.models import TableModel

from order.models import OrderModel, OrderItemModel


class ManagementSiteView(TemplateView):
    template_name = "admin/management_site.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update(site.each_context(self.request))

        admin_orders = AdminOrder.objects.all().values(
            'id', 'name', 'phone', 'menu_item__name', 'amount', 'created_at', 'status'
        ).order_by('-created_at')

        orders_with_items = []
        for order in admin_orders:
            items = list(
                AdminOrderItem.objects.filter(order_id=order['id']).values(
                    'id', 'ingredient__food', 'quantity', 'price'
                )
            )
            order['items'] = items
            orders_with_items.append(order)

        context['admin_orders'] = orders_with_items


        customer_orders = OrderModel.objects.all().values(
            'id', 'order_id', 'order_date', 'amount', 'order_status',
            'user__email', 'is_order_verified'
        ).order_by('-order_date')

        orders_with_items_customer = []
        for order in customer_orders:
            items = list(
                OrderItemModel.objects.filter(order_id=order['id']).values(
                    'id', 'item_name', 'quantity', 'item_price', 'table_numbers'
                )
            )
            
            table_numbers = []
            for item in items:
                if item['table_numbers']:
                    table_numbers.extend(item['table_numbers'].split(','))

            order['items'] = items
            order['table_numbers'] = table_numbers
            orders_with_items_customer.append(order)

        context['customer_orders'] = orders_with_items_customer

        return context

    def post(self, request, *args, **kwargs):
        management_order_id = request.GET.get('management_order_id')
        if management_order_id:
            order = get_object_or_404(AdminOrder, id=management_order_id)
            order.status = request.POST.get('status', order.status)
            order.save()
            messages.success(request, "Order status updated successfully!")
            return redirect('management_site')
        customer_order_id = request.GET.get('customer_order_id')
        if customer_order_id:
            payment_status = request.POST.get('payment_status', 'CASH')
            order = get_object_or_404(OrderModel, id=customer_order_id)

            if payment_status=='paid':
                order.is_order_verified = True
                order.save()
                return redirect('management_site')
            
            order.order_status = request.POST.get('status', order.order_status)
            order.save()
            if request.POST.get('status') == 'delivered' or request.POST.get('status') == 'cancelled' :
                order_items = order.items.all()
                for item in order_items:
                    tables = item.get_table_numbers_list()
                    TableModel.objects.filter(id__in=tables).update(table_status='available')
            messages.success(request, "Order status updated successfully!")
            return redirect('management_site')

        messages.error(request, "Invalid order ID.")
        return redirect('management_site')
    


class CreateOrderView(TemplateView):
    template_name = "admin/create_order.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update(site.each_context(self.request))
        context['menu_items'] = list(MenuItemModel.objects.values())
        return context
    
    def post(self, request, *args, **kwargs):
        name = request.POST.get("name")
        phone = request.POST.get("phone")
        menu_id = request.POST.get("menu")
        amount = request.POST.get("amount")

        ingredient_ids = request.POST.getlist("ingredient_ids")
        ingredient_data = []

        for ing_id in ingredient_ids:
            quantity = request.POST.get(f"ingredient_{ing_id}_quantity")
            try:
                ingredient = IngredientModel.objects.get(id=ing_id)
                quantity = int(quantity)
                price = ingredient.price
                ingredient_data.append((ingredient, quantity, price))
            except:
                continue

        if not (name and phone and menu_id and amount):
            messages.error(request, "Missing required fields.")
            return self.render_to_response({
                'error': "Missing required fields.",
                'menu_items': MenuItemModel.objects.all()
            })

        order = AdminOrder.objects.create(
            name=name,
            phone=phone,
            menu_item_id=menu_id,
            amount=amount,
        )

        for ing, qty, price in ingredient_data:
            AdminOrderItem.objects.create(
                order=order,
                ingredient=ing,
                quantity=qty,
                price=price,
            )

        messages.success(request, "Order created successfully!")
        return redirect("management_site")  # replace with your actual success page
