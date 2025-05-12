
# Music Library Application with Role-Based Authentication (Host App)

## Overview

This application consists of a host application (`host-app`) that handles user login and role-based authentication using an in-memory JSON Web Token (JWT), and a remote application (`remote-components`) serving the music library. Users can log in with different roles (user, admin, guest), and an admin user has additional privileges to add songs to the music library. The music library allows users to filter songs based on name, artist, and album.

## Table of Contents

* [Installation](#installation)
* [Running the Project](#running-the-project)
* [Key Design Decisions and Trade-offs](#key-design-decisions-and-trade-offs)
* [Running Tests and Viewing Test Coverage](#running-tests-and-viewing-test-coverage)
* [Micro Frontend Implementation](#micro-frontend-implementation)
* [Authentication and Authorization](#authentication-and-authorization)
* 
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

## Micro Frontend Implementation

This application employs a micro frontend architecture, splitting the functionality between a core application (host-app) and a music library micro frontend (remote-components). The integration is achieved using Module Federation, facilitated by @originjs/vite-plugin-federation within the Vite build tool.
•	Host App (Core Application): This acts as the container application. It is responsible for user authentication, routing, and dynamically loading the remote-components.
•	Remote Components (Music Library Micro Frontend): This part of the application contains the core music library features, including song listing, grouping, filtering, and sorting. It is developed and 
    potentially deployed independently.

Integration using Module Federation
1.	Configuration in vite.config.ts (or vite.config.js): Both the host-app and remote-components projects will have a Vite configuration file where Module Federation is set up. This involves defining:
   o	name:    A unique name for each application (host-app and remote-components).
   o	remotes: In the host-app configuration, this section will specify the location (URL) of the remote-components build output, allowing it to consume modules exposed by the remote application.
   o	exposes: In the remote-components configuration, this section will define the modules (e.g., React components) that it wants to make available for consumption by other applications (like host-app). For 
                 example, the main Music Library component will be exposed.
   o	shared: This section in both configurations lists the dependencies (like react, react-dom, @mui/material, react-router-dom) that should be shared between the host and remote applications to avoid 
                duplication and potential version conflicts.

2.	Dynamic Consumption in host-app: In the host-app, you will dynamically import the exposed modules from the remote-components. This is typically done using dynamic import() statements or React's lazy and Suspense components to load the micro frontend on demand, potentially improving the initial load time of the core application. For instance, your Dashboard component likely uses React.lazy(() => import("remoteComponents/App")) to load the App component exposed by the remote-components.


##Challanges


Initially, setting up Module Federation with Vite required careful configuration of the vite.config.ts files in both the host and remote applications. Ensuring the name, remotes, exposes, and shared properties were correctly defined and pointed to the right locations and modules took some initial effort. I might have encountered issues with the build process if the configurations were not precise, requiring careful review of the Vite and Module Federation plugin documentation.


To avoid duplicating dependencies and potential version conflicts between the host and remote applications, I configured common libraries like react, react-dom, @mui/material, and react-router-dom as shared dependencies in the shared section of both vite.config.ts files. This ensures that these libraries are loaded only once in the browser. I had to be mindful of the versions specified in both package.json files to maintain compatibility and avoid runtime errors.


Since both the host and remote applications utilize Material UI for styling, maintaining a consistent theme across them was generally straightforward. By sharing the @mui/material dependency, both applications could leverage the same styling context and components. However, I might have needed to ensure that any custom theming configurations were either shared or consistently applied in both applications to achieve a unified look and feel.


Routing was primarily managed within the host application (host-app) using react-router-dom. The host app defines the main routes, including the route (/dashboard) where the Dashboard component (which loads the remote app's App component) is rendered. When a user navigates to /dashboard, the remote-components/App module is dynamically loaded and displayed within the host app's route structure. This allows for seamless navigation between the core application and the music library micro frontend.

## Authentication and Authorization

This application implements an in-memory JSON Web Token (JWT) system to manage user authentication and authorization.

### Login Process

1.  When a user attempts to log in via the `Login` component, the application checks the provided credentials (currently against in-memory validation as per the component's logic).
2.  Upon successful validation, instead of just setting the user role in `localStorage`, the application will:
    * Generate a JWT. This token will contain information about the user's identity (e.g., username) and their assigned role (user, admin, or guest).
    * Store this JWT in an in-memory location. For simplicity, this might be a React state variable or a browser cookie that is not persisted across sessions.

### Role-Based Authorization

1.  The application uses the role claim within the JWT to determine the user's authorization level.
2.  Components like the `Dashboard` will check for the presence of the JWT and its role claim to conditionally render features and restrict access. For example, the "Add Song" functionality is only visible and accessible when the decoded JWT contains the 'admin' role.
3.  If a valid JWT is present with the 'admin' role, the user can see and interact with the song addition features. Other roles (user, guest) will have a more restricted view of the application (e.g., only being able to see the music library).

### In-Memory JWT Details

* **Storage:** The generated JWT is stored in memory (e.g., a React state or a non-persistent cookie). This means that the authentication status will be lost when the user closes their browser or refreshes the page.
* **Security Considerations:** For a production-level application, storing the JWT only in memory is not ideal for persistence or robust security. A more secure approach would involve:
    * Storing the JWT in an HTTP-only cookie to prevent client-side JavaScript access and mitigate XSS risks.
    * Using `localStorage` with appropriate security measures.
    * Implementing token refresh mechanisms to handle token expiry.

### Logout

The application would typically implement a logout mechanism that clears the in-memory JWT, effectively logging the user out and requiring them to log in again for future access.
state/cookies based on successful "login").*
