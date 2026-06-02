"use client";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  type: "service" | "course";
  description: string;
  paymentStructure?: "full" | "half-half"; // Add this field
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: number;
  count: number;
  // New: Amount payable now (for checkout)
  amountPayableNow: number;
  // New: Amount to be paid later
  amountPayableLater: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Load cart from localStorage on mount (only runs on client side)
  useEffect(() => {
    setIsClient(true);
    try {
      const savedCart = localStorage.getItem("cart");
      console.log("Loading cart from localStorage:", savedCart);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          // Ensure old cart items have paymentStructure default
          const migratedCart = parsedCart.map((item: CartItem) => ({
            ...item,
            paymentStructure: item.paymentStructure || (item.type === "course" ? "half-half" : "full")
          }));
          setItems(migratedCart);
        }
      }
    } catch (e) {
      console.error("Failed to load cart:", e);
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (isClient) {
      console.log("Saving cart to localStorage:", items);
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, isClient]);

  const addItem = useCallback((item: CartItem) => {
    console.log("Adding item:", item);
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) {
        console.log("Item already exists:", item.id);
        return prev;
      }
      // Set default paymentStructure based on type
      const itemWithPayment = {
        ...item,
        paymentStructure: item.paymentStructure || (item.type === "course" ? "half-half" : "full")
      };
      const newItems = [...prev, itemWithPayment];
      console.log("New items array:", newItems);
      return newItems;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    console.log("Removing item:", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    console.log("Clearing cart");
    setItems([]);
    localStorage.removeItem("cart");
  }, []);

  // Calculate total amount (full price of all items)
  const total = items.reduce((sum, i) => sum + i.price, 0);
  
  // Calculate amount payable now (services: full, courses: 50%)
  const amountPayableNow = items.reduce((sum, item) => {
    if (item.type === "course" && item.paymentStructure === "half-half") {
      return sum + (item.price / 2);
    }
    return sum + item.price;
  }, 0);
  
  // Calculate amount to be paid later (only half of courses)
  const amountPayableLater = items.reduce((sum, item) => {
    if (item.type === "course" && item.paymentStructure === "half-half") {
      return sum + (item.price / 2);
    }
    return 0;
  }, 0);
  
  const count = items.length;

  console.log("Current cart state - Items:", items.length, "Total:", total, "Pay now:", amountPayableNow);

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      clearCart, 
      total, 
      count,
      amountPayableNow,
      amountPayableLater
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
