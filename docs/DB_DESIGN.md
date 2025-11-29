# DineSmart — Database Design

This document describes the backend database design for the DineSmart project (Django models -> DB tables), including table names, primary fields, relationships, on-delete behaviors, important constraints/indexes, known denormalizations, and suggested improvements.

Note: Table/column metadata is based on the Django model definitions in `backend/*/models.py` as of this repository snapshot.

## High-level overview

- Backend uses Django ORM models. Most models declare `db_table` explicitly, so the table names are predictable. Many timestamp fields come from `common.models.TimeStamp` (abstract base) with `created_at` and `updated_at`.
- Important domains: authentication (users), menu and ingredients, saved items and used ingredients, carts and orders (customer and admin), tables (dine-in), addresses.

## Tables (models) — summary

Below each model: table name, key fields, relationships (FK), on_delete behavior, and notes.

### authentication.UserAccount
- db_table: `user_account`
- Primary fields: `id` (auto), `email` (unique), `phone_number` (unique), `name`, `is_active`, `is_staff`, `is_superuser`, `is_admin`, `is_customer`, `is_verified`.
- Unique/indexes: `email` unique, `phone_number` unique (validator applied).
- Notes: Custom user model subclassing `AbstractBaseUser`. `USERNAME_FIELD` = `email`.

### authentication.Otp
- db_table: `otp`
- Fields: `email`, `otp`, `is_used`, `created_at`, `expires_at`.

### ingredient.IngredientModel
- db_table: `ingredient`
- Fields: `id`, `food` (Char), `weight`, `calories`, `priority` (bool), `thumbnail` (URL), `price` (Decimal), `picture` (ImageField)
- Notes: Used by `UsedIngredientModel` and `SavedItemIngredientModel`. __on_delete__ for FK in other models is often DO_NOTHING — this requires manual cleanup of references.

### menu.MenuItemModel
- db_table: `menu_item`
- Fields: `id`, `name` (unique), `description`, `price_type` (choices), `price` (decimal), `thumbnail`, `picture`, `is_first_menu`, `is_special`, `is_table_menu`, timestamps from TimeStamp
- Notes: `name` unique constraint.

### used_ingredient.UsedIngredientModel
- db_table: `used_ingredient`
- Fields: `id`, `menu_item_id` (FK -> `menu_item`, on_delete=DO_NOTHING), `ingredient_id` (FK -> `ingredient`, on_delete=DO_NOTHING), `quantity`.
- Notes: This joins menu items to ingredient records, representing recipe composition. Because FKs use DO_NOTHING, deleting the referenced ingredient or menu item may leave rows pointing to nonexistent records — delete used-ingredient rows first.

### saved_item.SavedItemModel
- db_table: `saved_item`
- Fields: `id`, `custom_name`, `custom_description`, `user_id` (FK -> `user_account`, on_delete=CASCADE), `menu_item` (FK -> `menu_item`, on_delete=DO_NOTHING), `amount`, `is_display`.

### saved_item.SavedItemIngredientModel
- db_table: `saved_item_ingredient`
- Fields: `id`, `saved_item_id` (FK -> `saved_item`, CASCADE), `ingredient_id` (FK -> `ingredient`, DO_NOTHING), `quantity`.

### cart.CustomCartModel
- db_table: `custom_cart`
- Fields: `id`, `user_id` (FK -> `user_account`, CASCADE), `amount`, `order_type`, `menu_item_id` (string, not FK), `meals_from`, `meals` (FK -> `saved_item`, CASCADE, optional), `item_name`, `item_price`, `quantity`, `picture`, `table_numbers` (char), `is_active`, `deleted`.
- Notes: `menu_item_id` is stored as a string (not a foreign key). `table_numbers` is comma-separated table numbers (denormalized). Use caution when deleting or renaming menu items.

### order.OrderModel
- db_table: `order`
- Fields: `id`, `user_id` (FK -> `user_account`, CASCADE), `order_id` (unique string), `order_date`, `order_status`, `amount`, `address` (string), `address_id` (FK -> `address.Address`, CASCADE, nullable), `is_user_verified`, `is_address_verified`, `is_order_verified`, `is_table_booked`, `is_take_away`, `is_home_delivery`, `is_active`, `deleted`, `payment_status`.
- Notes: Deleting a user will cascade to delete orders (on_delete=CASCADE).

### order.OrderItemModel
- db_table: `order item`
- Fields: `id`, `order_id` (FK -> `order.OrderModel`, CASCADE), `order_type`, `menu_item_id` (string), `meals_from`, `meals` (FK -> `saved_item.SavedItemModel`, CASCADE, nullable), `item_name`, `item_price`, `quantity`, `item_description`, `item_image`, `table_numbers` (Char storing comma-separated table numbers).
- Helpers: `get_table_numbers_list()` exists to convert `table_numbers` into a list of ints.
- Notes: Denormalized: `menu_item_id` and `item_image` are stored as string/URL; historical snapshot design for order items is common but should be consistent.

### table.TableModel
- db_table: `table`
- Fields: `id` (auto), `table_id` (string unique, default uuid), `table_number` (unique integer), `total_seats`, `booked_seats`, `available_seats`, `table_status` (choices), `condition_seats`, `condition_order`.

