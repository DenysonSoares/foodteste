import Image from "next/image";
import Link from "next/link";

import { formatReal } from "@/lib/utils";
import { Store } from "@/types/store";

import Icon from "../icon";

interface StoreTitleProps {
  store: Store;
}

const StoreTitle = ({ store }: StoreTitleProps) => {
  return (
    <div className="px-[16px] py-[24px]">
      <div className="flex items-center">
        <Image
          className="mr-2 rounded-sm"
          alt="Imagem do card"
          width={36}
          height={36}
          src={store.image}
        />
        <h1 className="text-xl font-black text-[#202326]">{store.title}</h1>
      </div>
      <div className="mt-2 flex justify-between">
        <div className="flex gap-4">
          <Icon
            src="/assets/icons/share.svg"
            width={24}
            height={24}
            alt="Fechar"
          />
          <Icon
            src="/assets/icons/heart.svg"
            width={24}
            height={24}
            alt="Fechar"
          />
        </div>
        <div>
          <Link className="text-[12px] font-bold text-[#00A296]" href={"#"}>
            mais infos
          </Link>
        </div>
      </div>
      <div className="mt-1.5">
        <div className="flex items-center gap-4">
          <p className="flex items-center text-[14px] font-bold text-[#7B1FA2]">
            <Icon
              src="/assets/icons/delivery-x.svg"
              width={24}
              height={24}
              alt="Fechar"
            />
            {formatReal(store.value_delivery)}
          </p>
          <p className="text-[12px] text-[#6D6F73]">• hoje, 30-40 min</p>
          <p className="text-[12px] text-[#6D6F73]">• 5.2km</p>
        </div>
      </div>
      <div>
        <p className="mt-[6px] inline-block rounded-[4px] bg-[#F2FAFA] p-1.5 text-[12px] font-bold text-[#027A7A]">
          entrega grátis acima de R$ 35,00
        </p>
      </div>
      <div className="mt-1.5 mb-1.5 flex gap-4">
        <p className="flex text-[12px] font-bold text-[#6D6F73]">
          {" "}
          <Icon
            src="/assets/icons/star.svg"
            width={16}
            height={16}
            alt="Fechar"
            className="mr-2"
          />
          {store.avaliation} de 5
        </p>
        <p className="text-[12px] font-bold text-[#02A117]">• fecha às 20:00</p>
      </div>
      <div>
        <p className="text-[12px] font-bold text-[#6D6F73]">
          pedido mínimo: R$ 15,00
        </p>
      </div>
    </div>
  );
};

export default StoreTitle;
