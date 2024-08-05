# Todo Manager Project Summary

## Overview

Todo Manager is an application designed for efficient task management. It includes features for creating projects, exporting summaries, and managing todos with various actions such as adding, editing, deleting, updating, and removing tasks.

## Features

- **Create Project**: Initialize a new project.
- **Export Project Summary**: Generate and export a detailed summary of the project.
- **Add Todo**: Insert new tasks into the project.
- **Edit Todo**: Modify existing tasks.
- **Delete Todo**: Remove tasks from the project.
- **Update Todo**: Change task details or status.
- **Remove Todo**: Permanently delete tasks from the system.

## Project Structure

The project is organized into two main folders:

- **`client`**: Contains the frontend application code.
- **`server`**: Contains the backend API code.

## Setup Instructions

### Client

1. Navigate to the `client` directory.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the application:
    ```bash
    npm start
    ```

### Server

1. Navigate to the `server` directory.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the server:
    ```bash
    npm start
    ```

## Environment Variables

Set up the environment variables in the `.env` files for both client and server.

### Client (`client/.env`)

```env
VITE_SERVER_URL=http://your_server_url

```

### Server (`server/.env`)

```env
PORT=your_server_runging_port

CLIENT_URL=your_client_port
MONGO_URL=your_mongodb_coonect_url

JWT_SECRET_KEY=your_jwt_secret_key
JWT_EXPIRES=your_jwt_token_expires_time

SMTP_HOST=your_email_host
SMTP_SERVICE=your_email_service
```
## Testing Setup

### Client Testing

1. Navigate to the `client` directory:
   ```bash
   cd client
2. Install testing dependencies:
   ```bash
    npm install --save-dev jest @testing-library/react @testing-library/jest-dom
3. Run the tests:
    ```bash
    npm test


SMTP_PORT=your_protocoal_port
SMTP_USER=your_email_id
SMTP_PASS=your_email_id_password
