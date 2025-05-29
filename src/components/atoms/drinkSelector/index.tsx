import { CircleMinus, CirclePlus, Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

import { formatReal } from "@/lib/utils";

type DrinkOption = {
  label: string;
  value: string;
  price: number;
};

type DrinkSelectorProps = {
  onChange?: (selectedDrinks: {
    [key: string]: { quantity: number; price: number };
  }) => void;
};

const drinks: DrinkOption[] = [
  { label: "Coca-Cola", value: "coca", price: 5 },
  { label: "Pepsi", value: "pepsi", price: 4.5 },
  { label: "Fanta", value: "fanta", price: 4 },
];

const DrinkSelector = ({ onChange }: DrinkSelectorProps) => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const initialQuantities: { [key: string]: number } = {};
    drinks.forEach((drink) => {
      initialQuantities[drink.value] = 0;
    });
    setQuantities(initialQuantities);
  }, []);

  useEffect(() => {
    if (onChange) {
      const selected = Object.entries(quantities)
        .filter(([_, qty]) => qty > 0)
        .reduce(
          (acc, [key, qty]) => {
            const drink = drinks.find((d) => d.value === key);
            if (drink) {
              acc[key] = { quantity: qty, price: drink.price };
            }
            return acc;
          },
          {} as { [key: string]: { quantity: number; price: number } },
        );
      onChange(selected);
    }
  }, [quantities, onChange]);

  const increment = (value: string) => {
    setQuantities((prev) => ({ ...prev, [value]: (prev[value] || 0) + 1 }));
  };

  const decrement = (value: string) => {
    setQuantities((prev) => ({
      ...prev,
      [value]: prev[value] > 0 ? prev[value] - 1 : 0,
    }));
  };

  return (
    <div className="items-center justify-between gap-4 border-b-[4] py-[16px] pr-[16px] pl-[16px]">
      <div className="mb-4 flex justify-between">
        <div>
          <h4 className="text-[16px] font-bold text-[#393A3C]">
            vai querer bebida?
          </h4>
          <p className="font-normal text-[#6D6F73]">escolha 1</p>
        </div>
      </div>
      {drinks.map((drink) => (
        <div
          key={drink.value}
          className="mb-5 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => decrement(drink.value)}
              className="flex h-[24px] w-[24px] items-center rounded-[50] bg-gray-200 px-2 py-1 hover:bg-gray-300"
              aria-label={`Diminuir quantidade de ${drink.label}`}
            >
              <Minus size={20} strokeWidth={1} />
            </button>
            <span className="min-w-[20px] text-center">
              {quantities[drink.value] || 0}
            </span>

            <button
              onClick={() => increment(drink.value)}
              className="flex h-[24px] w-[24px] items-center rounded-[50] border-1 border-[#00A296] px-2 py-1 text-[#00A296]"
              aria-label={`Aumentar quantidade de ${drink.label}`}
            >
              <Plus size={20} strokeWidth={6} />
            </button>
          </div>
          <div className="flex w-[180px] items-center justify-start">
            <span className="justify-start text-[14px] font-semibold text-[#6D6F73]">
              {drink.label}
            </span>{" "}
          </div>
          <div className="w-[80px] text-right font-semibold">
            <span className="text-sm text-[14px] font-bold text-[#7B1FA2]">
              + R$ {formatReal(drink.price)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DrinkSelector;
