import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/auth";
import useCategory from "./../hooks/useCategory";
import SearchForm from "./../pages/form/SearchForm";
import { useCart } from "../context/CartContext";

function buildCategoryTree(categories, parent = null) {
  return categories
    .filter((cat) => String(cat.parent) === String(parent))
    .map((cat) => ({
      ...cat,
      children: buildCategoryTree(categories, cat._id),
    }));
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const { cart } = useCart();
  const topLevel = buildCategoryTree(categories);
  const displayedCategories = topLevel.slice(0, 4);
  const [openSubMenus, setOpenSubMenus] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimeoutRef = React.useRef(null);

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
  };

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 2000); // 2 seconds
  };

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm w-full">
      {/* Top Contact Bar */}
      <div className="w-full bg-black text-white text-xs sm:text-sm flex flex-row items-center justify-between px-2 sm:px-6 py-2">
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">📩</span>
          <span className="truncate">sales@visionmediaonline.in</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">📞</span>
          <span className="truncate">+91 8100280400</span>
        </div>
      </div>
      {/* Main Nav Bar */}
      <div className="w-full bg-white border-b border-gray-100 flex items-center justify-between px-2 sm:px-6 py-2">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link to="/">
            <img src={logo} alt="Brand Logo" className="h-10 sm:h-14 w-auto" />
          </Link>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-4 xl:gap-8 2xl:gap-12 text-base xl:text-lg">
          <Link to="/" className="hover:text-red-600 py-2 px-3 rounded-md transition-colors duration-200 hover:bg-gray-50">Home</Link>
          {displayedCategories.map((cat) => (
            <div key={cat.slug} className="relative group">
              <Link to={`/category/${cat.slug}`} className="hover:text-red-600 flex items-center gap-1 py-2 px-3 rounded-md transition-colors duration-200 hover:bg-gray-50 whitespace-nowrap">
                {cat.name}
                {cat.children?.length > 0 && <span className="text-xs ml-1 text-gray-500">▼</span>}
              </Link>
              {cat.children?.length > 0 && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                  <div className="py-2">
                    {cat.children.map((child, index) => (
                      <Link key={child.slug} to={`/category/${child.slug}`} className={`block px-4 py-2.5 hover:bg-gray-50 hover:text-red-600 transition-colors duration-150 ${index !== cat.children.length - 1 ? "border-b border-gray-100" : ""}`}>{child.name}</Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link to="/category" className="hover:text-red-600 py-2 px-3 rounded-md transition-colors duration-200 hover:bg-gray-50">All Categories</Link>
          <Link to="/about-us" className="hover:text-red-600 py-2 px-3 rounded-md transition-colors duration-200 hover:bg-gray-50">About Us</Link>
          <Link to="/blogs" className="hover:text-red-600 py-2 px-3 rounded-md transition-colors duration-200 hover:bg-gray-50">Blogs</Link>
        </nav>
        {/* Desktop Search/Cart/Auth */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-4 flex-shrink-0 ml-4">
          <SearchForm />
          <div className="relative">
            <Link to="/cart">
              <button className="bg-red-600 h-10 w-10 xl:h-12 xl:w-12 rounded-md text-white text-xl hover:bg-red-700 transition-colors duration-200">🛒</button>
              {cart?.length > 0 && <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cart.length}</div>}
            </Link>
          </div>
          {!auth.user ? (
            <>
              <Link to="/login" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200">Login</Link>
              <Link to="/register" className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors duration-200">Register</Link>
            </>
          ) : (
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200"
                onClick={handleDropdownToggle}
              >
                <span className="text-gray-700">Hello, </span>
                <span className="font-semibold text-red-600">{auth.user.name}</span>
                {/* Triangle rotates based on dropdownOpen */}
                <span
                  className={`text-gray-500 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  style={{ display: "inline-block" }}
                >
                  ▼
                </span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    {/* Only show Dashboard for admins */}
                    {auth.user.role === 1 && (
                      <Link to="/dashboard/admin" className="block px-4 py-2 hover:bg-gray-50 hover:text-red-600 transition-colors duration-150">
                        Dashboard
                      </Link>
                    )}
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-50 hover:text-red-600 transition-colors duration-150">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Mobile: Search/Cart/Hamburger */}
        <div className="flex items-center gap-2 lg:hidden ml-auto">
          <SearchForm mobile />
          <div className="relative">
            <Link to="/cart">
              <button className="bg-red-600 p-2 rounded-md text-white hover:bg-red-700 transition-colors duration-200">🛒</button>
              {cart?.length > 0 && <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cart.length}</div>}
            </Link>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200">
            {menuOpen ? <span className="text-2xl">×</span> : <span className="text-2xl">☰</span>}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="p-4 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
            {/* Auth Section */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              {!auth.user ? (
                <div className="flex flex-col gap-2">
                  <Link to="/login" className="w-full text-center py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200" onClick={() => setMenuOpen(false)}>Login</Link>
                  <Link to="/register" className="w-full text-center py-2 px-4 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors duration-200" onClick={() => setMenuOpen(false)}>Register</Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="py-2 px-4 bg-gray-50 rounded-md">
                    <span className="text-gray-700">Hello, </span>
                    <span className="font-semibold text-red-600">{auth.user.name}</span>
                  </div>
                  <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="w-full text-center py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200">Logout</button>
                </div>
              )}
            </div>
            <Link to="/" className="py-3 px-2 hover:text-red-600 hover:bg-gray-50 rounded-md transition-colors duration-200" onClick={() => setMenuOpen(false)}>Home</Link>
            {displayedCategories.map((cat) => (
              <div key={cat.slug} className="border-b border-gray-100 last:border-b-0">
                <Link to={`/category/${cat.slug}`} className="py-3 px-2 hover:text-red-600 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center justify-between" onClick={() => setMenuOpen(false)}>
                  {cat.name}
                  {cat.children?.length > 0 && <span className="text-xs text-gray-500">▼</span>}
                </Link>
                {cat.children?.length > 0 && (
                  <div className="ml-4 pb-2">
                    {cat.children.map((child) => (
                      <Link key={child.slug} to={`/category/${child.slug}`} className="block py-2 px-2 hover:text-red-600 hover:bg-gray-50 rounded-md transition-colors duration-200 text-sm text-gray-600" onClick={() => setMenuOpen(false)}>{child.name}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/category" className="py-3 px-2 hover:text-red-600 hover:bg-gray-50 rounded-md transition-colors duration-200" onClick={() => setMenuOpen(false)}>All Categories</Link>
            <Link to="/about-us" className="py-3 px-2 hover:text-red-600 hover:bg-gray-50 rounded-md transition-colors duration-200" onClick={() => setMenuOpen(false)}>About Us</Link>
            <Link to="/blogs" className="py-3 px-2 hover:text-red-600 hover:bg-gray-50 rounded-md transition-colors duration-200" onClick={() => setMenuOpen(false)}>Blogs</Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
