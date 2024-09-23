import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineHome, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useGetProductsQuery } from '../../redux/api/ProductsApi'; 
import '../nav/navbar.css';

const Nav = () => {
  const location = useLocation();
  const [navBackground, setNavBackground] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const user = useSelector((state) => state.auth); 
  console.log(user);

  useEffect(() => {
    const handleScroll = () => {
      setNavBackground(window.scrollY > 50 || location.pathname.includes("/single"));
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products.</div>;

  return (
    <>
      <nav className={`custom-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="close-btn" onClick={toggleSidebar}>
            <AiOutlineClose />
          </button>
        </div>
        <ul className="navbar-list">
          <li>
            <Link to="/" className="nav-link" onClick={toggleSidebar}>
              <AiOutlineHome className="nav-icon" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="nav-link" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faUser} className="nav-icon" />
              <span>Profile</span>
            </Link>
          </li>
          {!user?.token ? (
            <>
              <li>
                <Link to="/auth/login" className="nav-link" onClick={toggleSidebar}>
                  <FontAwesomeIcon icon={faSignInAlt} className="nav-icon" />
                  <span>Login</span>
                </Link>
              </li>
              <li>
                <Link to="/auth/signup" className="nav-link" onClick={toggleSidebar}>
                  <FontAwesomeIcon icon={faUserPlus} className="nav-icon" />
                  <span>Sign Up</span>
                </Link>
              </li>
            </>
          ) : (
            <li>
              <img
                src={user?.photo_url} 
                alt="User Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            </li>
          )}
        </ul>
      </nav>

      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      <nav className={`p-2 shadow-lg fixed w-full z-20 transition-colors duration-300 ${navBackground ? 'bg-white' : 'bg-transparent'}`}>
        <div className="container mx-auto flex items-center">
          <div className="flex items-center">
            <div className="hamburger" onClick={toggleSidebar}>
              <AiOutlineMenu />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
