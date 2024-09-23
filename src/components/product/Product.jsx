import React, { useState, useEffect } from "react";
import { useGetProductsQuery } from "../../redux/api/ProductsApi";
import { Link } from "react-router-dom";
import { Rate } from "antd";
import { FaHeart } from "react-icons/fa";

const Product = () => {
  const { data } = useGetProductsQuery();
  const [likedProducts, setLikedProducts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [autocomplete, setAutocomplete] = useState([]);

  const handleLike = (productId) => {
    setLikedProducts((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  useEffect(() => {
    if (data && data.payload) {
      const filtered = data.payload.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);

      if (searchTerm.length > 0) {
        const auto = data.payload
          .filter((product) =>
            product.product_name
              .toLowerCase()
              .startsWith(searchTerm.toLowerCase())
          )
          .map((product) => product.product_name);
        setAutocomplete(auto);
      } else {
        setAutocomplete([]);
      }
    }
  }, [searchTerm, data]);

  return (
    <>
      <div className="p-6 bg-gray-100 ">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-3 px-6 mb-4 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 mt-10"
        />

        {autocomplete.length > 0 && (
          <ul className="bg-white border border-gray-300 rounded-md mt-2 max-h-48 overflow-y-auto">
            {autocomplete.map((item, index) => (
              <li
                key={index}
                className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                onClick={() => setSearchTerm(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div
        id="shop"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 bg-gray-100"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden relative"
            >
              <div className="absolute top-2 right-2">
                <FaHeart
                  size={24}
                  onClick={() => handleLike(product._id)}
                  className={`cursor-pointer transition-colors ${
                    likedProducts[product._id]
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                />
              </div>

              <Link to={`/single/${product._id}`}>
                <img
                  src={product.product_images[0]}
                  alt={product.product_name}
                  className="w-full object-cover"
                />
              </Link>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {product.product_name}
                </h3>
                <p className="text-gray-600 text-base mb-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center text-gray-800">
                  <p className="text-2xl font-bold text-green-600">
                    ${product.sale_price}
                  </p>
                  <p className="text-sm font-semibold text-gray-600">
                    In Stock: {product.countInStock}
                  </p>
                </div>

                <p className="text-gray-600 text-sm mt-2">
                  Category: {product.category}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  <Rate disabled defaultValue={2} />
                </p>

                <button className="w-full mt-4 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105">
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700 col-span-full">
            No products found.
          </p>
        )}
      </div>
    </>
  );
};

export default Product;
