import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div
      className="mt-[300] flex items-center justify-center"
      style={{ width: "100%" }}
    >
      <div className="inline-block animate-spin">
        <LoaderCircle color="#7B1FA2" size={50} strokeWidth={3} />
      </div>
    </div>
  );
};

export default Loading;
