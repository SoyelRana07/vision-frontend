import React, { useState, useEffect } from "react";
import Layout from "./../../Layout";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import UploadWidget from "./../../components/UploadWidget";

const { Option } = Select;

function UpdateProduct() {
  const [auth] = useAuth();
  const params = useParams();
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  const [bulkDiscounts, setBulkDiscounts] = useState([{ quantity: '', discount: '' }]);

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://vision-backend-lx5i.onrender.com/api/v1/product/get-product/${params.slug}`,
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );

      setName(data.product?.name);
      setCategory(data.product?.category?._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setId(data.product._id);
      setBulkDiscounts(data.product.bulkDiscounts && data.product.bulkDiscounts.length > 0 ? data.product.bulkDiscounts : [{ quantity: '', discount: '' }]);

      // Set existing photos if they exist
      if (data.product?.photo && Array.isArray(data.product.photo)) {
        setPhoto(data.product.photo);
      }
    } catch (error) {
      console.error("Error loading product:", error);
      toast.error("Error loading product details");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  //   // Fetch categories from the API
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://vision-backend-lx5i.onrender.com/api/v1/category/get-category",
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  // Call getAllCategory on component mount
  useEffect(() => {
    getAllCategory();
  }, []);

  const navigate = useNavigate();

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("shipping", shipping);

      // Send photo as JSON string if it exists
      if (photo && photo.length > 0) {
        productData.append("photo", JSON.stringify(photo));
      }

      productData.append("bulkDiscounts", JSON.stringify(bulkDiscounts.filter(b => b.quantity && b.discount)));

      const { data } = await axios.put(
        `https://vision-backend-lx5i.onrender.com/api/v1/product/update-product/${id}`,
        productData,
        {
          headers: {
            Authorization: auth?.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data?.success) {
        toast.success("Product updated successfully");
        setTimeout(() => {
          navigate("/dashboard/admin/products");
        }, 1500);
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating product");
    }
  };
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure, you want to delete");
      if (!answer) return;
      const { data } = await axios.delete(
        `https://vision-backend-lx5i.onrender.com/api/v1/product/delete-product/${id}`,
        {
          headers: {
            Authorization: auth?.token,
            //"Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Product deleted successfully");
      navigate("/dashboard/admin/products");
      setTimeout(() => { }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in handleDelete");
    }
  };
  return (
    <div className="container mx-auto py-4 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <AdminMenu />
        </div>
        <div className="lg:col-span-9">
          <h1 className="text-2xl font-bold mb-6">Update Product</h1>
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Category *</label>
              <Select
                placeholder="Select a category"
                size="large"
                className="w-full"
                onChange={(val) => setCategory(val)}
                value={category}
              >
                {categories.map((cat) => (
                  <Option key={cat._id} value={cat._id}>
                    {cat.name}
                  </Option>
                ))}
              </Select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Product Images</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                <div className="flex flex-wrap gap-4 mb-4">
                  {photo && photo.length > 0 ? (
                    photo.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-32 h-24 rounded-md object-cover shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newPhotos = photo.filter((_, i) => i !== index);
                            setPhoto(newPhotos);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-sm">No images uploaded</div>
                  )}
                </div>
                <UploadWidget
                  uwConfig={{
                    multiple: true,
                    cloudName: "do02igykn",
                    uploadPreset: "vision-media",
                    folder: "Updated-Products",
                  }}
                  setState={setPhoto}
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">Product Name *</label>
              <input
                type="text"
                value={name}
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Description *</label>
              <textarea
                value={description}
                placeholder="Enter product description"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium">Price *</label>
                <input
                  type="number"
                  value={price}
                  placeholder="Enter price"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Quantity *</label>
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter quantity"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">Shipping</label>
              <Select
                placeholder="Select shipping option"
                size="large"
                className="w-full"
                onChange={(value) => setShipping(value)}
                value={shipping}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Bulk Discounts (optional)</label>
              {bulkDiscounts.map((bd, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="number"
                    min="2"
                    placeholder="Quantity (e.g. 10)"
                    className="border border-gray-300 rounded p-2 flex-1"
                    value={bd.quantity}
                    onChange={e => {
                      const arr = [...bulkDiscounts];
                      arr[idx].quantity = e.target.value;
                      setBulkDiscounts(arr);
                    }}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Discount %"
                    className="border border-gray-300 rounded p-2 flex-1"
                    value={bd.discount}
                    onChange={e => {
                      const arr = [...bulkDiscounts];
                      arr[idx].discount = e.target.value;
                      setBulkDiscounts(arr);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setBulkDiscounts(bulkDiscounts.filter((_, i) => i !== idx))}
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setBulkDiscounts([...bulkDiscounts, { quantity: '', discount: '' }])}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                + Add Bulk Discount
              </button>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white rounded-lg p-3 hover:bg-blue-600 transition-colors"
              >
                UPDATE PRODUCT
              </button>
              <button
                type="button"
                className="flex-1 bg-red-500 text-white rounded-lg p-3 hover:bg-red-600 transition-colors"
                onClick={handleDelete}
              >
                DELETE PRODUCT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
