import React, { useEffect, useState } from 'react';
import config from '../constants.js';
import { UserCircleIcon, ArrowRightOnRectangleIcon, BuildingStorefrontIcon, PlusCircleIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const DashboardPage = ({ user, onLogout, manifest }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [myRestaurants, setMyRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [newRestaurantData, setNewRestaurantData] = useState({ name: '', description: '', address: '' });

  const loadData = async () => {
    try {
      const response = await manifest.from('Restaurant').find({ include: ['owner'], sort: { createdAt: 'desc' } });
      setRestaurants(response.data);
      if (user.role === 'owner') {
        const filteredRestaurants = response.data.filter(r => r.owner?.id === user.id);
        setMyRestaurants(filteredRestaurants);
      }
    } catch (error) {
      console.error('Failed to load restaurants:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  useEffect(() => {
    if (selectedRestaurant) {
      const fetchMenuItems = async () => {
        try {
          const response = await manifest.from('MenuItem').find({ filter: { restaurantId: selectedRestaurant.id } });
          setMenuItems(response.data);
        } catch (error) {
          console.error('Failed to load menu items:', error);
        }
      };
      fetchMenuItems();
    }
  }, [selectedRestaurant]);

  const handleCreateRestaurant = async (e) => {
    e.preventDefault();
    try {
      await manifest.from('Restaurant').create(newRestaurantData);
      setNewRestaurantData({ name: '', description: '', address: '' });
      loadData();
    } catch (error) {
      console.error('Failed to create restaurant:', error);
      alert('Could not create restaurant.');
    }
  };

  const RestaurantCard = ({ restaurant, onClick }) => (
    <div onClick={onClick} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <img className="w-full h-48 object-cover" src={restaurant.coverImage?.thumbnail?.url || 'https://via.placeholder.com/400x250'} alt={restaurant.name} />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{restaurant.name}</h3>
        <p className="text-sm text-gray-600 mt-1 truncate">{restaurant.description}</p>
        <p className="text-xs text-gray-500 mt-2">By: {restaurant.owner?.name || 'N/A'}</p>
      </div>
    </div>
  );

  const DinerView = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Discover Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map(r => <RestaurantCard key={r.id} restaurant={r} onClick={() => setSelectedRestaurant(r)} />)}
      </div>
    </div>
  );

  const OwnerView = () => (
    <div>
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Restaurant</h2>
        <form onSubmit={handleCreateRestaurant} className="space-y-4">
          <input type="text" placeholder="Restaurant Name" value={newRestaurantData.name} onChange={e => setNewRestaurantData({...newRestaurantData, name: e.target.value})} className="w-full p-2 border rounded-md" required />
          <textarea placeholder="Description" value={newRestaurantData.description} onChange={e => setNewRestaurantData({...newRestaurantData, description: e.target.value})} className="w-full p-2 border rounded-md" />
          <input type="text" placeholder="Address" value={newRestaurantData.address} onChange={e => setNewRestaurantData({...newRestaurantData, address: e.target.value})} className="w-full p-2 border rounded-md" />
          <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center gap-2"><PlusCircleIcon className='w-5 h-5' />Add Restaurant</button>
        </form>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myRestaurants.map(r => <RestaurantCard key={r.id} restaurant={r} onClick={() => setSelectedRestaurant(r)} />)}
      </div>
    </div>
  );

  const RestaurantDetailView = () => (
    <div>
      <button onClick={() => setSelectedRestaurant(null)} className="mb-6 text-blue-600 font-semibold hover:underline">← Back to Restaurants</button>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedRestaurant.name}</h2>
      <p className="text-gray-600 mb-6">{selectedRestaurant.address}</p>
      <h3 className="text-xl font-bold text-gray-800 mb-4">Menu</h3>
      <div className="space-y-4">
        {menuItems.length > 0 ? menuItems.map(item => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <img src={item.photo?.small?.url || 'https://via.placeholder.com/100'} alt={item.name} className='w-16 h-16 object-cover rounded-md' />
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
            <div className='text-right'>
                <p className="font-bold text-green-600">${item.price}</p>
                {user.role === 'diner' && 
                    <button className='mt-1 px-3 py-1 bg-green-500 text-white text-sm rounded-full hover:bg-green-600 transition'>Add to Order</button>}
            </div>
          </div>
        )) : <p className='text-gray-500'>No menu items found for this restaurant.</p>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BuildingStorefrontIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">FlavorFind</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-gray-700">{user.name}</p>
              <p className="text-sm text-gray-500 capitalize">{user.role}</p>
            </div>
            <button onClick={onLogout} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full transition">
              <ArrowRightOnRectangleIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedRestaurant ? <RestaurantDetailView /> : (
          user.role === 'diner' ? <DinerView /> : <OwnerView />
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
