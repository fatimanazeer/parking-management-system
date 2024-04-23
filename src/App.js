import Login from './components/auth/login/Login';
import Header from "./components/header/Header";
import { Toaster, toast } from "sonner";
import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Home from "./components/parkingManagement/mainPage/Home";
import SignUp from "./components/auth/signUp/SignUp";
import DisplayCars from './components/parkingManagement/components/DisplayCars';

function App() {
  const routesArray = useRoutes([
    { path: '/login', element: <Login /> },
    { path: '/sign-up', element: <SignUp /> },
    { path: '/', element: <Login /> },

    {
      path: '/home',
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: '/show-cars',
      element: (
        <ProtectedRoute>
          <DisplayCars />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <AuthProvider>
      <Header />
      <Toaster richColors position="top-center" />
      <div className="w-full h-screen flex flex-col">{routesArray}</div>
    </AuthProvider>
  );
}

export default App;
