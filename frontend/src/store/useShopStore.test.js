import { describe, it, expect, beforeEach, vi } from 'vitest';
import useShopStore from './useShopStore';

describe('Zustand Shop Store Tests', () => {
  // Reset the store before each test
  beforeEach(() => {
    useShopStore.setState({
      cartItems: {},
      products: [],
      token: "",
    });
  });

  it('should initialize with default values', () => {
    const state = useShopStore.getState();
    expect(state.currency).toBe("₹");
    expect(state.delivery_fee).toBe(10);
    expect(state.cartItems).toEqual({});
  });

  it('should successfully add an item to the cart and update state', async () => {
    // Add dummy product to state to test calculations later
    useShopStore.getState().setProducts([{
      _id: "prod_1",
      name: "Awesome T-Shirt",
      price: 100
    }]);

    // 1. Add size M
    await useShopStore.getState().addToCart("prod_1", "M");
    let state = useShopStore.getState();
    
    expect(state.cartItems["prod_1"]).toBeDefined();
    expect(state.cartItems["prod_1"]["M"]).toBe(1);
    
    // 2. Add size M again (quantity should become 2)
    await useShopStore.getState().addToCart("prod_1", "M");
    state = useShopStore.getState();
    expect(state.cartItems["prod_1"]["M"]).toBe(2);
    
    // 3. Add size L (new size entry)
    await useShopStore.getState().addToCart("prod_1", "L");
    state = useShopStore.getState();
    expect(state.cartItems["prod_1"]["L"]).toBe(1);
  });

  it('should explicitly update an item quantity', async () => {
    await useShopStore.getState().addToCart("prod_2", "S");
    let state = useShopStore.getState();
    expect(state.cartItems["prod_2"]["S"]).toBe(1);

    // Update quantity to 5
    await useShopStore.getState().updateQuantity("prod_2", "S", 5);
    state = useShopStore.getState();
    expect(state.cartItems["prod_2"]["S"]).toBe(5);
  });

  it('should calculate the correct total cart count', async () => {
    await useShopStore.getState().addToCart("prod_1", "M");
    await useShopStore.getState().addToCart("prod_1", "L");
    await useShopStore.getState().addToCart("prod_2", "S");
    
    // Total should be 3 unique additions
    const count = useShopStore.getState().getCartCount();
    expect(count).toBe(3);
  });

  it('should calculate the correct total cart amount based on prices', async () => {
    useShopStore.getState().setProducts([
      { _id: "p1", price: 50 },
      { _id: "p2", price: 100 },
    ]);

    await useShopStore.getState().addToCart("p1", "M"); // 1 * 50 = 50
    await useShopStore.getState().addToCart("p2", "L"); // 1 * 100 = 100
    await useShopStore.getState().updateQuantity("p2", "L", 2); // 2 * 100 = 200

    const amount = useShopStore.getState().getCartAmount();
    // Total should be 50 + 200 = 250
    expect(amount).toBe(250);
  });
});
