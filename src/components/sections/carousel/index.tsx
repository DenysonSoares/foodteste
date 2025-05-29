import Image from "next/image";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselBanner() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <Image
            width={390}
            height={130}
            alt="Imagem do banner"
            src={"/assets/images/banner.png"}
            style={{ width: "100%", height: "auto" }}
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            width={390}
            height={130}
            alt="Imagem do banner"
            src={"/assets/images/banner.png"}
            style={{ width: "100%", height: "auto" }}
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            width={390}
            height={130}
            alt="Imagem do banner"
            src={"/assets/images/banner.png"}
            style={{ width: "100%", height: "auto" }}
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}

export default CarouselBanner;
