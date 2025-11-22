// SearchBar.jsx
import { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useTheme } from "next-themes";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const iconColor = theme === "dark" ? "text-white" : "text-[#382b3f]";

  return (
    <div className="flex items-center justify-center">
      {/* Search Icon */}
      <FiSearch
        className={`cursor-pointer ${iconColor} text-3xl transition-colors duration-300`}
        onClick={() => setIsOpen(true)}
      />

      {/* Input box */}
      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search blogs..."
        onBlur={() => setIsOpen(false)}
        className={`ml-3 transition-all duration-300 ease-out rounded-full px-4 py-2 border border-white/30
          text-black placeholder-black dark:text-white dark:placeholder-white
          bg-white/20 backdrop-blur-sm
          ${isOpen ? "w-64 pl-4 pr-4 opacity-100 border" : "w-0 pl-0 pr-0 opacity-0 border-0"}`}
      />
    </div>
  );
}



