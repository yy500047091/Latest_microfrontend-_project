// host-app/src/App.tsx
import  { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './component/Login'; // Assuming Login is in ./component/Login
import Dashboard from './component/dashboard';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard/*" // This route will render the Dashboard
          element={
            isAuthenticated ? (
              <Dashboard /> // Dashboard component will handle loading RemoteApp
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
