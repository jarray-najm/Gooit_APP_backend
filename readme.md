This is a Postman collection for an admin app that interacts with a local server running at `http://localhost:4040`. The collection contains various API endpoints for managing users, stations, and lines. Below is a detailed breakdown of each request in the collection:
### Authentication Routes

#### SignUp (POST)
- URL: `http://localhost:3000/api/v1/auth/register`
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "user"
}
```

#### Login (POST)
- URL: `http://localhost:3000/api/v1/auth/login`
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Endpoints

#### 1. Get All Users
- **Name**: all_users
- **Method**: GET
- **URL**: `http://localhost:4040/api/v1/admin/users`

#### 2. Add Station
- **Name**: add stations
- **Method**: POST
- **URL**: `http://localhost:4040/api/v1/admin/stations`
- **Body**:
  ```json
  {
    "nameStation": "Gafsa Station",
    "codeStation": "GS099",
    "addresseStation": "123 Central Ave"
  }
  ```

#### 3. Update Station
- **Name**: put station
- **Method**: PUT
- **URL**: `http://localhost:4040/api/v1/admin/stations/1`
- **Body**:
  ```json
  {
    "nameStation": "Kairoun station",
    "codeStation": "Kr123",
    "addresseStation": "123 New Address St, City"
  }
  ```

#### 4. Delete Station
- **Name**: delete station
- **Method**: DELETE
- **URL**: `http://localhost:4040/api/v1/admin/stations/5`
- **Body**:
  ```json
  {
    "nameStation": "Kairoun station",
    "codeStation": "Kr123",
    "addresseStation": "123 New Address St, City"
  }
  ```

#### 5. Get All Stations
- **Name**: get all station
- **Method**: GET
- **URL**: `http://localhost:4040/api/v1/admin/stations`

#### 6. Add Line with Stations
- **Name**: add lines with stations
- **Method**: POST
- **URL**: `http://localhost:4040/api/v1/admin/lines`
- **Body**:
  ```json
  {
    "line_name": "KT Line",
    "line_number": "102",
    "line_price": 12750.0,
    "start_time": "06:30:00",
    "stations_json": [
      {
        "nameStation": "Kairouan Station",
        "codeStation": "KR123",
        "addresseStation": "123 New Address St, City"
      },
      {
        "nameStation": "Tunis Station",
        "codeStation": "TS123",
        "addresseStation": "123 New Address St, City"
      }
    ]
  }
  ```

#### 7. Update Line
- **Name**: put line
- **Method**: PUT
- **URL**: `http://localhost:4040/api/v1/admin/lines/13`
- **Body**:
  ```json
  {
    "line_name": "KT Line",
    "line_number": "102",
    "line_price": 12750.0,
    "start_time": "06:30:00",
    "stations_json": [
      {
        "nameStation": "Kairouan Station",
        "codeStation": "KR123",
        "addresseStation": "123 New Address St, City"
      },
      {
        "nameStation": "Tunis Station",
        "codeStation": "TS123",
        "addresseStation": "123 New Address St, City"
      }
    ]
  }
  ```

#### 8. Delete Line
- **Name**: delete line
- **Method**: DELETE
- **URL**: `http://localhost:4040/api/v1/admin/lines/7`
- **Body**:
  ```json
  {
    "line_name": "KT Line",
    "line_number": "102",
    "line_price": 12750.0,
    "start_time": "06:30:00",
    "stations_json": [
      {
        "nameStation": "Kairouan Station",
        "codeStation": "KR123",
        "addresseStation": "123 New Address St, City"
      },
      {
        "nameStation": "Tunis Station",
        "codeStation": "TS123",
        "addresseStation": "123 New Address St, City"
      }
    ]
  }
  ```

#### 9. Get All Lines
- **Name**: get all lines
- **Method**: GET
- **URL**: `http://localhost:4040/api/v1/admin/lines`

#### 10. Sum Payment
- **Name**: sum payment
- **Method**: GET
- **URL**: `http://localhost:4040/api/v1/admin/sumPayments`

### Notes
- For GET requests, the body is typically not needed. The body provided in `get all station`, `get all lines`, and `sum payment` requests should be removed or ignored as GET requests do not generally send body content.
- Ensure the server is running and accessible at `http://localhost:4040` before making the requests.
- This collection can be imported into Postman to test the API endpoints and interact with the server.
# userApp API Documentation

## Overview

This document provides details on the endpoints available in the `userApp` API. The API allows for managing users, their trips, payments, and related data. The following sections describe each endpoint, its purpose, and how to use it.

## Base URL

```
http://localhost:4040/api/v1
```

## Endpoints

### 1. Get User by ID

- **Endpoint:** `/users/{id}`
- **Method:** GET
- **Description:** Retrieve user details by user ID.
- **Request Example:**
  ```http
  GET /users/2 HTTP/1.1
  Host: localhost:4040
  ```

