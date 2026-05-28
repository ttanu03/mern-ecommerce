import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(ShopContext);

  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition bg-white p-4 flex flex-col justify-between">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
        <h3 className="font-semibold text-lg text-gray-800 truncate">{product.name}</h3>
        <p className="text-gray-500 text-sm my-1 line-clamp-2">{product.description}</p>
        <span className="text-xl font-bold text-gray-900">${product.price}</span>
      </Link>
      <button 
        onClick={() => addToCart(product)}
        className="w-full mt-4 bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition"
      >
        Add To Cart
      </button>
    </div>
  );
}