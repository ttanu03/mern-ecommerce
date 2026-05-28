import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(ShopContext);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl mb-4">Your basket is completely empty!</h2>
        <Link to="/" className="text-blue-500 underline">Go shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      <div className="space-y-4">
        {cartItems.map(item => (
          <div key={item._id} className="flex justify-between items-center border p-4 rounded bg-white shadow-sm">
            <div className="flex items-center space-x-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-500">${item.price} x {item.qty}</p>
              </div>
            </div>
            <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700 font-medium">Remove</button>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t pt-4 flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">Total: ${totalPrice.toFixed(2)}</h3>
        <button onClick={() => alert('Checkout implementation is up to you next!')} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Checkout</button>
      </div>
    </div>
  );
}