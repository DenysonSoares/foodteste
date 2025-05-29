import Image from "next/image";
import Link from "next/link";

import { formatReal } from "@/lib/utils";
import { Store } from "@/types/store";

import Icon from "../icon";

interface CardProps {
  store: Store;
}

const Card = ({ store }: CardProps) => {
  const storeUrl = `/stores/${encodeURIComponent(store.title)}`;

  return (
    <Link href={store.open ? storeUrl : ""}>
      <div
        className={`mb-[16px] flex overflow-hidden rounded-lg bg-[#F5F6F9] transition hover:brightness-95 ${
          !store.open ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <Image alt="Imagem do card" width={72} height={72} src={store.image} />
        <div className="p-[12px]">
          <h4 className="text-base font-bold text-[#393A3C]">{store.title}</h4>
          <div className="flex gap-3">
            {store.free_delivery ? (
              <p className="flex gap-1 font-semibold text-[#027A7A]">
                <Icon
                  src="/assets/icons/delivery-free-g.svg"
                  width={24}
                  height={24}
                  alt="Fechar"
                />
                grátis
              </p>
            ) : (
              <p className="flex gap-1 font-semibold text-[#7B1FA2]">
                <Icon
                  src="/assets/icons/delivery.svg"
                  width={24}
                  height={24}
                  alt="Fechar"
                />
                {formatReal(store.value_delivery)}
              </p>
            )}

            <p className="flex gap-1">
              <Icon
                src="/assets/icons/star.svg"
                width={24}
                height={24}
                alt="Fechar"
              />
              {store.avaliation}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
