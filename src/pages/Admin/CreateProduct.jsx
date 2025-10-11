import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import Layout from "./../../Layout";
import AdminMenu from "./AdminMenu";
import UploadWidget from "./../../components/UploadWidget";
const { Option } = Select;

function CreateProduct() {
  const [auth] = useAuth();
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [bulkDiscounts, setBulkDiscounts] = useState([{ quantity: '', discount: '' }]);

  // Fetch categories from the API
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
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      // productData.append("shipping", shipping);
      if (photo) {
        productData.append("photo", photo);
      }
      productData.append("bulkDiscounts", JSON.stringify(bulkDiscounts.filter(b => b.quantity && b.discount)));

      const { data } = await axios.post(
        "https://vision-backend-lx5i.onrender.com/api/v1/product/create-product",
        productData,
        {
          headers: {
            Authorization: auth?.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data?.success) {
        setTimeout(() => {
          navigate("/dashboard/admin/products");
        }, 1500);
        toast.success("Product created successfully");
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating product");
    }
  };

  return (
    <div className="container mx-auto py-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <AdminMenu />
        </div>
        <div className="col-span-9">
          <h1 className="text-2xl font-bold mb-4">Create Product</h1>
          <form onSubmit={handleCreate} className="">
            <div>
              <label className="block mb-2">Category</label>
              <Select
                placeholder="Select a category"
                size="large"
                className="w-full border rounded-lg"
                onChange={(val) => setCategory(val)}
              >
                {categories.map((category) => (
                  <Option key={category._id} value={category._id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block mb-2">Upload Photo</label>
              {/* <input
                type="file"
                accept="image/*"
                className="w-full border rounded-lg p-2 m-2"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
              <div>
                {photo && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height={"200px"}
                        className="img h-[200px]"
                      />
                    </div>
                  )}
              </div> */}
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
                    folder: "products",
                  }}
                  setState={setPhoto}
                />
              </div>
            </div>
            <div>
              <input
                type="text"
                value={name}
                placeholder="Product name"
                className="w-full border rounded-lg p-2 m-2"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <textarea
                value={description}
                placeholder="Product description"
                className="w-full border rounded-lg p-2 m-2"
                rows="4"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <input
                type="number"
                value={price}
                placeholder="Price"
                className="w-full border rounded-lg p-2 m-2"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <input
                type="number"
                value={quantity}
                placeholder="Quantity"
                className="w-full border rounded-lg p-2 m-2"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2">Bulk Discounts (optional)</label>
              {bulkDiscounts.map((bd, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="number"
                    min="2"
                    placeholder="Quantity (e.g. 10)"
                    className="border rounded p-1 w-1/2"
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
                    className="border rounded p-1 w-1/2"
                    value={bd.discount}
                    onChange={e => {
                      const arr = [...bulkDiscounts];
                      arr[idx].discount = e.target.value;
                      setBulkDiscounts(arr);
                    }}
                  />
                  <button type="button" onClick={() => setBulkDiscounts(bulkDiscounts.filter((_, i) => i !== idx))} className="text-red-500">Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => setBulkDiscounts([...bulkDiscounts, { quantity: '', discount: '' }])} className="text-blue-500">+ Add Bulk Discount</button>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-lg p-2 m-2"
              >
                Entry Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