### management.AdminOrder and AdminOrderItem
- db_table: `admin_order` and `admin_order_item`
- `AdminOrder`: `id`, `name`, `phone`, `menu_item` (FK -> `menu_item`, CASCADE), `amount`, `created_at`, `status`.
- `AdminOrderItem`: `order` (FK -> `admin_order`, CASCADE), `ingredient` (FK -> `ingredient`, CASCADE), `quantity`, `price`.

### address.Address
- db_table: `address`
- Fields: `id`, `email`, `phone`, `user_id` (FK -> `user_account`, CASCADE), `label`, `address_line1`, `address_line2`, `city`, `postal_code`, `is_default`, timestamps.

## Notable denormalizations and anti-patterns

- `OrderItemModel.table_numbers` stores a comma-separated list of table numbers. This is a denormalized representation and makes joins/queries and referential integrity harder. The management code expects a list of table numbers and currently uses those values to update `TableModel`.
- `CustomCartModel.menu_item_id` and `OrderItemModel.menu_item_id` are stored as CharFields rather than FKs to `MenuItemModel`. This may be a deliberate choice for historical snapshots but it prevents referential integrity and makes queries less efficient.

## Indexes and constraints to be aware of

- Unique constraints: `UserAccount.email`, `UserAccount.phone_number`, `MenuItemModel.name`, `TableModel.table_id`, `TableModel.table_number`, `OrderModel.order_id`.
- Frequently searched fields (and often indexed in the code or admin): `UserAccount.email`, `UserAccount.phone_number`, `Address.phone`, `Address.email`, `MenuItemModel.name`.

## on_delete behavior summary

- CASCADE: used where deleting parent should remove children (e.g., `OrderModel.user` -> cascade, `SavedItemModel.user` -> cascade, `SavedItemIngredientModel.saved_item` -> cascade, `Cart.user` -> cascade, many order-related FKs).
- DO_NOTHING: used for certain relationships such as `UsedIngredientModel.menu_item` and `UsedIngredientModel.ingredient`, and `SavedItemModel.menu_item`. DO_NOTHING preserves the referenced id even if the referenced row is deleted — this requires manual cleanup and careful delete ordering.

## Potential data integrity issues observed

- Using DO_NOTHING in join tables (used_ingredient, saved item ingredients) means deleting ingredients or menu items can leave orphan rows. Admin workflows must delete used_ingredient rows first (documented in the admin guide).
- `OrderItem.table_numbers` vs `TableModel` `table_number` vs `id` mismatch: management view in `management/views.py` updates `TableModel.objects.filter(id__in=tables)`, while `tables` is derived from `table_numbers` which likely contains `table_number` values. This can fail to free tables correctly.

## Suggested improvements (practical refactors)

1. Normalize tables relation
   - Create a proper many-to-many relationship between `OrderItem` (or Order) and `TableModel` via a through table `order_item_table` with FK references. This removes string parsing and enables referential integrity and fast joins.

2. Use FK for menu items where appropriate
   - If historical snapshots are not required, change `menu_item_id` string fields to FK to `MenuItemModel`. If you need snapshots, consider storing both FK and snapshot fields (name/price) and use CASCADE or SET_NULL depending on policy.

3. Revisit DO_NOTHING usage
   - Replace DO_NOTHING with either CASCADE, SET_NULL, or PROTECT for relationships where orphan rows would be undesirable, or add database triggers/checks and admin safeguards.

4. Add indexes for frequent queries
   - Ensure `OrderModel.order_date`, `OrderModel.order_status`, `MenuItemModel.is_special`, and `TableModel.table_status` are indexed if used in list/filters frequently.

5. Fix management view table-freeing logic
   - In `management/views.py` change table freeing to filter by `table_number__in=tables` (if `table_numbers` holds numbers) or ensure table IDs are stored and used consistently.

6. Consider migrating image URL fields
   - The models mix ImageField and URLField for pictures. Standardize on ImageField for uploaded assets and keep thumbnail/URL fields for CDN-hosted images.

## Suggested ER diagram (text)

Users (user_account) 1---* Addresses (address)
Users 1---* Orders (order)
Orders 1---* OrderItems (order item)
OrderItems *---* Tables (via table_numbers denormalized)  <-- recommend change to M2M

MenuItem 1---* UsedIngredient -> Ingredient
SavedItem 1---* SavedItemIngredient -> Ingredient
SavedItem *---1 MenuItem
Cart entries reference SavedItem or store menu_item_id string

## Operational recommendations

- Back up DB before running bulk deletes or migrations that change FK behaviors.
- When deleting ingredients or menu items, delete dependent used-ingredient rows first or implement cascading/constraint changes.
- Add database migrations to change DO_NOTHING to safer on_delete behaviors after auditing usage.

---
If you'd like, I can:
- generate a Mermaid ER diagram file for the repo, or
- prepare migration stubs to normalize the `table_numbers` and `menu_item_id` fields, or
- implement the `TableModel` freeing fix in `backend/management/views.py` with tests.

Generated from reviewing `backend/*/models.py` in the repository snapshot.
