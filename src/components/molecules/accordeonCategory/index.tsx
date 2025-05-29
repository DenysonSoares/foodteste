import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import Icon from "@/components/atoms/icon";
import { formatReal, slugify } from "@/lib/utils";
import { Store } from "@/types/store";

interface AccordeonCategoryProps {
  store: Store;
}

const AccordeonCategory = ({ store }: AccordeonCategoryProps) => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const toggle = (key: string) => {
    setOpenIndex(openIndex === key ? null : key);
  };

  const storeSlug = slugify(store.title);

  return (
    <div className="space-y-4">
      {Object.entries(store.categories ?? {}).map(
        ([categoryName, products]) => (
          <div key={categoryName} className="border-b border-gray-200">
            <button
              onClick={() => toggle(categoryName)}
              className="flex w-full items-center justify-between bg-white px-4 py-4 transition hover:bg-gray-50"
            >
              <h3 className="text-left text-[16px] font-bold text-[#202326]">
                {categoryName}
              </h3>
              {openIndex === categoryName ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {openIndex === categoryName && (
              <div className="space-y-3 px-4 pb-4">
                {products?.map((product, idx) => {
                  const productSlug = slugify(product.name);
                  return (
                    <Link
                      key={idx}
                      href={`/stores/${storeSlug}/${productSlug}`}
                      className="flex items-center justify-between rounded-md px-2 pt-1 pb-1 hover:bg-gray-100"
                    >
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {product.description}
                        </p>
                      </div>
                      <div>
                        <p className="mt-1 flex justify-end gap-1.5 text-[12px] font-bold text-[#6D6F73] line-through">
                          R$ {formatReal(product.price - 5)}
                        </p>
                        <p className="mt-1 flex gap-1.5 text-[14px] font-bold text-[#02A117]">
                          <Icon
                            src="/assets/icons/cifrao.svg"
                            width={16}
                            height={16}
                            alt="Fechar"
                          />
                          R$ {formatReal(product.price)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ),
      )}
    </div>
  );
};

export default AccordeonCategory;
