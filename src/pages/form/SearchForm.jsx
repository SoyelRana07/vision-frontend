import React from "react";
import { useSearch } from "../../context/Search.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function SearchForm() {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error + "in handle submit");
    }
  };
  return (
    <div>
      <form className="flex">
        <div className="flex">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Search..."
            value={values.keyword}
            onChange={(e) => {
              setValues({ ...values, keyword: e.target.value });
            }}
          />
        </div>
        <div>
          <button className="ml-2 mt-2 text-3xl" onClick={handleSubmit}>
            🔍
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
