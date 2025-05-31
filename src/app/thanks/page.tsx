import Link from "next/link";

import Icon from "@/components/atoms/icon";

const Thanks = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="mt-[150px] flex flex-col items-center justify-center text-center">
        <Icon
          src="/assets/icons/delivery.svg"
          width={60}
          height={60}
          alt="Fechar"
        />
        <h1 className="text-[18px]">Pedido confirmado!</h1>
        <p className="mb-[40] text-[14px]">Agora é só aguardar seu pedido!</p>
        <Link
          className="rounded-[4px] bg-[#7b1fa2] px-6 py-2 text-white"
          href={"/"}
        >
          Comprar mais
        </Link>
      </div>
    </div>
  );
};

export default Thanks;
