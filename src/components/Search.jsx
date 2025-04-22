import React from "react";
import { Search as SearchIcon } from "lucide-react";
const Search = ({action}) => {
  
  const currentDate = new Date();

  //   const formattedDate = currentDate.toLocaleDateString("en-US", options);
  const month = currentDate.toLocaleString("default", { month: "long" });

  
  
  return (
    <div className="flex items-center justify-between border-2 w-72 border-black/50  rounded-md px-1">
      <input
        onChange={(e) => action(e.target.value)}
        type="date"
        className="outline-none p-2  w-full placeholder:text-xs"
        placeholder={`Only ${month}'s day (12/3/20225)`}
      />
      <SearchIcon className="text-gray-500" size={14} />
    </div>
  );
};

export default Search;
