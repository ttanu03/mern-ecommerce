import { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', isAdmin: false });
  const [error, setError] = useState('');
  const { login } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isRegister ? 'register' : 'login';
    try {
      const res = await axios.post(`http://localhost:5000/api/users/${endpoint}`, formData);
      login(res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication operation failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg bg-white shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input type="text" required className="w-full border p-2 rounded" onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" required className="w-full border p-2 rounded" onChange={e => setFormData({...formData, email: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" required className="w-full border p-2 rounded" onChange={e => setFormData({...formData, password: e.target.value})} />
        </div>
        {isRegister && (
          <div className="flex items-center space-x-2 py-2">
            <input type="checkbox" id="isAdmin" className="rounded" onChange={e => setFormData({...formData, isAdmin: e.target.checked})} />
            <label htmlFor="isAdmin" className="text-sm font-medium text-gray-700">Register as Administrator role</label>
          </div>
        )}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          {isRegister ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)} className="w-full text-center text-sm text-blue-500 mt-4 hover:underline">
        {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
      </button>
    </div>
  );
}