"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useCart } from "@/contexts/cart/CartContext";

const CartButton = () => {
  const { cart } = useCart();
  const [showTooltip, setShowTooltip] = useState(false);
  const prevCartLength = useRef(cart.length);

  useEffect(() => {
    if (cart.length !== prevCartLength.current) {
      setShowTooltip(true);

      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 2000);

      prevCartLength.current = cart.length;

      return () => clearTimeout(timer);
    }
  }, [cart.length]);

  return (
    <>
      {showTooltip && (
        <div className="fixed bottom-[80px] left-1/2 z-50 -translate-x-1/2 rounded bg-black/80 px-4 py-2 text-sm text-white">
          {cart.length === 0 ? "Carrinho vazio" : "Produto adicionado"}
        </div>
      )}

      {cart.length > 0 && (
        <div
          className="fixed bottom-2 z-50 flex items-center justify-stretch px-[24px] py-[16px]"
          style={{ width: "100%" }}
        >
          <Link
            href="/cart"
            className="flex h-[48px] w-full items-center justify-center rounded-[8px] bg-[#7B1FA2] text-center text-[16px] font-bold text-white"
          >
            Ver tícket
          </Link>
        </div>
      )}
    </>
  );
};

export default CartButton;
