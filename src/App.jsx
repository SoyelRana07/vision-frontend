import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HeroSection from "./assets/Components/Hero.jsx";
import Header from "./components/Header.jsx";
import Sliders from "./assets/Components/Sliders.jsx";
import Slider2 from "./assets/Components/Slider2.jsx";
import Slider3 from "./assets/Components/Slider3.jsx";
import Stats from "./components/Stats.jsx";
import PlottersDesc from "./components/PlottersDesc.jsx";
import MachineDesc from "./components/MachineDesc.jsx";
import RawMaterialsDesc from "./components/RawMaterialsDesc";
import GoogleReviews from "./components/GoogleReviews.jsx";
import Newsletter from "./components/NewsLetter.jsx";
import Footer from "./assets/Components/Footer.jsx";
import AboutUs from "./assets/Components/About.jsx";
import Blog from "./assets/Components/Blog.jsx";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import AdminRoute from "./Routes/AdminRoute";
import CreateProduct from "./pages/Admin/CreateProduct";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Products from "./pages/Admin/Products";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import Search from "./pages/Search.jsx";
import DetailedProduct from "./pages/DetailedProduct";
import Cart from "./pages/Cart";
import ForgotPasssword from "./pages/Auth/ForgotPassword.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Blogs from "./pages/Blogs.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";
import CreateBlog from "./pages/Admin/CreateBlog.jsx";
import AdminBlogs from "./pages/Admin/Blogs.jsx";
import HelpCenter from "./pages/HelpCenter.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import RefundPolicy from "./pages/RefundPolicy.jsx";
import TermsConditions from "./pages/TermsConditions.jsx";
import Orders from "./pages/Orders.jsx";

function App() {
  return (
    <BrowserRouter>
      {/* Persistent Header */}
      <Header />

      <div className="content">
        <Routes>
          {/* Define Routes */}
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <Stats />
                <RawMaterialsDesc />
                <Slider3 />
                <PlottersDesc />
                <Sliders />
                <MachineDesc />
                <Slider2 />
                <GoogleReviews />
                <Newsletter />
              </>
            }
          />

          <Route
            path="/alternate"
            element={
              <>
                <HeroSection />
                <Stats />
                <PlottersDesc />
                <Sliders />
                <Slider2 />
                <Slider3 />
                <Blog />
              </>
            }
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/product/:slug" element={<DetailedProduct />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/category" element={<Categories />} />
          <Route path="/category/:slug" element={<CategoryProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/update-product/:slug" element={<UpdateProduct />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/create-blog" element={<CreateBlog />} />
            <Route path="admin/blogs" element={<AdminBlogs />} />
          </Route>
          <Route path="/forgotPassword" element={<ForgotPasssword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>

      {/* Persistent Footer */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
