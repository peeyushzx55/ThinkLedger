import { useDispatch } from "react-redux";
import "./App.css";
import auth from "./services/auth.js";
import { useEffect, useState } from "react";
import { login, logout } from "./store/authSlice.js";
import { Header, Footer } from "./components/index.js";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Only check authentication once on app load
    const checkAuth = async () => {
      try {
        const userData = await auth.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        // Silently handle auth errors - this is expected for unauthenticated users
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg font-medium">Loading ThinkLedger...</p>
      </div>
    </div>
  );
}
export default App;
