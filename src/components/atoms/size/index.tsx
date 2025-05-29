import React, { useState } from "react";

import { formatReal } from "@/lib/utils";

import Icon from "../icon";

type SizeOption = {
  label: string;
  value: "small" | "medium" | "large";
  price: number;
  promotion?: number;
};

type SizeSelectorProps = {
  // eslint-disable-next-line no-unused-vars
  onChange?: (size: SizeOption) => void;
  price: number;
};

const SizeSelector = ({ onChange, price }: SizeSelectorProps) => {
  const sizes: SizeOption[] = [
    { label: "pequeno", value: "small", price: price, promotion: price - 5 },
    { label: "médio", value: "medium", price: price + 3 },
    { label: "grande", value: "large", price: price + 6 },
  ];

  const [selectedSize, setSelectedSize] = useState<SizeOption>(sizes[0]);

  const handleChange = (value: string) => {
    const size = sizes.find((s) => s.value === value);
    if (size) {
      setSelectedSize(size);
      onChange?.(size);
    }
  };

  return (
    <div className="items-center justify-between gap-4 border-b-[4] py-[16px] pr-[16px] pl-[16px]">
      <div className="mb-4 flex justify-between">
        <div>
          <h4 className="text-[16px] font-bold text-[#393A3C]">
            qual o tamanho?
          </h4>
          <p className="font-normal text-[#6D6F73]">escolha 1</p>
        </div>
        <div>
          <p className="rounded-[4px] bg-[#393A3C] px-2 py-1.5 text-[12px] text-white">
            obrigatorio
          </p>
        </div>
      </div>
      {sizes.map((size) => (
        <label
          className="flex justify-between"
          key={size.value}
          style={{ display: "block", marginBottom: 15 }}
        >
          <div className="flex justify-between">
            <div className="flex items-center text-[#6D6F73]">
              <input
                type="radio"
                name="size"
                value={size.value}
                onChange={(e) => handleChange(e.target.value)}
                className="mr-3 size-4"
              />{" "}
              {size.promotion && (
                <Icon
                  src="/assets/icons/cifrao.svg"
                  width={24}
                  height={24}
                  alt="Fechar"
                />
              )}
              {size.label}
            </div>
            <div>
              {size.promotion ? (
                <div className="flex items-center justify-end">
                  <p className="mr-1 text-[12px] font-bold text-[#6D6F73]">
                    de {formatReal(size.price)} por
                  </p>
                  <p className="text-[14px] font-bold text-[#02A117]">
                    R$ {formatReal(size.promotion)}
                  </p>
                </div>
              ) : (
                <p className="text-[14px] font-bold text-[#7B1FA2]">
                  R$ {formatReal(size.price)}
                </p>
              )}
            </div>
          </div>
        </label>
      ))}
    </div>
  );
};

export default SizeSelector;
