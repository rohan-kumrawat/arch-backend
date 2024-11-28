---

# Architect Portfolio Website - Backend

This repository contains the backend code for the architect portfolio website, which allows admins to manage projects, clients to review and rate projects, and guests to submit project requirements. It is built using **Node.js**, **Express.js**, and **MongoDB**.

## **Features**
- **Admin Features:**
  - Login and Authentication
  - Manage Projects (Create, Read, Update, Delete)
  - Manage Slider Images
  - View Messages from Guest Users

- **Client Features:**
  - Signup and Login
  - Rate and Review Projects
  - Update/Delete Reviews

- **Guest Features:**
  - Submit Project Requirements without Logging In
  - View All Projects and Project Details

## **Tech Stack**
- **Backend Framework**: Node.js, Express.js
- **Database**: MongoDB, MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **Password Encryption**: bcrypt
- **Cloud Storage**: For storing project images and slider images

## **Installation and Setup**

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/architect-portfolio-backend.git
cd architect-portfolio-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory with the following variables:
```env
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
PORT=5000
```

### 4. Run the Server
```bash
npm start
```
The server will run on `http://localhost:5000`.

## **API Endpoints**

### **Admin Routes**
- **POST `/api/admin/login`** - Admin login
- **POST `/api/admin/project`** - Add a new project
- **PUT `/api/admin/project/:id`** - Update an existing project
- **DELETE `/api/admin/project/:id`** - Delete a project
- **POST `/api/slider`** - Upload a new slider image
- **GET `/api/slider`** - Get all slider images
- **DELETE `/api/slider/:id`** - Delete a slider image

### **Client Routes**
- **POST `/api/client/signup`** - Client signup
- **POST `/api/client/login`** - Client login
- **POST `/api/client/review`** - Add a new review for a project
- **PUT `/api/client/review/:id`** - Update an existing review
- **DELETE `/api/client/review/:id`** - Delete a review

### **Public Routes**
- **GET `/api/public/all-projects`** - Get all projects
- **GET `/api/public/project/:id`** - Get details of a single project

### **Guest Routes**
- **POST `/api/guest/message`** - Submit a project requirement message
- **GET `/api/guest/message`** - Get all guest messages (Admin only)

## **Database Schema**

### **Admin Schema**
- `username`: Unique admin username
- `password`: Hashed password for authentication

### **Client Schema**
- `name`: Client's full name
- `email`: Unique email address
- `password`: Hashed password for authentication
- `phone`: Client's phone number

### **Message Schema**
- `name`: Name of the guest user
- `number`: Phone number of the guest user
- `requirement`: Project requirement description (optional)

### **Project Schema**
- `title`: Project title
- `description`: Project description
- `images`: Array of project image URLs
- `createdAt`: Timestamp when the project was added

### **Review Schema**
- `projectId`: Reference to the associated project
- `clientId`: Reference to the client who submitted the review
- `rating`: Rating for the project (1-5)
- `review`: Textual review of the project

### **Slider Schema**
- `imageUrl`: URL of the image for the home page slider
- `uploadedAt`: Timestamp when the slider image was uploaded

## **Authentication**
- **JWT** is used for secure authentication. Admins and clients receive a token upon successful login.
- Use the token for authorized requests to protected routes.

## **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This **README** should be a good starting point for documenting your backend project. It includes the installation steps, usage instructions, API endpoints, and details of the data models. You can replace placeholders like `your-username` with your actual GitHub username and modify the setup instructions as needed.
