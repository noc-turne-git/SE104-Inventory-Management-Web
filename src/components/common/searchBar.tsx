import { Search } from "lucide-react";

interface SearchBarProps {
    label : string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar = ({label, onChange}: SearchBarProps) => {
    return (
            <div className="pl-3 mb-6 flex items-center border border-gray-300 focus-within:border-blue-500 focus-within:border-2 rounded-xl ">
                <Search className="w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder= {label}
                        //value={searchTerm}
                        //onChange={(e) => onChange}
                        className="w-full-4 p-2 outline-none text-gray-500 h-12 "
                    />
            </div>
    );
}

export default SearchBar;