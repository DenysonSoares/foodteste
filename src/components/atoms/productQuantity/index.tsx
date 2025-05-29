"use client";

import { CircleMinus, CirclePlus, Trash2 } from "lucide-react";
import { useEffect, useMemo } from "react";

import { useCart } from "@/contexts/cart/CartContext";
import { formatReal } from "@/lib/utils";

type ProductQuantityProps = {
  productId: string;
  price: number;
  store: string;
  storeImage: string;
  name: string;
  options?: {
    size: { label: string; price: number } | null;
    drinks: Record<string, any>;
    cutlery: { wants: boolean; price: number };
    complements: string[];
  };
  canAdd?: boolean;
};

const getCartItemKey = (
  productId: string,
  store: string,
  storeImage: string,
  options?: ProductQuantityProps["options"],
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

const ProductQuantity = ({
  productId,
  price,
  store,
  storeImage,
  name,
  options,
  canAdd,
}: ProductQuantityProps) => {
  const { cart, handleQuantityChange } = useCart();

  const currentKey = useMemo(
    () => getCartItemKey(productId, store, storeImage, options),
    [productId, store, storeImage, options],
  );

  const cartItem = useMemo(
    () =>
      cart.find(
        (item: any) =>
          getCartItemKey(
            item.productId,
            item.store,
            item.storeImage,
            item.options,
          ) === currentKey,
      ),
    [cart, currentKey],
  );

  const quantity = cartItem?.quantity || 0;
  const itemTotal = cartItem?.itemTotal || 0;
  const currentItemPrice = cartItem?.price || 0;

  useEffect(() => {
    if (quantity > 0 && currentItemPrice !== price) {
      handleQuantityChange(
        productId,
        quantity,
        price,
        store,
        storeImage,
        name,
        options,
      );
    }
  }, [
    price,
    quantity,
    currentItemPrice,
    productId,
    name,
    store,
    options,
    handleQuantityChange,
  ]);

  const handleAdd = () => {
    handleQuantityChange(
      productId,
      quantity + 1,
      price,
      store,
      storeImage,
      name,
      options,
    );
  };

  const increment = () => {
    handleQuantityChange(
      productId,
      quantity + 1,
      price,
      store,
      storeImage,
      name,
      options,
    );
  };

  const decrement = () => {
    const newQty = quantity - 1;
    handleQuantityChange(
      productId,
      newQty >= 0 ? newQty : 0,
      price,
      store,
      storeImage,
      name,
      options,
    );
  };

  return (
    <div className="flex items-center justify-between gap-4 border-b-[4px] px-[16px] py-[16px]">
      <div>
        <p className="text-[16px] font-bold text-[#393A3C]">quantos?</p>
        <span className="text-lg font-bold text-[#393A3C]">
          <span className="font-normal text-[#6D6F73]">total</span> R${" "}
          {formatReal(itemTotal || price)}
        </span>
      </div>

      {quantity === 0 ? (
        <button
          onClick={handleAdd}
          className={`rounded-[8px] px-5 py-2.5 text-[14px] font-semibold text-white transition ${
            canAdd
              ? "bg-[#6D6F73] hover:bg-green-700"
              : "cursor-not-allowed bg-gray-300"
          }`}
          disabled={!canAdd}
        >
          adicionar
        </button>
      ) : (
        <div className="flex items-center gap-2">
          {quantity === 1 ? (
            <Trash2 strokeWidth={1} color="#00A296" onClick={decrement} />
          ) : (
            <CircleMinus strokeWidth={1} color="#00A296" onClick={decrement} />
          )}
          <span className="min-w-[20px] text-center">{quantity}</span>
          <CirclePlus strokeWidth={1} color="#00A296" onClick={increment} />
        </div>
      )}
    </div>
  );
};

export default ProductQuantity;
