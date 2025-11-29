## DineSmart — Admin Panel Usage

This document explains how to use the Django admin panel for DineSmart (backend). It summarizes the admin pages that are registered, how to create and manage Ingredients, Menu Items, Used Ingredients, Tables, and how to use the custom Order Management UI.

Note: the project uses Jazzmin to customize the admin interface. The custom Order Management view is available via the top menu / user menu (labelled "ORDER MANAGEMENT") and the side menu link configured in `backend/config/jazzmin_settings.py`.

|.............................................
|          Ingredients and Menu Entry
|.............................................
step 1: First input ingredient with (food, price, photo) by click 'Ingredient' button on side bar

step 2: Secondly entry MENU with (Name, Price, Picture, Is first menu, Is special , Is table menu) by click 'Menu Item' button on side bar
	Here:
	- Is first menu means it will be display first of the menu list
	- Is special means if you checked then display in banner section this menu in home page
	- Is table menu means if you checked then display in menu list (in three pages table menu, delivery menu list, take away menu list)

step 3: Now use ingredients in Menu by click 'Used Ingredient' button with select (Menu Item, Ingredient, Quantity)

Implementation notes (models):
- Ingredient: `ingredient.models.IngredientModel` — fields of interest: `food`, `price`, `picture` (ImageField), `thumbnail`, `calories`, `priority`.
- Menu Item: `menu.models.MenuItemModel` — fields of interest: `name`, `description`, `price_type`, `price`, `picture`, `is_first_menu`, `is_special`, `is_table_menu`.
- Used Ingredient: `used_ingredient.models.UsedIngredientModel` — links `menu_item` to `ingredient` with a `quantity`.

|.............................................
|          Ingredients and Menu Edit
|.............................................
You can edit any ingredient or menu item from the admin list view. Click the item (ID/name) to open the edit form. Fields like image uploads for `picture` are supported by the ImageField — ensure MEDIA is configured in Django settings when uploading.

|.............................................
|          Ingredients Delete 
|.............................................
step 1: First you need to delete all rows in 'Used Ingredient' of specific Ingredient For delete Ingredient

step 2: Delete this Ingredient in 'Ingredient' button in side bar

Reason: `UsedIngredientModel` references `IngredientModel` with on_delete=DO_NOTHING, so keep used ingredient rows removed first to avoid inconsistency.

|.............................................
|          Menu Item Delete 
|.............................................
step 1: First you need to delete all rows in 'Used Ingredient' of specific Menu Item For delete menu item

step 2: If this menu already used in cart or order then Menu Item can not delete, You can deactivate by uncheck is_active

step 3: Delete this Menu Item

Details: Menu items are connected to `SavedItemModel`, `CustomCartModel`, `OrderItemModel` indirectly (menu ids and saved items). If a menu item is referenced by carts/orders, deletion may fail or cause inconsistency — prefer deactivating (uncheck `is_active`) where available.

|.............................................
|          Table Entry
|.............................................
step 1: Entry table information with (Table number, Total seats, Available seats, Table status)

Model: `table.models.TableModel` fields include `table_number`, `total_seats`, `booked_seats`, `available_seats`, `table_status` (choices defined in `common.table_info.TableStatus`).

|.............................................
|          Table Edit and Delete
|.............................................
step 1: Edit or Delete directly via the `Table` admin page. Search by `table_number` or `table_id`.

Notes on deletion: Deleting tables that are referenced by orders or bookings may leave orphaned references (orders store table numbers in OrderItem.table_numbers as comma-separated numbers). Review orders before removing tables.

|.............................................
|          Order Management (custom admin page)
|.............................................
Where: The project provides a custom Order Management UI at the admin area (template: `templates/admin/management_site.html`). It is wired to the view `management.views.ManagementSiteView` and URL name `management_site` (see `backend/management/urls.py`). Jazzmin adds it to top and user menus.

What you see:
- Management Order History (admin-created orders): shows `AdminOrder` entries from `management.models`. Columns: ID, Name, Phone, Menu Item, Amount, Created At, Status, Items, Actions.
- Customer Order History: lists `OrderModel` (customer-created) with order id, phone, email, date, status, amount, items, tables, payment, and actions.

Actions available (from UI):
- Change order status: Use the dropdown in the Actions column for either management or customer orders. For management orders the dropdown options include: `requested`, `cooking`, `delivered`, `cancelled`.
- For customer orders the dropdown options include: `requested`, `cooking`, `served`, `delivered`, `cancelled`.
- Payment confirm (Customer orders): click the `PAID` button in the Actions column to mark payment as verified.

What the backend does (important):
- Changing a Management order status simply updates `AdminOrder.status` in the DB and shows a success message.
- For Customer orders, POST handling in `ManagementSiteView.post` does the following:
  - If `payment_status == 'paid'`, sets `order.is_order_verified = True` and saves (marks order as paid).
  - Otherwise updates `order.order_status` from the submitted `status` and saves.
  - If the new status is `delivered` or `cancelled`, the code iterates `order.items` and for each item calls `get_table_numbers_list()` on `OrderItemModel` and then updates `TableModel.objects.filter(id__in=tables).update(table_status='available')`.

