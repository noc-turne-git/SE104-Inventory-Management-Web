import { Search, FilterIcon } from "lucide-react";
import { useRef } from "react";
    
interface SearchBarProps {
  label: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar = ({ label, onChange }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onClick={() => inputRef.current?.focus()} // click cả div focus input
      className="pl-3 mb-6 flex items-center border border-gray-300 
      focus-within:border-blue-500 focus-within:border-2 
      rounded-xl cursor-text transition"
    >
      <Search className="w-4 h-4 text-gray-500" />

      <input
        ref={inputRef}
        type="text"
        placeholder={label}
        onChange={onChange} 
        className="w-full p-2 outline-none text-gray-500 h-12 bg-transparent"
      />
    </div>
  );
};


interface FilterBarProps {
    value : string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    select: string[],
}

export const FilterBar = ({value, onChange, select}: FilterBarProps) => {
    return (
            <div className="pl-3 mb-6 flex items-center border border-gray-300 focus-within:border-blue-500 focus-within:border-2 rounded-xl ">
                <FilterIcon className="w-4 h-4 text-gray-500" />
                <select
                    value={value}
                    onChange={onChange}
                    className="w-full p-2 outline-none text-gray-500 h-12 "
                >
                    {select.map(s => (
                        <option value={s}> 
                            {s} 
                        </option>
                    ))}
                </select>
            </div>
    );
}

export default SearchBar;