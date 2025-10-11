import React from "react";
import { useAuth } from "../../context/auth";
import AdminMenu from "./AdminMenu";

function AdminDashboard() {
  const [auth] = useAuth();

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Admin Menu */}
        <div className="lg:col-span-3">
          <AdminMenu />
        </div>
        {/* Admin Information */}
        <div className="lg:col-span-9">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-6">Admin Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm mb-1">Admin Name</p>
                <p className="font-semibold text-lg">{auth?.user?.name}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm mb-1">Admin Email</p>
                <p className="font-semibold text-lg">{auth?.user?.email}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm mb-1">Admin Contact</p>
                <p className="font-semibold text-lg">{auth?.user?.phone || 'Not provided'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm mb-1">Role</p>
                <p className="font-semibold text-lg">{auth?.user?.role === 1 ? 'Administrator' : 'User'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
