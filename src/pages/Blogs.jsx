import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Layout from "../Layout";

const { Search } = Input;

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Get all blogs
    const getAllBlogs = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("http://localhost:8080/api/v1/blog/get-blogs");
            if (data.success) {
                setBlogs(data.blogs);
                setSearchResults(data.blogs); // Initialize search results with all blogs
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Search blogs
    const handleSearch = async (value) => {
        try {
            setLoading(true);
            if (!value.trim()) {
                // If search is empty, show all blogs
                setSearchResults(blogs);
                setSearchKeyword("");
                return;
            }

            const { data } = await axios.get(
                `http://localhost:8080/api/v1/blog/search-blog/${value}`
            );
            if (data.success) {
                setSearchResults(data.blogs);
                setSearchKeyword(value);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllBlogs();
    }, []);

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8">Our Blog</h1>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-8">
                    <Search
                        placeholder="Search blogs by title or content..."
                        allowClear
                        enterButton={<SearchOutlined />}
                        size="large"
                        onSearch={handleSearch}
                        onChange={(e) => {
                            if (!e.target.value) {
                                setSearchResults(blogs);
                                setSearchKeyword("");
                            }
                        }}
                    />
                </div>

                {loading ? (
                    <div className="text-center py-8">Loading...</div>
                ) : searchResults.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        {searchKeyword
                            ? "No blogs found matching your search."
                            : "No blogs available."}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {searchResults.map((blog) => (
                            <div
                                key={blog._id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                                onClick={() => navigate(`/blog/${blog.slug}`)}
                            >
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={blog.thumbnail}
                                        alt={blog.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                                        {blog.title}
                                    </h2>
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {blog.content}
                                    </p>
                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                        <span>By {blog.author?.name}</span>
                                        <span>
                                            {new Date(blog.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default Blogs; 