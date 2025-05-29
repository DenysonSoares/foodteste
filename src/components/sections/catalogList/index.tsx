import Card from "@/components/atoms/card";
import { Store } from "@/types/store";

interface CatalogListProps {
  title: string;
  stores: Store[];
  isLoading?: boolean;
}

interface SkeletonProps {
  height: string;
}

export const SkeletonCard = ({ height }: SkeletonProps) => (
  <div
    className={`mb-4 w-full animate-pulse rounded-md bg-gray-300`}
    style={{ height: `${height}` }}
  />
);

const CatalogList = ({
  title,
  stores,
  isLoading = false,
}: CatalogListProps) => {
  return (
    <div className="p-[16px]">
      <h3 className="mb-[16px] text-xl font-black text-[#7B1FA2]">{title}</h3>

      {isLoading
        ? Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard height="72px" key={index} />
          ))
        : stores.map((store: Store, index: number) => (
            <Card key={index} store={store} />
          ))}
    </div>
  );
};

export default CatalogList;
