import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useShopStore = create((set, get) => ({
  currency: "₹",
  delivery_fee: 10,
  backendUrl,
  products: [],
  search: "",
  showSearch: true,
  cartItems: {},
  token: localStorage.getItem("token") || "",
  userData: null,

  setUserData: (userData) => set({ userData }),
  setProducts: (products) => set({ products }),
  setSearch: (search) => set({ search }),
  setShowSearch: (showSearch) => set({ showSearch }),
  setCartItems: (cartItems) => set({ cartItems }),
  setToken: (token) => {
    set({ token });
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
      set({ userData: null });
    }
  },

  fetchData: async () => {
    const { products } = get();
    if (products.length > 0) return; // Prevent redundant fetching

    try {
      const response = await axios.get(backendUrl + "/api/v1/products/list");
      if (response.data.success === "200" || response.data.success) {
        set({ products: response.data.products });
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  },

  getCartCount: () => {
    const { cartItems } = get();
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  },

  addToCart: async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    const { cartItems, token } = get();
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    
    set({ cartItems: cartData });

    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "/api/v1/cart/add",
          { itemId, size },
          { headers: { token } }
        );
        toast.success(response.data.msg);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  },

  updateQuantity: async (itemId, size, quantity) => {
    const { cartItems, token } = get();
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    set({ cartItems: cartData });

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/v1/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  },

  getUserCart: async (tokenArg) => {
    const token = tokenArg || get().token;
    if (!token) return;
    
    try {
      const response = await axios.post(
        backendUrl + "/api/v1/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        set({ cartItems: response.data.cartData });
      } else {
        get().setToken("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  },

  fetchUserProfile: async (tokenArg) => {
    const token = tokenArg || get().token;
    if (!token) return;
    
    try {
      const response = await axios.post(
        backendUrl + "/api/v1/user/profile",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        set({ userData: response.data.user });
      } else {
        toast.error(response.data.msg);
        get().setToken("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  },

  getCartAmount: () => {
    const { cartItems, products } = get();
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (!itemInfo) continue;
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  },
}));

export default useShopStore;
