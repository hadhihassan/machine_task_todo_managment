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
