import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../form/CategoryForm";
import { useAuth } from "../../context/auth";
import { Modal, Select, TreeSelect } from "antd";
import Layout from "./../../Layout";
import AdminMenu from "./AdminMenu";

function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [auth] = useAuth();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [parent, setParent] = useState(null);
  const [editParent, setEditParent] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        { name, parent },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
        setName("");
        setParent(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in creating category");
    }
  };

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
      console.error(error);
      toast.error("Something went wrong in fetching categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
        { name: updatedName, parent: editParent },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        getAllCategory();
        setUpdatedName("");
        setSelected(null);
        setVisible(false);
        setEditParent(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in updating category");
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${categoryId}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data?.success) {
        toast.success("Category deleted successfully");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in deleting category");
    }
  };

  // Helper to build tree data for TreeSelect
  const buildCategoryTree = (categories, parent = null) => {
    return categories
      .filter(cat => String(cat.parent) === String(parent))
      .map(cat => ({
        title: cat.name,
        value: cat._id,
        key: cat._id,
        children: buildCategoryTree(categories, cat._id),
      }));
  };
  const treeData = buildCategoryTree(categories);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Admin Menu */}
        <div className="md:col-span-3">
          <AdminMenu />
        </div>

        {/* Main Content */}
        <div className="md:col-span-9">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="mb-3">
                <input
                  type="text"
                  className="input input-bordered input-success w-full max-w-xs mt-2 ml-2 p-2"
                  placeholder="Enter new category"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <TreeSelect
                  style={{ width: 250 }}
                  value={parent}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={treeData}
                  placeholder="Select parent category (optional)"
                  treeDefaultExpandAll
                  allowClear
                  onChange={setParent}
                />
              </div>
              <button type="submit" className="btn btn-primary ml-2">
                Submit
              </button>
            </form>
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left border-b">Name</th>
                    <th className="px-4 py-2 text-left border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c._id}>
                      <td className="px-4 py-2 border-b">{c.name}</td>
                      <td className="px-4 py-2 border-b">
                        <button
                          className="px-4 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="ml-2 px-4 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                          onClick={() => handleDelete(c._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              open={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <h3 className="text-lg font-semibold mb-4">Edit Category</h3>
              <form onSubmit={handleUpdate} className="mb-6">
                <div className="mb-3">
                  <input
                    type="text"
                    className="input input-bordered input-success w-full max-w-xs mt-2 ml-2 p-2"
                    placeholder="Edit category name"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <TreeSelect
                    style={{ width: 250 }}
                    value={editParent}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={treeData.filter(cat => cat.value !== selected?._id)}
                    placeholder="Select parent category (optional)"
                    treeDefaultExpandAll
                    allowClear
                    onChange={setEditParent}
                  />
                </div>
                <button type="submit" className="btn btn-primary ml-2">
                  Update
                </button>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCategory;
