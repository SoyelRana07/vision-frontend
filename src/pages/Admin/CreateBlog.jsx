import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import Layout from "../../Layout";
import AdminMenu from "./AdminMenu";
import UploadWidget from "../../components/UploadWidget";

function CreateBlog() {
    const [auth] = useAuth();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            // Validate required fields
            if (!title.trim()) {
                toast.error("Title is required");
                return;
            }
            if (!content.trim()) {
                toast.error("Content is required");
                return;
            }
            if (!thumbnail) {
                toast.error("Thumbnail image is required");
                return;
            }

            // Ensure thumbnail is a string, not an array
            const thumbnailUrl = Array.isArray(thumbnail) ? thumbnail[0] : thumbnail;

            const { data } = await axios.post(
                "http://localhost:8080/api/v1/blog/create-blog",
                {
                    title,
                    content,
                    thumbnail: thumbnailUrl,
                    images: images || [],
                },
                {
                    headers: {
                        Authorization: auth?.token,
                    },
                }
            );

            if (data.success) {
                toast.success("Blog created successfully");
                navigate("/dashboard/admin/blogs");
            } else {
                toast.error(data.message || "Failed to create blog");
            }
        } catch (error) {
            console.error("Blog creation error:", error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto py-6 mt-20">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-3">
                        <AdminMenu />
                    </div>
                    <div className="col-span-12 lg:col-span-9">
                        <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block mb-2">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full border rounded-lg p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2">Content</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full border rounded-lg p-2 h-48"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2">Thumbnail Image</label>
                                <div className="sideContainer flex-1 h-[200px] bg-gray-50 p-6 flex items-center gap-6">
                                    {thumbnail && (
                                        <img
                                            src={thumbnail}
                                            alt="thumbnail"
                                            className="w-48 h-36 rounded-md object-cover shadow-md"
                                        />
                                    )}
                                    <UploadWidget
                                        uwConfig={{
                                            cloudName: "do02igykn",
                                            uploadPreset: "vision-media",
                                            folder: "blog-thumbnails",
                                            maxFiles: 1,
                                        }}
                                        setState={setThumbnail}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2">Additional Images</label>
                                <div className="sideContainer flex-1 h-[300px] bg-gray-50 p-6 flex items-center gap-6">
                                    {images &&
                                        images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt=""
                                                className="w-48 h-36 rounded-md object-cover shadow-md"
                                            />
                                        ))}
                                    <UploadWidget
                                        uwConfig={{
                                            multiple: true,
                                            cloudName: "do02igykn",
                                            uploadPreset: "vision-media",
                                            folder: "blog-images",
                                        }}
                                        setState={setImages}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? "Creating..." : "Create Blog"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CreateBlog; 