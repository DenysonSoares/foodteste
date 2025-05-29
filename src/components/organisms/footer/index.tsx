const Footer = () => {
  return (
    <>
      <div className="h-[120px]"></div>
      <div
        className={`fixed bottom-0 bg-[#eef0f5] p-[24px] text-center`}
        style={{ width: "100%" }}
      >
        <p className="mb-[10px] text-sm font-bold text-[#580F78]">
          feito com 💜 em maringá-PR
        </p>
        <p className="text-base font-bold text-[#580F78]">
          aiqfome.com © 2007-2023 aiqfome LTDA . CNPJ: 09.186.786/0001-58
        </p>
      </div>
    </>
  );
};

export default Footer;
