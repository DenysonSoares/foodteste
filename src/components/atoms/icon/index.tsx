import Image from "next/image";

type IconProps = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  className?: string;
  onClick?: () => void;
};

export default function Icon({
  src,
  width,
  height,
  alt = "",
  className,
  onClick,
}: IconProps) {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={className}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    />
  );
}
