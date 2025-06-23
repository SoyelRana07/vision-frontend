import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="text-center">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h4 className="text-lg font-bold mb-4">Admin Panel</h4>
        <nav className="space-y-2">
          <NavLink
            to="/dashboard/admin/create-category"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg text-gray-800 hover:bg-black hover:text-white transition duration-300 ${isActive ? "bg-red-500 text-white" : ""
              }`
            }
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg text-gray-800 hover:bg-black hover:text-white transition duration-300 ${isActive ? "bg-red-500 text-white" : ""
              }`
            }
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg text-gray-800 hover:bg-black hover:text-white transition duration-300 ${isActive ? "bg-red-500 text-white" : ""
              }`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-blog"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg text-gray-800 hover:bg-black hover:text-white transition duration-300 ${isActive ? "bg-red-500 text-white" : ""
              }`
            }
          >
            Create Blog
          </NavLink>
          <NavLink
            to="/dashboard/admin/blogs"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg text-gray-800 hover:bg-black hover:text-white transition duration-300 ${isActive ? "bg-red-500 text-white" : ""
              }`
            }
          >
            Manage Blogs
          </NavLink>
          {/* <NavLink
            to="/dashboard/admin/orders"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg text-gray-800 hover:bg-black hover:text-white transition duration-300 ${
                isActive ? "bg-red-500 text-white" : ""
              }`
            }
          >
            Processings
          </NavLink> */}
          {/* <NavLink
            to="/dashboard/admin/users"
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg text-gray-800 hover:bg-black hover:text-white transition duration-300 ${
                isActive ? "bg-red-500 text-white" : ""
              }`
            }
          >
            Users
          </NavLink> */}
        </nav>
      </div>
    </div>
  );
};

export default AdminMenu;
