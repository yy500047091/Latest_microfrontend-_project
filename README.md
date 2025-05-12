
# Music Library Application with Role-Based Authentication (Host App)

## Overview

This application consists of a host application (`host-app`) that handles user login and role-based authentication using an in-memory JSON Web Token (JWT), and a remote application (`remote-components`) serving the music library. Users can log in with different roles (user, admin, guest), and an admin user has additional privileges to add songs to the music library. The music library allows users to filter songs based on name, artist, and album.

## Table of Contents

* [Installation](#installation)
* [Running the Project](#running-the-project)
* [Key Design Decisions and Trade-offs](#key-design-decisions-and-trade-offs)
* [Running Tests and Viewing Test Coverage](#running-tests-and-viewing-test-coverage)


## Installation

1.  Clone the repository:
    ```bash
    git clone <your-repository-link>
    cd host-app
    ```
2.  Install the dependencies for the host application:
    ```bash
    npm install
    ```
3.  Navigate to the remote components directory (if it's a separate repository or directory):
    ```bash
    cd ../remote-components # Adjust path if needed
    npm install
    ```

## Running the Project

1.  **Host Application:**
    ```bash
    cd host-app
    npm run dev
    ```
    This will start the host application development server (usually on `http://localhost:3000` or a similar port).

2.  **Remote Components:**
    ```bash
    cd ../remote-components # Adjust path if needed
    npm run dev
    ```
    This will start the remote components development server (as configured in its `package.json`, likely on `http://localhost:5001`).

    If you have built and are serving the remote components:
    ```bash
    cd ../remote-components # Adjust path if needed
    npm run start-mf
    ```

## Key Design Decisions and Trade-offs

This experimental model uses your Search history. Some features aren't available.
Okay, here are the key design decisions and trade-offs in point form:

Chose a micro frontend architecture for better modularity and separation between the core application (authentication) and the music library.
Used @originjs/vite-plugin-federation with Vite for Module Federation to dynamically load the Music Library Micro Frontend.
Advantages of this approach include increased modularity, potential for independent teams, improved scalability, and isolation of music library features.
Disadvantages include increased complexity, potential for larger build sizes, and the need for careful dependency management.
State management is primarily handled within each micro frontend using React's built-in useState.
React was chosen for its component-based architecture and established ecosystem for building UIs.
Material UI was used as a CSS framework for pre-designed, accessible, and responsive components.
Formik was used to simplify form handling, particularly in the Login component.

## Running Tests and Viewing Test Coverage

1.  **Host Application Tests:**
    ```bash
    cd host-app
    npm run test
    ```
    This command will run the unit tests for the host application.

2.  **Viewing Test Coverage:**
    ```bash
    npm run test:coverage
    ```
    This command will run the tests and generate a coverage report, typically found in a `coverage` folder. Open the `index.html` file within this folder to view the detailed coverage. You should aim for 80% code coverage as per the requirements.

