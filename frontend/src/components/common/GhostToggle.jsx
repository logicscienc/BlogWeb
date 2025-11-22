import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function GhostToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showBoo, setShowBoo] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  const handleToggle = () => {
    setShowBoo(true);
    setTheme(isDark ? "light" : "dark");
    setTimeout(() => setShowBoo(false), 600);
  };

  return (
    <div className="flex flex-col items-center justify-center leading-none h-full">
      
      {/* Boo! (no margin-bottom) */}
      <div
        className={`transition-opacity font-semibold h-4 ${
          showBoo ? "opacity-100" : "opacity-0"
        } ${isDark ? "text-white" : "text-black"}`}
      >
        Boo!
      </div>

      <label className="relative inline-block w-[100px] h-[25px] cursor-pointer">
        <input
          type="checkbox"
          checked={isDark}
          onChange={handleToggle}
          className="opacity-0 w-0 h-0"
        />

        <div
          className={`absolute inset-0 rounded-full transition ${
            isDark ? "bg-[#459def]" : "bg-gray-500"
          }`}
        >
          <div
            className={`transition-transform duration-500 ${
              isDark ? "translate-x-[65px]" : "translate-x-0"
            }`}
          >
            <div
              className="relative w-[40px] h-[40px] rounded-full animate-bobble drop-shadow-xl"
              style={{
                top: "-10px",
                backgroundColor: isDark ? "white" : "black",
              }}
            >
              <div
                className="ghost-eye"
                style={{ borderColor: isDark ? "black" : "white" }}
              />
              <div
                className="ghost-bottom"
                style={{ backgroundColor: isDark ? "white" : "black" }}
              />
            </div>
          </div>
        </div>
      </label>
    </div>
  );
}






