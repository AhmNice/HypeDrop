import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider
} from "react-router-dom";
import UploadSnippetPage from "./assets/pages/UploadSnippetPage.jsx";
import Layout from "./assets/root/Layout.jsx";
import LoginPage from "./assets/pages/LoginPage.jsx";
import SignupPage from "./assets/pages/SignupPage.jsx";
import Dashboard from "./assets/pages/Dashboard.jsx";
import VerificationPage from "./assets/pages/VerificationPage.jsx";
import ProfilePage from "./assets/pages/ProfilePage.jsx";
import ForgotPassword from "./assets/pages/ForgetPassword.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./assets/store/authStore.js";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import HomePage from './assets/pages/HomePage.jsx'
import SnippetsPage from "./assets/pages/SnippetPage.jsx";
import ResetPassword from './assets/pages/ResetPassword.jsx'
import AudioPage from "./assets/pages/AudioPage.jsx";
import AboutPage from "./assets/pages/AboutPage.jsx";
import TestimonyPage from "./assets/pages/TestimonyPage.jsx";
import PageNotFound from "./assets/pages/PageNotFound.jsx";
function App() {
  const { checkAuth, isAuthenticated, user, isCheckingAuth,error } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);


  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const RedirectIfAuthenticated = ({ children }) => {
    if (isAuthenticated && user?.isVerified) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>

        <Route
          index
          element={
              <HomePage />
          }
        />
         <Route path='/about' element={<AboutPage/>}/>
         <Route path='/testimonial' element={<TestimonyPage/>}/>
        <Route
          path={'/login'}
          element={
            <RedirectIfAuthenticated>
              <LoginPage />
            </RedirectIfAuthenticated>
          }
        />
        <Route
  path={'*'}
  element={<PageNotFound />}
        />
        <Route
          path={'/reset-password-user/:id'}
          element={
            <RedirectIfAuthenticated>
              <ResetPassword />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectIfAuthenticated>
              <SignupPage />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <RedirectIfAuthenticated>
              <ForgotPassword />
            </RedirectIfAuthenticated>
          }
        />
        <Route path="/email-verification" element={<VerificationPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/snippets"
          element={
            <ProtectedRoute>
              <SnippetsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/snippets/:id" element={<AudioPage/>}/>
        <Route
          path="/upload-snippet"
          element={
            <ProtectedRoute>
              <UploadSnippetPage />
            </ProtectedRoute>
          }
        />
      </Route>


    )
  );

  return (
    <>
      <RouterProvider router={router} key={isAuthenticated ? "auth" : "guest"} />
      <Toaster />
    </>
  );
}

export default App;
