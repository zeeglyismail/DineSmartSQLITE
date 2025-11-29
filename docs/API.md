# API Reference

This document gives a short, concrete reference to the main API endpoints used by the frontend and external clients.

> NOTE: These endpoints are examples. Confirm exact paths in `backend/config/urls.py` and each app's `urls.py`.

Authentication (JWT)
- POST /api/auth/token/ - obtain access and refresh tokens
- POST /api/auth/token/refresh/ - refresh an access token

Users
- GET /api/auth/users/ - list users (admin)
- POST /api/auth/users/ - create user

Menu
- GET /api/menu/items/ - list menu items
- GET /api/menu/items/{id}/ - detail
- POST /api/menu/items/ - create (admin)

Cart
- GET /api/cart/ - get current user's cart
- POST /api/cart/add/ - add item
- POST /api/cart/remove/ - remove item

Orders
- POST /api/order/create/ - place an order
- GET /api/order/{id}/ - order detail
- GET /api/order/user/ - user's orders

Tables
- GET /api/table/ - list tables
- POST /api/table/assign/ - assign table to an order/session

Error handling

Errors will typically return JSON with a message and status code. Validate responses using the Django REST Framework browsable API during development.

Extending the API

- Add a `Serializer` in `app/serializers.py`, a `ViewSet` in `app/views.py` and register it with a `router` in `app/urls.py`.
