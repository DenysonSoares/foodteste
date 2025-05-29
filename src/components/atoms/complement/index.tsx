import React, { useState } from "react";

type SideOption = {
  label: string;
  value: string;
};

type SideSelectorProps = {
  onChange?: (selectedSides: string[]) => void;
};

const ComplementSelector = ({ onChange }: SideSelectorProps) => {
  const sides: SideOption[] = [
    { label: "Acompanhamento 1", value: "acomp_1" },
    { label: "Acompanhamento 2", value: "acomp_2" },
    { label: "Acompanhamento 3", value: "acomp_3" },
    { label: "Acompanhamento 4", value: "acomp_4" },
  ];

  const [selectedSides, setSelectedSides] = useState<string[]>([]);

  const handleToggle = (value: string) => {
    const isSelected = selectedSides.includes(value);

    let updated: string[];

    if (isSelected) {
      updated = selectedSides.filter((v) => v !== value);
    } else {
      if (selectedSides.length >= 2) return;
      updated = [...selectedSides, value];
    }

    setSelectedSides(updated);
    onChange?.(updated);
  };

  return (
    <div className="items-center justify-between gap-4 border-b-[4] px-[16px] py-[16px]">
      <div className="mb-4 flex justify-between">
        <div>
          <h4 className="text-[16px] font-bold text-[#393A3C]">
            acompanhamentos
          </h4>
          <p className="font-normal text-[#6D6F73]">escolha de 1 a 2</p>
        </div>
        <div>
          <p className="rounded-[4px] bg-[#393A3C] px-2 py-1.5 text-[12px] text-white">
            obrigatorio
          </p>
        </div>
      </div>

      {sides.map((side) => (
        <label
          className="flex items-center justify-between gap-2 text-[#6D6F73]"
          key={side.value}
          style={{ display: "block", marginBottom: 15 }}
        >
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="side"
              value={side.value}
              checked={selectedSides.includes(side.value)}
              onChange={() => handleToggle(side.value)}
              className="mr-3 size-4 text-[#6D6F73]"
            />
            {side.label}
          </div>
        </label>
      ))}
    </div>
  );
};

export default ComplementSelector;
