import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Modal, Badge, Tag } from "antd";
import toast from "react-hot-toast";
import Slider from "./../components/Slider";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Package, Percent, Check } from "lucide-react";

const { Meta } = Card;
const API_BASE = import.meta.env.VITE_API_BASE || "https://vision-backend-328443733915.asia-south2.run.app";

function DetailedProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const [prod, setProd] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [manualQty, setManualQty] = useState("");
  const [manualDiscount, setManualDiscount] = useState(0);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE}/api/v1/product/get-product/${params.slug}`
      );

      if (data?.product) {
        setProd(data.product);
        getRelatedProducts(data.product._id, data.product.category._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const getRelatedProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${API_BASE}/api/v1/product/related-product/${pid}/${cid}`
      );

      if (data?.products) {
        setRelatedProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.slug) getProducts();
  }, [params.slug]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  if (!prod) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getBulkOptions = () => {
    if (!prod.bulkDiscounts || prod.bulkDiscounts.length === 0) return [];
    return prod.bulkDiscounts.map((bd) => ({
      id: `bulk_${bd.quantity}`,
      label: `${prod.name} (x${bd.quantity})`,
      price: prod.price * bd.quantity,
      discount: bd.discount,
      display: ((prod.price * bd.quantity) * (1 - bd.discount / 100)).toLocaleString("en-US", { style: "currency", currency: "INR" }),
      original: (prod.price * bd.quantity).toLocaleString("en-US", { style: "currency", currency: "INR" }),
      quantity: bd.quantity,
    }));
  };

  const handleAddToCart = (variant) => {
    const perUnitPrice = variant.discount
      ? Math.round(prod.price * (1 - variant.discount / 100))
      : prod.price;
    const productToAdd = {
      ...prod,
      variant: variant.id,
      price: perUnitPrice,
      quantity: variant.quantity || 1,
      bulkDiscount: variant.discount || 0,
    };
    addToCart(productToAdd);
    toast.success("Item Added to Cart");
    setIsModalOpen(false);
    setManualQty("");
    setManualDiscount(0);
  };

  const handleManualAdd = () => {
    const qty = parseInt(manualQty);
    if (!qty || qty < 1) return;
    const found = prod.bulkDiscounts?.find((b) => Number(b.quantity) === qty);
    const discount = found ? found.discount : 0;
    const perUnitPrice = discount
      ? Math.round(prod.price * (1 - discount / 100))
      : prod.price;
    handleAddToCart({
      id: `manual_${qty}`,
      label: `${prod.name} (x${qty})`,
      price: perUnitPrice,
      discount,
      display: (perUnitPrice * qty).toLocaleString("en-US", { style: "currency", currency: "INR" }),
      original: (prod.price * qty).toLocaleString("en-US", { style: "currency", currency: "INR" }),
      quantity: qty,
    });
  };

  const bulkOptions = getBulkOptions();

  const specificationsLabels = {
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
  };

  const getSpecificationsRows = () => {
    let specs = prod.specifications;
    if (typeof specs === 'string') {
      try { specs = JSON.parse(specs); } catch { specs = {}; }
    }
    specs = specs || {};

    const hasAnyValue = Object.values(specs).some(v => {
      if (v === null || v === undefined) return false;
      return String(v).trim() !== "";
    });
    const shouldShowTable = (prod.showSpecificationsTable === true || prod.showSpecificationsTable === 'true' || hasAnyValue);

    if (!shouldShowTable) return [];

    const rows = Object.entries(specificationsLabels)
      .filter(([key]) => {
        const value = specs[key];
        if (value === null || value === undefined) return false;
        const stringValue = String(value).trim();
        return stringValue !== "";
      })
      .map(([key, label]) => ({
        label,
        value: specs[key],
      }));
    return rows;
  };

  const specificationsRows = getSpecificationsRows();
  const showSpecsTable = specificationsRows.length > 0;

  const maxDiscount = prod.bulkDiscounts?.length > 0
    ? Math.max(...prod.bulkDiscounts.map(bd => bd.discount))
    : 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb */}
        {/* <div className="mb-6">
          <nav className="flex text-sm text-gray-600">
            <button onClick={() => navigate('/')} className="hover:text-gray-900 transition-colors">
              Home
            </button>
            <span className="mx-2">/</span>
            <button onClick={() => navigate('/products')} className="hover:text-gray-900 transition-colors">
              Products
            </button>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{prod.name}</span>
          </nav>
        </div> */}

        {/* Main Product Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: Product Images */}
            <div className="p-8 bg-gray-50 relative">
              {maxDiscount > 0 && (
                <div className="absolute top-4 left-4 z-20">
                  <Badge
                    count={`Up to ${maxDiscount}% OFF`}
                    style={{ backgroundColor: '#ef4444', fontSize: '14px', padding: '8px 12px', height: 'auto' }}
                  />
                </div>
              )}
              <div className="slider">
                <Slider images={prod.photo[0]?.split(",")} />
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="p-8 flex flex-col">
              <div className="mb-3">
                <Tag color="red" className="text-sm px-3 py-1">
                  {prod?.category?.name}
                </Tag>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {prod.name}
              </h1>

              {/* Short Description */}
              <div className="mb-6">
                <p className="text-base text-gray-600 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              {/* Price Section */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 mb-6 border border-gray-200">
                <p className="text-sm text-gray-600 mb-2 font-medium">Starting from</p>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-4xl font-bold text-gray-900">
                    {prod.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </h2>
                  <span className="text-lg text-gray-500">per piece</span>
                </div>
                {maxDiscount > 0 && (
                  <div className="mt-3 flex items-center gap-2 text-green-700">
                    <Percent className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Save up to {maxDiscount}% on bulk orders
                    </span>
                  </div>
                )}
              </div>

              {/* Quick Features */}
              <div className="mb-6 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>In Stock</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Package className="w-5 h-5 text-blue-600" />
                  <span>Fast Delivery</span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button

                size="large"
                className="w-full bg-red-500 h-14 text-lg text-white font-semibold shadow-md  hover:bg-red-800 transition-all"
                onClick={() => setIsModalOpen(true)}
                icon={<ShoppingCart className="w-5 h-5" />}
              >
                Add to Cart
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                Select quantity options in the next step
              </p>
            </div>
          </div>
        </div>

        {/* Price List Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Percent className="w-6 h-6 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-900">
              Bulk Discount Pricing
            </h3>
          </div>
          <p className="text-gray-600 mb-6">
            Save more when you buy in larger quantities. All prices include applicable discounts.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-100 to-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b-2 border-gray-200">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b-2 border-gray-200">
                    Original Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b-2 border-gray-200">
                    Discount
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b-2 border-gray-200">
                    You Pay
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">1 piece</td>
                  <td className="px-6 py-4 text-gray-700">
                    {prod.price?.toLocaleString("en-US", { style: "currency", currency: "INR" })}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {prod.price?.toLocaleString("en-US", { style: "currency", currency: "INR" })}
                  </td>
                </tr>
                {prod.bulkDiscounts && prod.bulkDiscounts.map((bd, idx) => {
                  const original = prod.price * bd.quantity;
                  const discounted = original * (1 - bd.discount / 100);
                  return (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {bd.quantity} pieces
                      </td>
                      <td className="px-6 py-4 text-gray-500 line-through">
                        {original.toLocaleString("en-US", { style: "currency", currency: "INR" })}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          count={`${bd.discount}%`}
                          style={{ backgroundColor: '#10b981' }}
                        />
                      </td>
                      <td className="px-6 py-4 font-bold text-green-700 text-lg">
                        {discounted.toLocaleString("en-US", { style: "currency", currency: "INR" })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Specifications Table */}
        {showSpecsTable && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Product Specifications
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody className="divide-y divide-gray-100">
                  {specificationsRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-700 w-1/3 bg-gray-50">
                        {row.label}
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add to Cart Modal */}
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          title={
            <div className="text-xl font-bold">
              Select Quantity
            </div>
          }
          width={600}
        >
          <div className="flex flex-col gap-3 mt-4">
            {/* Single piece option */}
            <div className="group border-2 border-gray-200 hover:border-blue-400 p-4 rounded-lg transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">
                    {prod.name}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-gray-900">
                      {prod.price?.toLocaleString("en-US", { style: "currency", currency: "INR" })}
                    </span>
                    <span className="text-sm text-gray-500">for 1 piece</span>
                  </div>
                </div>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => handleAddToCart({
                    id: "single",
                    label: prod.name + " (1 Pc)",
                    price: prod.price,
                    discount: 0,
                    quantity: 1
                  })}
                  className="ml-4"
                >
                  Add
                </Button>
              </div>
            </div>

            {/* Bulk options */}
            {bulkOptions.map((variant) => (
              <div
                key={variant.id}
                className="group border-2 border-gray-200 hover:border-green-400 p-4 rounded-lg transition-all hover:shadow-md bg-gradient-to-r from-green-50 to-white"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">
                        {variant.label}
                      </span>
                      <Badge
                        count={`${variant.discount}% OFF`}
                        style={{ backgroundColor: '#10b981' }}
                      />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-green-700">
                        {variant.display}
                      </span>
                      <span className="line-through text-gray-400 text-sm">
                        {variant.original}
                      </span>
                    </div>
                  </div>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => handleAddToCart(variant)}
                    className="ml-4"
                    style={{ backgroundColor: '#10b981', borderColor: '#10b981' }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            ))}

            {/* Manual quantity entry */}
            <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg bg-gray-50">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Custom Quantity
              </p>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  placeholder="Enter quantity (e.g. 7, 15, 100)"
                  className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none"
                  value={manualQty}
                  onChange={e => setManualQty(e.target.value)}
                />
                <Button
                  type="primary"
                  size="large"
                  onClick={handleManualAdd}
                  disabled={!manualQty || parseInt(manualQty) < 1}
                >
                  Add
                </Button>
              </div>
              {manualQty && (() => {
                const qty = parseInt(manualQty);
                const found = prod.bulkDiscounts?.find((b) => Number(b.quantity) === qty);
                if (qty > 0) {
                  const discount = found ? found.discount : 0;
                  const perUnitPrice = discount
                    ? Math.round(prod.price * (1 - discount / 100))
                    : prod.price;
                  const price = perUnitPrice * qty;
                  return (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Total:</span>
                        <div className="flex items-center gap-2">
                          {discount > 0 && (
                            <Badge
                              count={`${discount}% OFF`}
                              style={{ backgroundColor: '#10b981', fontSize: '12px' }}
                            />
                          )}
                          <span className="text-lg font-bold text-gray-900">
                            {price.toLocaleString("en-US", { style: "currency", currency: "INR" })}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default DetailedProduct;