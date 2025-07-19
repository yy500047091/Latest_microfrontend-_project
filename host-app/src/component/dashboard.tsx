// host-app/src/pages/Dashboard.tsx
import  { lazy, Suspense, useEffect, useState } from "react";
import { Typography, Box, Button, AppBar, Toolbar } from "@mui/material";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
 // Logout icon

// Dynamically import the remote App component

const RemoteApp = lazy(() => import("remote_app/App1")); // Must match remote's name

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize navigate hook
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the user role from local storage
    const storedRole = localStorage.getItem("userRole");
    setUserRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Clear all items from local storage
    navigate('/'); // Navigate back to the login page (root route)
    console.log('User logged out. Local storage cleared and redirected.');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-300">
      {/* Header with AppBar and Logout Button */}
      <AppBar position="static" sx={{ bgcolor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(5px)' }} className="shadow-lg">
        <Toolbar className="flex justify-between items-center px-4 py-2">
          <Typography variant="h6" component="div" className="text-white font-semibold">
            Music Library Dashboard
          </Typography>
          <Box className="flex items-center space-x-4">
            {userRole && (
              <Typography variant="subtitle1" className="text-gray-400">
                Logged in as: <span className="font-bold capitalize">{userRole}</span>
              </Typography>
            )}
            <Button
              color="inherit"
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 rounded-md py-2 px-4 text-white shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              {/* <ExitToAppIcon className="text-white" /> */}
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box className="flex-grow p-4 md:p-6 lg:p-8 flex items-center justify-center bg-cover bg-center"
           style={{ backgroundImage: `url('https://placehold.co/1920x1080/1a1a1a/cccccc?text=Music+Background')` }}>
        <Box className="bg-gray-800 bg-opacity-90 rounded-xl shadow-2xl p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto">
          {/* Conditional rendering of RemoteApp based on userRole is now done INSIDE RemoteApp */}
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-64 text-2xl text-blue-400">
                Loading Music Library...
              </div>
            }
          >
            {/* Always render RemoteApp and pass the userRole as a prop */}
            <RemoteApp userRole={userRole} />
          </Suspense>
        </Box>
      </Box>

      {/* Footer */}
      <Box className="p-3 text-center bg-gray-800 text-gray-400 border-t border-gray-700">
        <Typography variant="subtitle2">
          © 2025 Music Library Application
        </Typography>
      </Box>
    </div>
  );
};

export default Dashboard;
