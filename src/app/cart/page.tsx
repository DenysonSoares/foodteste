"use client";

import {
  CircleMinus,
  CirclePlus,
  Pencil,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/contexts/cart/CartContext";
import { formatReal, slugify } from "@/lib/utils";

const Cart = () => {
  const { cart, total, handleQuantityChange } = useCart();
  console.log("🚀 ~ Cart ~ cart:", cart);

  const groupedByStore = cart.reduce(
    (acc: Record<string, any[]>, item: any) => {
      const store = item.store || "Loja sem nome";
      if (!acc[store]) acc[store] = [];
      acc[store].push(item);
      return acc;
    },
    {},
  );

  const handleIncrement = (item: any) => {
    handleQuantityChange(
      item.productId,
      item.quantity + 1,
      item.price,
      item.store,
      item.storeImage,
      item.name,
      item.options,
    );
  };

  const handleDecrement = (item: any) => {
    const newQty = item.quantity - 1;
    handleQuantityChange(
      item.productId,
      newQty >= 0 ? newQty : 0,
      item.price,
      item.store,
      item.storeImage,
      item.name,
      item.options,
    );
  };

  return (
    <div className="mt-[90px] space-y-6">
      {cart.length === 0 ? (
        <div className="mt-[300px] flex items-center justify-center gap-3">
          <ShoppingCart strokeWidth={2} />
          <p className="text-gray-500">Seu carrinho está vazio.</p>
        </div>
      ) : (
        <>
          {Object.entries(groupedByStore).map(([store, items]) => {
            const storeImage = items[0]?.storeImage || "/imagem-padrao.png";

            return (
              <div key={store} className="mt-[20px]">
                <div>
                  <div className="mt-[20px] mb-2 flex items-center gap-2 pl-[16px]">
                    <Image
                      alt={`Imagem da loja ${store}`}
                      width={32}
                      height={32}
                      src={storeImage}
                      className="rounded-[4px] object-cover"
                    />
                    <div>
                      <p className="mb-[-3px] text-[14px] font-bold text-[#6D6F73]">
                        seus itens em
                      </p>
                      <h3 className="text-xl font-semibold">{store}</h3>
                    </div>
                  </div>

                  {items.map((item: any) => (
                    <div key={item.productId} className="border-b-4">
                      <div className="flex justify-between">
                        <div className="p-[16px]">
                          <p className="mb-5 text-lg font-semibold">
                            {item.name}
                          </p>
                          {item.options?.size && (
                            <div>
                              <p className="text-sm text-gray-600">
                                • tamanho:
                              </p>
                              <p className="text-sm text-gray-600">
                                {item.options.size.label}
                              </p>
                            </div>
                          )}
                          {item.options?.complements?.length > 0 && (
                            <div>
                              <p className="text-sm text-gray-600">
                                • complementos:
                              </p>
                              <p className="text-sm text-gray-600">
                                {item.options.complements.join(", ")}
                              </p>
                            </div>
                          )}
                          {item.options?.drinks?.length > 0 && (
                            <div>
                              <p className="text-sm text-gray-600">
                                • complementos:
                              </p>
                              <p className="text-sm text-gray-600">
                                {item.options.drinks.join(", ")}
                              </p>
                            </div>
                          )}
                          {item.options?.cutlery?.wants && (
                            <p className="text-sm text-gray-600">
                              Talheres: Sim
                            </p>
                          )}
                        </div>
                        <div className="p-[16px]">
                          <span className="flex justify-end font-bold text-[#7B1FA2]">
                            R$ {formatReal(item.itemTotal)}
                          </span>

                          <div className="mt-3 flex items-center justify-between gap-5">
                            <Link
                              href={`/stores/${slugify(item.store)}/${slugify(item.name)}`}
                              className="flex items-center gap-1 text-sm text-[#00A296] hover:underline"
                            >
                              <Pencil size={14} /> editar
                            </Link>
                            <div className="flex items-center gap-2">
                              {item.quantity === 1 ? (
                                <Trash2
                                  strokeWidth={1}
                                  color="#00A296"
                                  onClick={() => handleDecrement(item)}
                                  className="cursor-pointer"
                                />
                              ) : (
                                <CircleMinus
                                  strokeWidth={1}
                                  color="#00A296"
                                  onClick={() => handleDecrement(item)}
                                  className="cursor-pointer"
                                />
                              )}

                              <span className="min-w-[24px] text-center">
                                {item.quantity}
                              </span>

                              <CirclePlus
                                strokeWidth={1}
                                color="#00A296"
                                onClick={() => handleIncrement(item)}
                                className="cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div
            className="fixed bottom-0 z-50 flex h-[100] items-center justify-between rounded-t-[10px] border-t bg-white px-[24] shadow"
            style={{ width: "100%" }}
          >
            <div className="block w-30">
              <span className="block text-lg text-[14px] font-semibold">
                subtotal:
              </span>
              <span className="block text-lg text-[20px] font-extrabold text-[#7B1FA2]">
                R$ {formatReal(Number(total))}
              </span>
            </div>
            <div className="w-60">
              <Link href="/thanks">
                <button className="h-[48px] w-full rounded-md bg-[#7B1FA2] font-bold text-white">
                  ir para o pagamento
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
