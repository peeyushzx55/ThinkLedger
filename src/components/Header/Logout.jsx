import { useDispatch } from "react-redux";
import auth from "../../services/auth.js";
import { logout } from "../../store/authSlice.js";

const Logout = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    auth
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };
  
  return (
    <button
      className="px-4 py-2 text-white hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200 font-medium flex items-center space-x-2"
      onClick={logoutHandler}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span>Logout</span>
    </button>
  );
};

export default Logout;
