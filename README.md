# FlavorFind - Food App

This is a complete food discovery and ordering application built with React and a Manifest-powered backend. It allows users to browse restaurants, view menus, and place orders. Restaurant owners can manage their own listings and menu items.

## Features

- **User Authentication**: Secure sign-up and login for users.
- **Role-Based Access**: Different dashboard views and permissions for Diners and Restaurant Owners.
- **Restaurant Management**: Owners can create, update, and manage their restaurant listings.
- **Menu Management**: Owners can add and update menu items for their restaurants.
- **Public Restaurant Discovery**: All users can browse a public list of restaurants and their menus.
- **Image Uploads**: Support for restaurant cover images and menu item photos.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Manifest
- **SDK**: `@mnfst/sdk` for seamless frontend-backend communication

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation & Running

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Demo Accounts

- **Diner**: `diner@example.com` / `password`
- **Owner**: `owner@example.com` / `password`
- **Admin**: `admin@manifest.build` / `admin` (Access via the Admin Panel)

### Admin Panel

The Manifest-powered backend automatically generates a full-featured admin panel. You can access it at the backend URL provided during setup, followed by `/admin`.