### 2. Update User

- **Endpoint:** `/users/{id}`
- **Method:** PUT
- **Description:** Update user details.
- **Request Body:**
  ```json
  {
    "id": 2,
    "username": "Najm Jarray",
    "email": "Najm.jarray@example.com",
    "password": "$2b$10$4fhDn1DRT7uTL3bSFo2wHuWPE6f7V80fSYpZs9LoG/UTA83zrXPWe",
    "role": "admin",
    "createdAt": "2024-06-10T18:04:58.827Z",
    "updatedAt": "2024-06-10T18:04:58.827Z",
    "trips": [],
    "payments": [],
    "balanceBooks": [],
    "balance": null
  }
  ```
- **Request Example:**
  ```http
  PUT /users/2 HTTP/1.1
  Host: localhost:4040
  Content-Type: application/json

  { ... }
  ```

### 3. Delete User

- **Endpoint:** `/users/{id}`
- **Method:** DELETE
- **Description:** Delete user by ID.
- **Request Body:**
  ```json
  {
    "id": 2,
    "username": "Najm Jarray",
    "email": "Najm.jarray@example.com",
    "password": "$2b$10$4fhDn1DRT7uTL3bSFo2wHuWPE6f7V80fSYpZs9LoG/UTA83zrXPWe",
    "role": "admin",
    "createdAt": "2024-06-10T18:04:58.827Z",
    "updatedAt": "2024-06-10T18:04:58.827Z",
    "trips": [],
    "payments": [],
    "balanceBooks": [],
    "balance": null
  }
  ```
- **Request Example:**
  ```http
  DELETE /users/2 HTTP/1.1
  Host: localhost:4040
  Content-Type: application/json

  { ... }
  ```

### 4. Get Payment by User ID

- **Endpoint:** `/users/{user_id}/payments`
- **Method:** GET
- **Description:** Retrieve all payments made by a specific user.
- **Request Example:**
  ```http
  GET /users/1/payments HTTP/1.1
  Host: localhost:4040
  ```

### 5. Get All Lines

- **Endpoint:** `/users/trips/{id}`
- **Method:** GET
- **Description:** Retrieve all lines (trips) associated with a specific user.
- **Request Example:**
  ```http
  GET /users/trips/2 HTTP/1.1
  Host: localhost:4040
  ```

### 6. Get All Stations

- **Endpoint:** `/users/trips/{id}`
- **Method:** GET
- **Description:** Retrieve all stations associated with a specific user.
- **Request Example:**
  ```http
  GET /users/trips/2 HTTP/1.1
  Host: localhost:4040
  ```

### 7. Add Trip

- **Endpoint:** `/users/trips`
- **Method:** POST
- **Description:** Add a new trip for a user.
- **Request Body:**
  ```json
  {
    "user_id": 1,
    "trip_name": "Morning Commute",
    "date": "2024-06-20",
    "start_code_station": "K123",
    "end_code_station": "TS23"
  }
  ```
- **Request Example:**
  ```http
  POST /users/trips HTTP/1.1
  Host: localhost:4040
  Content-Type: application/json

  { ... }
  ```

### 8. Get Trips

- **Endpoint:** `/users/trips/{id}`
- **Method:** GET
- **Description:** Retrieve all trips associated with a specific user.
- **Request Example:**
  ```http
  GET /users/trips/2 HTTP/1.1
  Host: localhost:4040
  ```

### 9. Balance Recharge

- **Endpoint:** `/users/trips/payment`
- **Method:** POST
- **Description:** Recharge user balance.
- **Request Body:**
  ```json
  {
    "user_id": 1,
    "amount": 9.99
  }
  ```
- **Request Example:**
  ```http
  POST /users/trips/payment HTTP/1.1
  Host: localhost:4040
  Content-Type: application/json

  { ... }
  ```

### 10. Payments Trips

- **Endpoint:** `/users/trips/payment`
- **Method:** POST
- **Description:** Make a payment for a trip.
- **Request Body:**
  ```json
  {
    "user_id": 1,
    "amount": 9.99
  }
  ```
- **Request Example:**
  ```http
  POST /users/trips/payment HTTP/1.1
  Host: localhost:4040
  Content-Type: application/json

  { ... }
  ```

### 11. Get Bus Line by Name

- **Endpoint:** `/users/lines/line_name`
- **Method:** GET
- **Description:** Retrieve bus line details by line name.
- **Request Example:**
  ```http
  GET /users/lines/line_name?line_name=KS%20Line HTTP/1.1
  Host: localhost:4040
  ```

## Conclusion

This documentation provides a comprehensive overview of the available endpoints in the `userApp` API. For further details or assistance, please refer to the official API documentation or contact the support team.