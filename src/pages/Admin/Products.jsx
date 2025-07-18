import React, { useEffect, useState } from "react";
import Layout from "./../../Layout";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { NavLink } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [auth] = useAuth();

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-products",
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data.success) {
        setProducts(data.products);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3">
          <AdminMenu />
        </div>
        <div className="col-span-12 lg:col-span-9">
          <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Products
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map((p) => (
              <div
                className="card bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                key={p._id}
              >
                <figure className="relative">
                  {p.photo && Array.isArray(p.photo) && p.photo[0] ? (
                    <img
                      src={p.photo[0].split(",")[0]}
                      alt={p.name}
                      className="w-full h-56 object-cover"
                    />
                  ) : (
                    <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image Available</span>
                    </div>
                  )}
                </figure>

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {p.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {p.description}
                  </p>
                  {auth?.user?.role === 1 && (
                    <div className="mt-4 flex justify-end">
                      <NavLink to={`/dashboard/admin/update-product/${p.slug}`}>
                        <button className="btn btn-primary bg-red-500 rounded-md hover:bg-red-400 px-4 py-2 text-sm font-medium">
                          Update
                        </button>
                      </NavLink>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
