/**
 * SearchInput Component
 * Handles user input for searching tourist attractions
 */
const SearchInput = ({ value, onChange }) => {
    return (
      <div className="w-full mb-8 flex flex-col">
        <label className="text-gray-700 text-base whitespace-nowrap">
          ค้นหาที่เที่ยว
        </label>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          className="w-full text-center px-0 py-2 border-0 border-b border-gray-300 rounded-none focus:outline-none focus:border-b-2 focus:border-[#4396C5] text-base bg-transparent"
        />
      </div>
    );
  };
export default SearchInput;
