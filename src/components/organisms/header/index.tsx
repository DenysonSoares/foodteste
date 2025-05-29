import { ChevronRight } from "lucide-react";
import Link from "next/link";

import Icon from "../../atoms/icon";

const Header = () => {
  return (
    <div
      className={`fixed top-0 z-50 flex w-[100%] items-center justify-between bg-[#7B1FA2] p-[16px]`}
    >
      <Link href={"/"}>
        <Icon
          src="/assets/icons/logo-icon.svg"
          width={32}
          height={32}
          alt="Fechar"
        />
      </Link>
      <div className={`flex w-70`}>
        <Icon
          src="/assets/icons/marker.svg"
          width={24}
          height={24}
          alt="Fechar"
        />
        <div className="f w-100 pl-3 text-left text-base font-bold text-white">
          <span className="block w-100 text-sm font-normal">entregando em</span>
          <p className="gap- flex items-center">
            Rua Mandaguari, 198 <ChevronRight size={18} />
          </p>
        </div>
      </div>
      <Icon src="/assets/icons/user.svg" width={24} height={24} alt="Fechar" />
    </div>
  );
};

export default Header;
