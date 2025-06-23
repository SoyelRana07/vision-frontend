import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import Layout from "../../Layout";
import AdminMenu from "./AdminMenu";

function AdminBlogs() {
    const [auth] = useAuth();
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get all blogs
    const getAllBlogs = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("http://localhost:8080/api/v1/blog/get-blogs");
            if (data.success) {
                setBlogs(data.blogs);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error fetching blogs");
        } finally {
            setLoading(false);
        }
    };

    // Delete blog
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(
                `http://localhost:8080/api/v1/blog/delete-blog/${id}`,
                {
                    headers: {
                        Authorization: auth?.token,
                    },
                }
            );
            if (data.success) {
                toast.success("Blog deleted successfully");
                getAllBlogs();
            }
        } catch (error) {
            console.log(error);
            toast.error("Error deleting blog");
        }
    };

    useEffect(() => {
        getAllBlogs();
    }, []);

    return (
        <Layout>
            <div className="container mx-auto py-6 mt-20">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-3">
                        <AdminMenu />
                    </div>
                    <div className="col-span-12 lg:col-span-9">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">Manage Blogs</h1>
                            <button
                                onClick={() => navigate("/dashboard/admin/create-blog")}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                                Create New Blog
                            </button>
                        </div>

                        {loading ? (
                            <div className="text-center py-8">Loading...</div>
                        ) : blogs.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No blogs found. Create your first blog!
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {blogs.map((blog) => (
                                    <div
                                        key={blog._id}
                                        className="bg-white rounded-lg shadow-md overflow-hidden"
                                    >
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={blog.thumbnail}
                                                alt={blog.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                                                {blog.title}
                                            </h2>
                                            <p className="text-gray-600 mb-4 line-clamp-3">
                                                {blog.content}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">
                                                    By {blog.author?.name}
                                                </span>
                                                <div className="space-x-2">
                                                    <button
                                                        onClick={() => navigate(`/blog/${blog.slug}`)}
                                                        className="text-blue-500 hover:text-blue-700"
                                                    >
                                                        View
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(blog._id)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default AdminBlogs; 