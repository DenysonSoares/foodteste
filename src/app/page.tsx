"use client";

import { useEffect, useState } from "react";

import Search from "@/components/molecules/search";
import CarouselBanner from "@/components/sections/carousel";
import CatalogList from "@/components/sections/catalogList";
import { fetchMockData } from "@/services/fetchMockData";
import { Store } from "@/types/store";

export default function Home() {
  const [stores, setStores] = useState<Store[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const load = async () => {
      const data = await fetchMockData();
      setStores(data);
    };
    load();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const filteredStores = stores.filter((store) => {
    const search = searchTerm.toLowerCase();
    const titleMatch = store.title.toLowerCase().includes(search);

    const categoriesMatch = Object.entries(store.categories).some(
      ([categoryName, items]) =>
        categoryName.toLowerCase().includes(search) ||
        items?.some((item) => item.name.toLowerCase().includes(search)),
    );

    return titleMatch || categoriesMatch;
  });

  const openStores = filteredStores.filter((store) => store.open);
  const closedStores = filteredStores.filter((store) => !store.open);

  return (
    <div>
      <Search onSearch={handleSearch} />

      <CarouselBanner />

      <CatalogList
        title="abertos"
        stores={openStores}
        isLoading={stores.length === 0}
      />
      <CatalogList
        title="fechados"
        stores={closedStores}
        isLoading={stores.length === 0}
      />
    </div>
  );
}
