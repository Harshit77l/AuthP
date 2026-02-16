# AuthP - Next-Gen Authentication System 🚀

![AuthP Banner](https://placehold.co/1200x400/1e293b/ffffff?text=AuthP+Project+Banner)

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green.svg)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 👋 Introduction

Welcome to **AuthP**, a robust and secure authentication system built with the MERN stack. Designed with scalability and user experience in mind, AuthP provides a seamless login and registration flow, complete with email verification and a sleek dashboard. Whether you're building a SaaS platform or a personal project, AuthP gives you the solid foundation you need to manage user identities securely.

## 📸 Demo

> [!NOTE]
> *Video demonstration coming soon! Watch this space for a walkthrough of the authentication flow.*

## ✨ Features

-   **🔐 Secure & Robust**: Implements industry-standard security practices using `bcrypt` for password hashing and `jsonwebtoken` for session management.
-   **📧 Email Verification**: Integrated OTP verification system ensuring legitimate user registrations via `nodemailer`.
-   **🚀 High Performance**: Utilizes **Redis** for efficient caching and session storage, ensuring lightning-fast response times.
-   **🎨 Modern UI**: Built with **React** and **TailwindCSS v4**, featuring a responsive, clean, and professional interface.
-   **🛡️ Protected Routes**: comprehensive route protection to ensure only authenticated users access the dashboard.
-   **📱 Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

This project leverages a powerful modern tech stack:

### Frontend
-   **React (Vite)**: Fast and modern frontend library.
-   **TailwindCSS**: Utility-first CSS framework for rapid UI development.
-   **Axios**: Promise-based HTTP client for the browser.
-   **React Router**: Dynamic routing for single-page applications.

### Backend
-   **Node.js & Express**: Scalable server-side runtime.
-   **MongoDB & Mongoose**: Flexible NoSQL database schema.
-   **Redis**: In-memory data structure store for caching.
-   **Zod**: TypeScript-first schema validation.
-   **Nodemailer**: Module to send emails.

## 🏗️ Architecture

### Project Structure

A high-level view of the project's file organization:

```mermaid
graph TD
    Root[AuthP Root] --> Backend[📂 backend]
    Root --> Frontend[📂 frontend]
    
    Backend --> Controllers[📂 controllers]
    Backend --> Models[📂 models]
    Backend --> Routes[📂 routes]
    Backend --> Config[📂 config]
    Backend --> Index[📄 index.js]

    Frontend --> Src[📂 src]
    Src --> Components[📂 components]
    Src --> Pages[📂 pages]
    Src --> Context[📂 context]
    Src --> Assets[📂 assets]
    Src --> App[📄 App.jsx]
```

### Authentication Flow

The following sequence diagram illustrates the secure registration and login process:

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant DB as MongoDB
    participant E as Email Service

    Note over U, F: Registration Flow
    U->>F: Enter Name, Email, Password
    F->>B: POST /api/auth/register
    B->>DB: Check if user exists
    alt User Exists
        B-->>F: Error: User already exists
    else New User
        B->>DB: Create User (Unverified)
        B->>E: Send OTP Email
        B-->>F: Success: OTP Sent
    end

    Note over U, F: Verification Flow
    U->>F: Enter OTP
    F->>B: POST /api/auth/verify-otp
    B->>DB: Verify OTP & Activate User
    B-->>F: Success: Email Verified

    Note over U, F: Login Flow
    U->>F: Enter Email & Password
    F->>B: POST /api/auth/login
    B->>DB: Validate Credentials
    alt Invalid
        B-->>F: Error: Invalid Credentials
    else Valid
        B->>B: Generate JWT Token
        B-->>F: Return Token & User Data
        F->>F: Store Token
        F->>U: Redirect to Dashboard
    end
```

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

-   Node.js (v16+)
-   MongoDB (Local or Atlas)
-   Redis (Local or Cloud)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/authp.git
    cd authp
    ```

2.  **Setup Backend:**
    ```bash
    cd backend
    npm install
    # Create a .env file based on .env.example
    npm run dev
    ```

3.  **Setup Frontend:**
    ```bash
    cd ../frontend
    npm install
    npm run dev
    ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
