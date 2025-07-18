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
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`,
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
    } catch (error) {
      console.error("Error loading product:", error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  //   // Fetch categories from the API
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category",
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

  //const Handle form submission
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
      if (photo) {
        productData.append("photo", photo);
      }
      productData.append("bulkDiscounts", JSON.stringify(bulkDiscounts.filter(b => b.quantity && b.discount)));

      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${id}`,
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
        toast.success("Product updated successfully");
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in upadating product");
    }
  };
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure, you want to delete");
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/product/delete-product/${id}`,
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
    <div className="container mx-auto py-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <AdminMenu />
        </div>
        <div className="col-span-9">
          <h1 className="text-2xl font-bold mb-4">Update Product</h1>
          <div>
            <label className="block mb-2">Category</label>
            <Select
              placeholder="Select a category"
              size="large"
              className="w-full border rounded-lg"
              onChange={(val) => setCategory(val)}
              value={category}
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
          </div>
          <div className="sideContainer flex-1 h-[300px] bg-gray-50 p-6 flex items-center gap-6">
            {photo &&
              photo.map((image, index) => (
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
                folder: "Updated-Products",
              }}
              setState={setPhoto}
            />
          </div>
          <div>
            <input
              type="text"
              value={name}
              placeholder="Product name"
              className="w-full border rounded-lg p-2"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <textarea
              value={description}
              placeholder="Product description"
              className="w-full border rounded-lg p-2"
              rows="4"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              value={price}
              placeholder="Product price"
              className="w-full border rounded-lg p-2"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              value={quantity}
              placeholder="Product quantity"
              className="w-full border rounded-lg p-2"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div>
            <Select
              placeholder="Select shipping option"
              size="large"
              className="w-full border rounded-lg"
              onChange={(value) => setShipping(value)}
              value={shipping ? "yes" : "no"}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
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
              className="w-full bg-blue-500 text-white rounded-lg p-2"
              onClick={handleUpdate}
            >
              UPDATE PRODUCT
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white rounded-lg p-2 mt-2"
              onClick={handleDelete}
            >
              DELETE PRODUCT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
