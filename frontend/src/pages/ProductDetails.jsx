import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => navigate('/'));
  }, [id, navigate]);

  if (!product) return <p className="text-center mt-10">Loading product particulars...</p>;

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white shadow mt-10 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8">
      <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded" />
      <div className="flex flex-col justify-between">
        <div>
          <span className="text-xs font-semibold bg-gray-200 uppercase tracking-wider px-2 py-1 rounded">{product.category}</span>
          <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-4">{product.name}</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
        </div>
        <div>
          <div className="text-3xl font-extrabold text-gray-900 mb-4">${product.price}</div>
          <button onClick={() => addToCart(product)} className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-medium">
            Add to Shopping Cart
          </button>
        </div>
      </div>
    </div>
  );
}