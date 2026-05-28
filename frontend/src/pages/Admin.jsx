import { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

export default function Admin() {
  const { user } = useContext(ShopContext);
  const [productData, setProductData] = useState({ name: '', price: '', description: '', image: '', category: '' });
  const [message, setMessage] = useState('');

  if (!user || !user.isAdmin) {
    return <p className="text-center text-red-500 font-semibold mt-10">Access Denied: Administrative privileges required.</p>;
  }

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post('http://localhost:5000/api/products', productData, config);
      setMessage('Product listed seamlessly!');
      setProductData({ name: '', price: '', description: '', image: '', category: '' });
    } catch (err) {
      setMessage('Listing action rejected. Please check authorization token validity.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Admin Panel - Create Product</h2>
      {message && <p className="mb-4 text-blue-600 font-medium text-sm">{message}</p>}
      <form onSubmit={handleAddProduct} className="space-y-4">
        <input type="text" placeholder="Title Name" required className="w-full border p-2 rounded" value={productData.name} onChange={e => setProductData({...productData, name: e.target.value})} />
        <input type="number" placeholder="Price Amount ($)" required className="w-full border p-2 rounded" value={productData.price} onChange={e => setProductData({...productData, price: e.target.value})} />
        <input type="text" placeholder="Image URL address" required className="w-full border p-2 rounded" value={productData.image} onChange={e => setProductData({...productData, image: e.target.value})} />
        <input type="text" placeholder="Category" required className="w-full border p-2 rounded" value={productData.category} onChange={e => setProductData({...productData, category: e.target.value})} />
        <textarea placeholder="Product description narratives..." required rows="3" className="w-full border p-2 rounded" value={productData.description} onChange={e => setProductData({...productData, description: e.target.value})} />
        <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 rounded transition">Publish Inventory</button>
      </form>
    </div>
  );
}