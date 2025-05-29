import styles from "./styles.module.scss";

interface SearchProps {
  // eslint-disable-next-line no-unused-vars
  onSearch: (value: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  return (
    <div
      className={`relative mt-[-1] bg-[#7B1FA2] p-[16px] pt-[0] ${styles.searchBar}`}
    >
      <input
        className="h-[40] w-[100%] rounded-lg bg-white pl-[40px] outline-0"
        type="text"
        placeholder="Busque pela loja ou culinária"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
