import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice.js";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import auth from "../services/auth.js";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      const session = await auth.login(data);
      if (session) {
        // Try to get user data immediately after session creation
        try {
          const userData = await auth.getCurrentUser();
          if (userData) {
            dispatch(authLogin(userData));
            navigate("/");
          }
        } catch (error) {
          console.error("Error getting user data after login:", error);
          // Even if getCurrentUser fails, we can still proceed with session
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Logo width="32px" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome back
            </h2>
            <p className="text-gray-300">
              Sign in to your ThinkLedger account
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-300 text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(login)} className="space-y-6">
            <div>
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Email address must be a valid address",
                  },
                })}
              />
            </div>
            
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-300">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-300 hover:text-purple-200 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
