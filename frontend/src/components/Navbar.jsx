import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function Navbar() {
  const { cartItems, user, logout } = useContext(ShopContext);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="bg-gray-800 text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-wider">MERN-SHOP</Link>
        <div className="flex space-x-6 items-center">
          <Link to="/" className="hover:text-gray-300">Products</Link>
          <Link to="/cart" className="hover:text-gray-300">
            Cart <span className="bg-red-500 text-xs px-2 py-0.5 rounded-full ml-1">{cartCount}</span>
          </Link>
          {user?.isAdmin && <Link to="/admin" className="text-yellow-400 hover:underline">Admin</Link>}
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-400">Hi, {user.name}</span>
              <button onClick={logout} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}