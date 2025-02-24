import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../redux/reducers/cartReducer";

const RestaurantDetail = () => {
  const { id: restaurantId } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/restaurantsDetails/${restaurantId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.restaurant) {
          setRestaurant(data.restaurant);
          setMenuItems(data.menuItems);
        }
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };
    fetchData();
  }, [restaurantId]);

  const handleAddToCart = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeItem({ item_id: itemId }));
  };

  const filteredMenu = menuItems.filter((item) => {
    if (filter === "veg") return item.is_veg;
    if (filter === "non-veg") return !item.is_veg;
    return true;
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-full px-40 mx-auto py-4">
        {restaurant && (
          <div className="p-4 mb-4 flex justify-between bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <div className="w-2/3 text-center">
              <h2 className="text-5xl font-bold text-center p-4">{restaurant.name}</h2>
              <p className="text-gray-600 text-xl">Your favorite destination for fresh and tasty food. <br/>Open {restaurant.opening_time} - {restaurant.closing_time}.</p>
              <p className="text-gray-800 font-semibold text-xl">📍 Location: {restaurant.address}</p>
              <p className="text-gray-800 font-semibold text-xl">📞 Contact: {restaurant.phone}</p>
            </div>
            <div className="w-150 p-5">
              <img src={restaurant.image_url} className="w-full h-auto rounded-lg shadow-md" alt="Restaurant" />
            </div>
          </div>
        )}

        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-3xl font-semibold">Full Menu</h3>
            <select
              className="border rounded-md p-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredMenu.length > 0 ? (
              filteredMenu.map((item) => (
                <div key={item.item_id} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
                  <img src={item.image_url} alt={item.name} className="w-full h-60 object-cover rounded-md" />
                  <h4 className="text-lg font-semibold mt-2">{item.name}</h4>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-orange-500">${item.price}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <button
                      className="bg-orange-500 text-white py-1 px-3 rounded-md cursor-pointer hover:bg-orange-800"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No items available for the selected category.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