Important caution and recommended improvement:
- The view updates tables by matching the numbers from OrderItem.table_numbers against `TableModel.id` (DB primary key). In this project `table_numbers` appears to hold table numbers (e.g., 1,3,4), while `TableModel` has a separate `table_number` field. That mismatch may prevent table freeing from working. Consider changing the query to filter by `table_number__in=tables` instead, or store table IDs in `table_numbers` consistently.

Creating Admin Orders:
- The management UI includes a `+ Add New` button that links to the `create_order` view (`management.views.CreateOrderView`). There you can provide: `name`, `phone`, `menu` (menu item), `amount`, and select ingredient quantities to build an Admin order. The view creates an `AdminOrder` and `AdminOrderItem` rows.

Where to edit behaviors:
- Template: `backend/templates/admin/management_site.html` — edit markup or styles.
- Views: `backend/management/views.py` — change available statuses, payment logic, or table freeing logic.

|.............................................
|          Admin model registrations (quick map)
|.............................................
- Ingredient: registered in `backend/ingredient/admin.py` as `IngredientAdmin` (list_display includes `picture_display`).
- Menu Item: registered in `backend/menu/admin.py` as `MenuItemAdmin` (list_display includes flags `is_first_menu`, `is_special`, `is_table_menu`).
- Used Ingredient: registered in `backend/used_ingredient/admin.py` (custom `UsedIngredientAdmin`).
- Table: registered in `backend/table/admin.py` as `TableAdmin` (searchable by `table_number`).
- UserAccount: registered in `backend/authentication/admin.py` (custom `UserAccountAdmin`).

|.............................................
|          User management (Create / Activate / Edit / Delete)
|.............................................
Create user via Admin:
1. Open the Django admin site and click the `UserAccount` entry (labelled Users/User Accounts depending on Jazzmin theme).
2. Click "Add" (the + button) to create a new user. Fill fields: `email`, `phone_number`, `name` and any optional fields (gender, date_of_birth, etc.).
3. If the admin add form does not show a password field (depends on ModelAdmin setup), create the user via the command line instead:

	 ```bash
	 python backend/manage.py createsuperuser --email you@example.com
	 ```

Activate / Deactivate a user:
- In the `UserAccount` list page you can toggle `is_active` by editing the user and unchecking/checking the `is_active` field. Prefer deactivation over deletion when the user has associated data (orders, addresses, carts).

Edit user details:
- Click the user's email (list link) to open the edit form. Update fields such as `phone_number`, `name`, `is_staff`, `is_superuser`, etc., and save.

Delete user:
- Deleting a user will cascade or affect related objects (addresses, orders, carts) depending on model relations. The safe approach is:
	1. Review related objects (orders, addresses, saved items). Decide whether to reassign, archive, or delete them.
	2. Prefer setting `is_active = False` if you want to retain historical data while preventing login.
	3. If deletion is required, back up the DB and delete the user from the admin; be aware that `OrderModel` references `UserAccount` with on_delete=models.CASCADE, so deleting a user will delete related orders.

Notes and cautions:
- `UserAccount` is a custom user model (`authentication.models.UserAccount`) that subclasses `AbstractBaseUser`. The admin registration at `backend/authentication/admin.py` registers `UserAccount` with a simple `ModelAdmin`. If you find missing password or create-user issues via admin, use `manage.py createsuperuser` or add a custom `UserCreationForm`/`UserChangeForm` in the admin registration.
- Always back up before deleting users or running bulk operations.

Some admin files are present but empty (no explicit registrations): `management/admin.py`, `order/admin.py`, `cart/admin.py`, `customer_api/admin.py`, `address/admin.py`, `saved_item/admin.py`, `common/admin.py`. If you need admin access for these models, register them by adding ModelAdmin classes and registering them.

|.............................................
|          Tips and small checklist for common tasks
|.............................................
- Always back up your DB before doing bulk deletes (especially ingredients, menu items, used ingredient rows, tables).
- To safely delete an Ingredient: remove all `UsedIngredientModel` rows referencing it first.
- To safely delete a Menu Item: remove its `UsedIngredientModel` rows; if the menu item appears in carts/orders, prefer setting `is_active` (or `is_display`) to False instead of deleting.
- When uploading images through the admin, ensure Django MEDIA settings and the MEDIA_URL/MEDIA_ROOT are configured and served correctly in dev/prod.
- Use the custom management page to handle customer order statuses and payment confirmations — it's easier than editing individual `OrderModel` rows.

|.............................................
|          Where to change admin layout or labels
|.............................................
- To change the admin side/top menu entries or add custom buttons, edit `backend/config/jazzmin_settings.py`.
- To change list columns or searchable fields for a model, update the corresponding `admin.py` (e.g., `ingredient/admin.py` or `menu/admin.py`).
- To add actions (bulk actions) create methods on ModelAdmin and add them to `actions = [...]`.

|.............................................
|          Next steps / Improvements you may want
|.............................................
1. Fix table freeing logic: use `table_number__in` when `table_numbers` stores table numbers, or store `table_id`s in `OrderItem.table_numbers`.
2. Register other models (orders, carts, saved items) with admin for quick inspection.
3. Add bulk actions for common operations (mark orders paid, free tables, deactivate menu items).

---
Generated from a code review of the backend models and admin files (Django project). If you'd like, I can:
- create or update admin registrations for missing models,
- add an explicit admin page for `AdminOrder` (so admin can edit AdminOrder rows from the admin site), or
- fix the table freeing logic and add a unit test.
