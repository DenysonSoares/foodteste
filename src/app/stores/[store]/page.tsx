"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import Loading from "@/components/atoms/loading";
import StoreTitle from "@/components/atoms/storeTitle";
import AccordeonCategory from "@/components/molecules/accordeonCategory";
import { fetchStoreData } from "@/services/fetchMockData";
import { Store as StoreType } from "@/types/store";

const Store = () => {
  const params = useParams();
  const storeTitle = params.store as string;

  const [store, setStore] = useState<StoreType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!storeTitle) return;
    setLoading(true);

    const decodedTitle = decodeURIComponent(storeTitle);

    fetchStoreData(decodedTitle).then((data) => {
      setStore(data);
      setLoading(false);
    });
  }, [storeTitle]);

  if (loading) return <Loading />;
  if (!store) return <p>Loja não encontrada</p>;

  return (
    <div>
      <StoreTitle store={store} />
      <AccordeonCategory store={store} />
    </div>
  );
};

export default Store;
