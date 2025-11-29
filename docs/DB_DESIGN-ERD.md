erDiagram

    %% ============================
    %% USER & AUTHENTICATION
    %% ============================

    USER_ACCOUNT {
        int id PK
        string email
        string phone_number
        string name
        bool is_active
        bool is_customer
        bool is_admin
    }

    OTP {
        int id PK
        string email
        string otp
        bool is_used
        datetime created_at
        datetime expires_at
    }

    USER_ACCOUNT ||--o{ OTP : "receives"


    %% ============================
    %% ADDRESS SYSTEM
    %% ============================

    ADDRESS {
        int id PK
        string email
        string phone
        int user_id FK
        string label
        string address_line1
        string address_line2
        string city
        string postal_code
        bool is_default
    }

    USER_ACCOUNT ||--o{ ADDRESS : "has"


    %% ============================
    %% MENU & INGREDIENTS
    %% ============================

    MENU_ITEM {
        int id PK
        string name
        string description
        string price_type
        decimal price
        string thumbnail
        string picture
        bool is_special
        bool is_first_menu
        bool is_table_menu
    }

    INGREDIENT {
        int id PK
        string food
        float weight
        float calories
        decimal price
        string picture
        bool priority
    }

    USED_INGREDIENT {
        int id PK
        int menu_item_id FK
        int ingredient_id FK
        float quantity
    }

    MENU_ITEM ||--o{ USED_INGREDIENT : "uses"
    INGREDIENT ||--o{ USED_INGREDIENT : "ingredient"


    %% ============================
    %% SAVED ITEMS (CUSTOM MEALS)
    %% ============================

    SAVED_ITEM {
        int id PK
        string custom_name
        string custom_description
        int user_id FK
        int menu_item_id FK
        int amount
        bool is_display
    }

    SAVED_ITEM_INGREDIENT {
        int id PK
        int saved_item_id FK
        int ingredient_id FK
        float quantity
    }

    USER_ACCOUNT ||--o{ SAVED_ITEM : "saves"
    MENU_ITEM ||--o{ SAVED_ITEM : "base menu"
    SAVED_ITEM ||--o{ SAVED_ITEM_INGREDIENT : "has ingredients"
    INGREDIENT ||--o{ SAVED_ITEM_INGREDIENT : "ingredient"


    %% ============================
    %% CART SYSTEM
    %% ============================

    CUSTOM_CART {
        int id PK
        int user_id FK
        string order_type
        string menu_item_id    %% denormalized
        int meals_id FK        %% SavedItem
        string item_name
        decimal item_price
        int quantity
        string picture
        string table_numbers    %% csv
        bool is_active
    }

    USER_ACCOUNT ||--o{ CUSTOM_CART : "has cart"
    SAVED_ITEM ||--o{ CUSTOM_CART : "custom meals"


    %% ============================
    %% ORDERS
    %% ============================

    ORDER {
        int id PK
        int user_id FK
        string order_id
        datetime order_date
        string order_status
        decimal amount
        int address_id FK
        bool is_table_booked
        bool is_take_away
        bool is_home_delivery
        string payment_status
    }

    ORDER_ITEM {
        int id PK
        int order_id FK
        string order_type
        string menu_item_id    %% denormalized
        int meals_id FK
        string item_name
        decimal item_price
        int quantity
        string item_image
        string table_numbers   %% csv
    }

    USER_ACCOUNT ||--o{ ORDER : "places"
    ORDER ||--o{ ORDER_ITEM : "has"


    %% ============================
    %% TABLE BOOKING (DINE-IN)
    %% ============================

    TABLE {
        int id PK
        string table_id
        int table_number
        int total_seats
        int booked_seats
        int available_seats
        string table_status
    }

    %% (Note: order_item.table_numbers is denormalized)
    ORDER_ITEM }o--o{ TABLE : "table_numbers (denormalized)"


    %% ============================
    %% ADMIN ORDER SYSTEM
    %% ============================

    ADMIN_ORDER {
        int id PK
        string name
        string phone
        int menu_item_id FK
        decimal amount
        string status
    }

    ADMIN_ORDER_ITEM {
        int id PK
        int order_id FK
        int ingredient_id FK
        float quantity
        decimal price
    }

    MENU_ITEM ||--o{ ADMIN_ORDER : "admin selects"
    ADMIN_ORDER ||--o{ ADMIN_ORDER_ITEM : "contains"
    INGREDIENT ||--o{ ADMIN_ORDER_ITEM : "ingredient"
