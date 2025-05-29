import Image from "next/image";

interface BannerProps {
  src: string;
}

const ProductBanner = ({ src }: BannerProps) => {
  return (
    <div>
      <Image
        alt="Product banner"
        width={390}
        height={195}
        src={src}
        style={{ width: "100%", height: "195" }}
      />
    </div>
  );
};

export default ProductBanner;
