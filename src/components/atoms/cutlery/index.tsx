import React, { useState } from "react";

type CutlerySelectorProps = {
  basePrice: number;
  onChange?: (newPrice: number, wantsCutlery: boolean) => void;
};

const CutlerySelector = ({ basePrice, onChange }: CutlerySelectorProps) => {
  const [wantsCutlery, setWantsCutlery] = useState<boolean | null>(null);

  const handleChange = (value: string) => {
    const wants = value === "yes";
    const updatedPrice = wants ? 1 : 0;
    setWantsCutlery(wants);
    onChange?.(updatedPrice, wants);
  };

  return (
    <div className="items-center justify-between gap-4 border-b-[4] px-[16px] py-[16px]">
      <div className="mb-4 flex justify-between">
        <div>
          <h4 className="text-[16px] font-bold text-[#393A3C]">
            precisa de talher descartável?
          </h4>
          <p className="font-normal text-[#6D6F73]">adiciona R$ 1,00</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-[#6D6F73]">
          <input
            type="radio"
            name="cutlery"
            value="yes"
            checked={wantsCutlery === true}
            onChange={(e) => handleChange(e.target.value)}
            className="mr-3 size-4"
          />
          Sim
        </label>

        <label className="flex items-center gap-2 text-[#6D6F73]">
          <input
            type="radio"
            name="cutlery"
            value="no"
            checked={wantsCutlery === false}
            onChange={(e) => handleChange(e.target.value)}
            className="mr-3 size-4"
          />
          Não
        </label>
      </div>
    </div>
  );
};

export default CutlerySelector;
