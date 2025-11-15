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
// Prefer local backend when VITE_API_BASE is set; fallback to production URL
const API_BASE =
  import.meta.env.VITE_API_BASE ||
  "https://vision-backend-328443733915.asia-south2.run.app";

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
  const [bulkDiscounts, setBulkDiscounts] = useState([
    { quantity: "", discount: "" },
  ]);
  const [showSpecificationsTable, setShowSpecificationsTable] = useState(false);
  const [specifications, setSpecifications] = useState({
    brand: "",
    manufacturer: "",
    model: "",
    colour: "",
    material: "",
    numberOfItems: "",
    machineType: "",
    controllerType: "",
    controlMode: "",
    includedComponents: "",
    usageApplication: "",
    temperatureRange: "",
    timeRange: "",
    power: "",
    voltage: "",
    transferSize: "",
    transferPlateSaucerDia: "",
    machineDimension: "",
    machineWeight: "",
    packingDimension: "",
    packedItemWeight: "",
  });
  const [hiddenSpecFields, setHiddenSpecFields] = useState({});

  // Fetch categories from the API
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE}/api/v1/category/get-category`,
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
      productData.append(
        "bulkDiscounts",
        JSON.stringify(bulkDiscounts.filter((b) => b.quantity && b.discount))
      );
      // Convert boolean to string for FormData
      productData.append(
        "showSpecificationsTable",
        showSpecificationsTable ? "true" : "false"
      );

      // Only include specifications that are not hidden and have values
      const filteredSpecs = {};
      Object.entries(specifications).forEach(([key, value]) => {
        if (!hiddenSpecFields[key] && value && value.trim() !== "") {
          filteredSpecs[key] = value;
        }
      });
      productData.append("specifications", JSON.stringify(filteredSpecs));

      console.log("Sending product data:", {
        showSpecificationsTable: showSpecificationsTable ? "true" : "false",
        specifications: filteredSpecs,
        hasSpecifications: Object.keys(filteredSpecs).length > 0,
      });

      const { data } = await axios.post(
        `${API_BASE}/api/v1/product/create-product`,
        productData,
        {
          headers: {
            Authorization: auth?.token,
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
                    onChange={(e) => {
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
                    onChange={(e) => {
                      const arr = [...bulkDiscounts];
                      arr[idx].discount = e.target.value;
                      setBulkDiscounts(arr);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setBulkDiscounts(
                        bulkDiscounts.filter((_, i) => i !== idx)
                      )
                    }
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setBulkDiscounts([
                    ...bulkDiscounts,
                    { quantity: "", discount: "" },
                  ])
                }
                className="text-blue-500"
              >
                + Add Bulk Discount
              </button>
            </div>

            {/* Specifications Section */}
            <div className="border-t pt-4 mt-6">
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id="showSpecificationsTable"
                  checked={showSpecificationsTable}
                  onChange={(e) => setShowSpecificationsTable(e.target.checked)}
                  className="w-4 h-4"
                />
                <label
                  htmlFor="showSpecificationsTable"
                  className="font-semibold text-lg"
                >
                  Show Specifications Table
                </label>
              </div>

              {showSpecificationsTable && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-4">
                    Fill in the specifications below. You can hide individual
                    fields by unchecking them.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries({
                      brand: "Brand",
                      manufacturer: "Manufacturer",
                      model: "Model",
                      colour: "Colour",
                      material: "Material",
                      numberOfItems: "Number of items",
                      machineType: "Machine Type",
                      controllerType: "Controller type",
                      controlMode: "Control Mode",
                      includedComponents: "Included Components",
                      usageApplication: "Usage/Application",
                      temperatureRange: "Temperature Range",
                      timeRange: "Time Range",
                      power: "Power",
                      voltage: "Voltage",
                      transferSize: "Transfer Size",
                      transferPlateSaucerDia: "Transfer Plate/Saucer Dia",
                      machineDimension: "Machine Dimension",
                      machineWeight: "Machine Weight",
                      packingDimension: "Packing Dimension",
                      packedItemWeight: "Packed Item Weight",
                    }).map(([key, label]) => (
                      <div key={key} className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={!hiddenSpecFields[key]}
                          onChange={(e) => {
                            setHiddenSpecFields({
                              ...hiddenSpecFields,
                              [key]: !e.target.checked,
                            });
                          }}
                          className="mt-2 w-4 h-4"
                        />
                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-1">
                            {label}
                          </label>
                          <input
                            type="text"
                            value={specifications[key] || ""}
                            onChange={(e) =>
                              setSpecifications({
                                ...specifications,
                                [key]: e.target.value,
                              })
                            }
                            placeholder={`Enter ${label.toLowerCase()}`}
                            className="w-full border rounded-lg p-2 text-sm"
                            disabled={hiddenSpecFields[key]}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
