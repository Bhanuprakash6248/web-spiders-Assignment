# **Task Management Application API**

A RESTful API for managing tasks with authentication, built using **Node.js**, **Express**, and **MongoDB**.

---

## **Table of Contents**
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Task Management](#task-management)
- [Usage Examples](#usage-examples)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## **Features**
- User authentication with JWT (Signup/Login).
- Task creation, retrieval, update, and deletion.
- Filtering, sorting, and pagination for task retrieval.
- Soft deletion of tasks.
- Input validation using Joi.
- Centralized error handling.

---

## **Technologies Used**
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for RESTful APIs.
- **MongoDB**: NoSQL database for storing tasks and users.
- **Mongoose**: ODM for MongoDB.
- **JWT**: Token-based authentication.
- **Bcrypt**: Password hashing.
- **Joi**: Input validation.

---

---

## **Setup and Run Instructions**

### **Prerequisites**

Ensure you have the following installed:
- **Node.js** (v14 or later)
- **npm** (v6 or later)
- **MongoDB** (local instance or hosted URI)

### **Steps**

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>

2. **Install Dependencies**
   ```bash
   npm install
3.**Set Up Environment Variables**
  ```plaintext
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/task_management
    JWT_SECRET=your_jwt_secret_key
```
4.**Run the Application**
```bash
  npm start
```
5.**Access the API**
The server should now be running on http://localhost:5000

## **API Endpoints**
### **Authentication**
```
Method	Endpoint	Description
POST	/users/signup	Register a new user.
POST	/users/login	Authenticate a user.
```
###**Task Management**


```Method	Endpoint	Description  
POST	/tasks	Create a new task.
GET	/tasks	Retrieve all tasks with filters.
GET	/tasks/:id	Retrieve a specific task by ID.
PUT	/tasks/:id	Update a task by ID.
DELETE	/tasks/:id	Soft-delete a task by ID.
```
## **Error Handling **
The API returns standardized error responses with appropriate HTTP status codes.
```json
{
  "message": "Task not found",
  "statusCode": 404
}
```

## **Testing**
```
Postman: Import the provided Postman collection for easier testing.
curl: Use the command line to interact with the API.
```
## **License**
```

This **README.md** provides a structured format with setup instructions, features, API details, and other essential information for your project. You can copy this and place it in the `README.md` of your GitHub repository. Let me know if any adjustments are needed!
```


