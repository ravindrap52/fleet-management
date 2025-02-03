# EV-Fleet Management

A web application for Electric Vehicle Fleet Management.

## Libraries Used

### RTK Query

Utilized RTK Query for efficient data fetching and caching, which prevents the Redux store from becoming bloated with data received from the websocket.

### RTK

Utilized Redux Toolkit (RTK) to manage client-side state, including theming, notifications, and other application-level states.

### Shadcn/ui

Used Shadcn/ui for customizable UI components.

### leaflet

Utilized leaflet to show marker positions in real time.

### socket.io

Implemented Socket.io for real-time, bidirectional communication between the server and client via websockets.

### service workers

Used service workers to enable PWA functionality, such as offline support and caching.


## Project Setup

### Cloning the Repository

To clone the repository, use the following command:

```bash
git clone https://github.com/ravindrap52/fleet-management.git
```

### Installation

To install the server side dependencies, navigate into the project directory and run:

```bash
cd fleet-management
cd server
npm install
```

To install the client side dependencies, navigate into the project directory and run:

```bash
cd fleet-management
cd client
npm install
```

### Running the Development Server

To start the backend server, run:

```bash
cd server
npm run start
```
To start the frontend , run:

```bash
cd client
npm run dev
```
#### Open your browser and navigate to http://localhost:5173 to see your application.

### Running the Tests

To run the tests, execute:

```bash
cd client
npm run test
```

### Building for Production

To build the project for production, use:

```bash
cd client
npm run build
```

### For preview 

For previewing the production, use:

```bash
cd client
npm run preview
```
### Testing the PWA Functionality

To test the Progressive Web App (PWA) features, follow these steps:

1. **Build the Client for Production**:  
   First, build the project for production by running the following command:

   ```bash
   cd client
   npm run build
   ```
2. **Preview the Production Build**:
    ```bash
   npm run preview
   ```
3. **Verify PWA Features**:
     #### Open your browser and navigate to http://localhost:4173 to see your application.

    To test PWA functionality:

    * Open Chrome Developer Tools (Ctrl + Shift + I or Cmd + Option + I on Mac).
    * Go to the Network tab.
    * Simulate slower network conditions by throttling the network (you can choose a specific speed like Offline").
    * Refresh the page and check that the content is loading from the cache.
