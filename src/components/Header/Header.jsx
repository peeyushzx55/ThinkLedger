import { Container, Logo, Logout } from "../index.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <Logo width="40px" />
              <span className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                ThinkLedger
              </span>
            </Link>
          </div>
          
          <ul className="hidden md:flex items-center space-x-1">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <Link
                    to={item.slug}
                    className="px-4 py-2 text-white hover:text-purple-300 hover:bg-white/10 rounded-lg transition-all duration-200 font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="ml-2">
                <Logout />
              </li>
            )}
          </ul>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-purple-300 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
