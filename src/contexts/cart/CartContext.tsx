/* eslint-disable no-unused-vars */
"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

type CartItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  store: string;
  storeImage: string;
  itemTotal: number;
  options?: {
    size: { label: string; price: number } | null;
    drinks: Record<string, any>;
    cutlery: { wants: boolean; price: number };
    complements: string[];
  };
};

type CartContextType = {
  cart: CartItem[];
  total: number;
  handleQuantityChange: (
    productId: string,
    quantity: number,
    price: number,
    store: string,
    storeImage: string,
    name: string,
    options?: CartItem["options"],
  ) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const generateKey = (
  productId: string,
  store: string,
  storeImage: string,
  options?: CartItem["options"],
) => {
  return JSON.stringify({
    productId,
    store,
    storeImage,
    size: options?.size?.label || null,
    drinks: options?.drinks || {},
    cutlery: options?.cutlery?.wants || false,
    complements: options?.complements || [],
  });
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleQuantityChange = (
    productId: string,
    quantity: number,
    price: number,
    store: string,
    storeImage: string,
    name: string,
    options?: CartItem["options"],
  ) => {
    const itemTotal = quantity * price;
    const key = generateKey(productId, store, storeImage, options);

    setCart((prevCart) => {
      if (quantity === 0) {
        return prevCart.filter(
          (item) =>
            generateKey(
              item.productId,
              item.store,
              item.storeImage,
              item.options,
            ) !== key,
        );
      }

      const existingIndex = prevCart.findIndex(
        (item) =>
          generateKey(
            item.productId,
            item.store,
            item.storeImage,
            item.options,
          ) === key,
      );

      if (existingIndex !== -1) {
        const newCart = [...prevCart];
        newCart[existingIndex] = {
          productId,
          quantity,
          price,
          name,
          store,
          storeImage,
          itemTotal,
          options,
        };
        return newCart;
      }

      return [
        ...prevCart,
        {
          productId,
          quantity,
          price,
          name,
          store,
          storeImage,
          itemTotal,
          options,
        },
      ];
    });
  };

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.itemTotal, 0);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, total, handleQuantityChange }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
