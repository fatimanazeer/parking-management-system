import Login from './components/auth/login/Login';
import Header from "./components/header/Header";
import { Toaster, toast } from "sonner";
import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import ShowCars from "./components/parkingManagemet/components/DisplayCars";
import Home from "./components/parkingManagemet/mainPage/Home";
import SignUp from "./components/auth/signUp/SignUp";

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
          <ShowCars />
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
