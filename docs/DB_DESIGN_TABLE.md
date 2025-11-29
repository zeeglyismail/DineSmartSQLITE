📄 DineSmart — Table-by-Table Database Schema (TXT)
============================================================
==================== AUTHENTICATION =====================
Table: user_account

id (PK, int, auto)

email (string, unique)

phone_number (string, unique)

name (string)

password (hashed)

is_active (bool)

is_staff (bool)

is_superuser (bool)

is_admin (bool)

is_customer (bool)

is_verified (bool)

created_at (datetime)

updated_at (datetime)

Table: otp

id (PK)

email (string)

otp (string)

is_used (bool)

created_at (datetime)

expires_at (datetime)

============================================================
======================== ADDRESS =========================
Table: address

id (PK)

user_id (FK → user_account.id, CASCADE)

email (string)

phone (string)

label (string)

address_line1 (string)

address_line2 (string)

city (string)

postal_code (string)

is_default (bool)

created_at (datetime)

updated_at (datetime)

============================================================
=================== MENU & INGREDIENTS ==================
Table: menu_item

id (PK)

name (string, unique)

description (text)

price_type (choice)

price (decimal)

thumbnail (URL)

picture (image)

is_first_menu (bool)

is_special (bool)

is_table_menu (bool)

created_at (datetime)

updated_at (datetime)

Table: ingredient

id (PK)

food (string)

weight (float)

calories (float)

priority (bool)

thumbnail (URL)

picture (image)

price (decimal)

Table: used_ingredient

id (PK)

menu_item_id (FK → menu_item.id, DO_NOTHING)

ingredient_id (FK → ingredient.id, DO_NOTHING)

quantity (float)

============================================================
===================== SAVED ITEMS =======================
Table: saved_item

id (PK)

custom_name (string)

custom_description (text)

user_id (FK → user_account.id, CASCADE)

menu_item_id (FK → menu_item.id, DO_NOTHING)

amount (int)

is_display (bool)

Table: saved_item_ingredient

id (PK)

saved_item_id (FK → saved_item.id, CASCADE)

ingredient_id (FK → ingredient.id, DO_NOTHING)

quantity (float)

============================================================
========================== CART ==========================
Table: custom_cart

id (PK)

user_id (FK → user_account.id, CASCADE)

order_type (string)

menu_item_id (string, NOT FK)

meals_id (FK → saved_item.id, CASCADE, nullable)

item_name (string)

item_price (decimal)

quantity (int)

picture (URL)

table_numbers (string, CSV)

is_active (bool)

deleted (bool)

============================================================
========================== ORDER =========================
Table: order

id (PK)

user_id (FK → user_account.id, CASCADE)

order_id (string, unique)

order_date (datetime)

order_status (string)

amount (decimal)

address (string)

address_id (FK → address.id, CASCADE, nullable)

is_user_verified (bool)

is_address_verified (bool)

is_order_verified (bool)

is_table_booked (bool)

is_take_away (bool)

is_home_delivery (bool)

is_active (bool)

deleted (bool)

payment_status (string)

Table: order_item

id (PK)

order_id (FK → order.id, CASCADE)

order_type (string)

menu_item_id (string, NOT FK)

meals_id (FK → saved_item.id, CASCADE, nullable)

item_name (string)

item_price (decimal)

quantity (int)

item_description (text)

item_image (string/URL)

table_numbers (string, CSV)

============================================================
====================== TABLE BOOKING =====================
Table: table

id (PK)

table_id (string, unique, UUID)

table_number (int, unique)

total_seats (int)

booked_seats (int)

available_seats (int)

table_status (choice)

condition_seats (string)

condition_order (string)

============================================================
====================== ADMIN ORDERS ======================
Table: admin_order

id (PK)

name (string)

phone (string)

menu_item_id (FK → menu_item.id, CASCADE)

amount (decimal)

created_at (datetime)

status (string)

Table: admin_order_item

id (PK)

order_id (FK → admin_order.id, CASCADE)

ingredient_id (FK → ingredient.id, CASCADE)

quantity (float)

price (decimal)