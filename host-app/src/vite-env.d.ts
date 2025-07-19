/// <reference types="vite/client" />
// For the remote module
declare module "remote_app/App" {
    const Component: React.ComponentType<{ userRole?: string }>;
    export default Component;
  }
  
  // If you need multiple components
  declare module "remote_app/*" {
    const Component: React.ComponentType<any>;
    export default Component;
  }