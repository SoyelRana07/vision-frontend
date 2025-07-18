import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../Layout";

function BlogDetail() {
    const [blog, setBlog] = useState(null);
    const { slug } = useParams();

    const getBlog = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8080/api/v1/blog/get-blog/${slug}`
            );
            if (data.success) {
                setBlog(data.blog);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (slug) getBlog();
    }, [slug]);

    if (!blog) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">Loading...</div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <article className="max-w-4xl mx-auto">
                    {/* Thumbnail */}
                    <div className="mb-8">
                        <img
                            src={blog.thumbnail}
                            alt={blog.title}
                            className="w-full h-[400px] object-cover rounded-lg"
                        />
                    </div>

                    {/* Title and Meta */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
                        <div className="flex items-center text-gray-600">
                            <span>By {blog.author?.name}</span>
                            <span className="mx-2">•</span>
                            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose max-w-none">
                        <p className="whitespace-pre-wrap">{blog.content}</p>
                    </div>

                    {/* Additional Images */}
                    {blog.images && blog.images.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold mb-6">Gallery</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {blog.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`${blog.title} - Image ${index + 1}`}
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </div>
        </Layout>
    );
}

export default BlogDetail; 