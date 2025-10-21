import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Modal } from "antd";
import toast from "react-hot-toast";
import Slider from "./../components/Slider";
import { useCart } from "../context/CartContext";

const { Meta } = Card;

function DetailedProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const [prod, setProd] = useState(null); // Define product state, initialize as null to handle loading state
  const [relatedProducts, setRelatedProducts] = useState([]); // Define related products state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [manualQty, setManualQty] = useState("");
  const [manualDiscount, setManualDiscount] = useState(0);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://vision-backend-lx5i.onrender.com/api/v1/product/get-product/${params.slug}`
      );

      if (data?.product) {
        setProd(data.product);
        getRelatedProducts(data.product._id, data.product.category._id); // Fetch related products
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
        `https://vision-backend-lx5i.onrender.com/api/v1/product/related-product/${pid}/${cid}`
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
    return <div>Loading...</div>; // Or any other loading indicator
  }
  console.log("prod", prod);

  // Generate variant options from prod.bulkDiscounts
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
    // Always use per-unit price (after discount if any) and correct quantity
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

  return (
    <div className="text-center">
      <h1 className="text-5xl font-semibold">Product Details</h1>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        <div className="slider z-10">
          <Slider images={prod.photo[0]?.split(",")} />
        </div>
        <div className="md:col-span-1">
          <h1 className="text-4xl font-serif font-bold">{prod.name}</h1>
          <h2 className="text-xl font-serif mt-24">{prod.description}</h2>
          <h2 className="text-xl font-serif font-bold">
            {prod.price.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </h2>
          <h2>{prod?.category?.name}</h2>
          {/* Price List Table */}
          <div className="my-6">
            <h3 className="text-lg font-bold mb-2">Price List (Inclusive of Discounts)</h3>
            <table className="w-full border text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Quantity</th>
                  <th className="p-2 border">Original Price</th>
                  <th className="p-2 border">Discount %</th>
                  <th className="p-2 border">Discounted Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border">1</td>
                  <td className="p-2 border">{prod.price?.toLocaleString("en-US", { style: "currency", currency: "INR" })}</td>
                  <td className="p-2 border">-</td>
                  <td className="p-2 border">{prod.price?.toLocaleString("en-US", { style: "currency", currency: "INR" })}</td>
                </tr>
                {prod.bulkDiscounts && prod.bulkDiscounts.map((bd, idx) => {
                  const original = prod.price * bd.quantity;
                  const discounted = original * (1 - bd.discount / 100);
                  return (
                    <tr key={idx}>
                      <td className="p-2 border">{bd.quantity}</td>
                      <td className="p-2 border">{original.toLocaleString("en-US", { style: "currency", currency: "INR" })}</td>
                      <td className="p-2 border">{bd.discount}%</td>
                      <td className="p-2 border">{discounted.toLocaleString("en-US", { style: "currency", currency: "INR" })}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Button
            type="default"
            className="ml-2 mt-5"
            onClick={() => setIsModalOpen(true)}
          >
            Add to Cart
          </Button>
          <Modal
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            title="Select Quantity/Variant"
          >
            <div className="flex flex-col gap-4">
              {/* Single piece option */}
              <div className="flex items-center justify-between border p-3 rounded-lg mb-2">
                <div>
                  <div className="font-semibold">{prod.name} (1 Pc)</div>
                  <span className="font-bold">{prod.price?.toLocaleString("en-US", { style: "currency", currency: "INR" })}</span>
                </div>
                <Button type="primary" onClick={() => handleAddToCart({ id: "single", label: prod.name + " (1 Pc)", price: prod.price, discount: 0, quantity: 1 })}>
                  Add
                </Button>
              </div>
              {/* Bulk options from admin */}
              {bulkOptions.map((variant) => (
                <div key={variant.id} className="flex items-center justify-between border p-3 rounded-lg mb-2">
                  <div>
                    <div className="font-semibold">{variant.label}</div>
                    <span className="text-red-500 font-bold mr-2">{variant.display}</span>
                    <span className="line-through text-gray-400">{variant.original}</span>
                    <span className="ml-2 text-green-600">{variant.discount}% OFF</span>
                  </div>
                  <Button type="primary" onClick={() => handleAddToCart(variant)}>
                    Add
                  </Button>
                </div>
              ))}
              {/* Manual quantity entry */}
              <div className="flex items-center gap-2 border p-3 rounded-lg mb-2">
                <input
                  type="number"
                  min="1"
                  placeholder="Enter quantity (e.g. 7, 15, 100)"
                  className="border rounded p-1 w-1/2"
                  value={manualQty}
                  onChange={e => setManualQty(e.target.value)}
                />
                <Button type="primary" onClick={handleManualAdd}>Add</Button>
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
                      <span className="ml-2">
                        {discount > 0 && <span className="text-green-600">{discount}% OFF</span>}
                        <span className="ml-2 font-bold">{price.toLocaleString("en-US", { style: "currency", currency: "INR" })}</span>
                      </span>
                    );
                  }
                  return null;
                })()}
              </div>
            </div>
          </Modal>
        </div>
        <div className="md:col-span-2 text-4xl font-serif mt-10 mb-11">
          Related Products
          <div>
            <h1 className="text-xl font-serif font-bold">
              {relatedProducts.length < 1 ? <h1>no similar Products</h1> : ""}
            </h1>
            {relatedProducts?.map((p) => (
              <Card
                key={p._id}
                hoverable
                style={{ width: 300 }}
                className="m-3 p-2"
                cover={
                  <img
                    alt={p.name}
                    src={`https://vision-backend-lx5i.onrender.com/api/v1/product/product-photo/${p._id}`}
                  />
                }
              >
                <Meta title={p.name} description={p.description} />
                <div className="card-name-price mt-3">
                  <h5 className="card-title">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </h5>
                </div>
                <div className="mt-3 flex">
                  <Button
                    type="primary"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </Button>
                  <Button
                    type="default"
                    className="ml-2"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailedProduct;
