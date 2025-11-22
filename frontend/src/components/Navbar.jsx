import { useTheme } from "next-themes";
import GhostToggle from "./common/GhostToggle";

const Navbar = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="w-full  shadow-sm  top-0 z-50" style={{ backgroundColor: "#382b3f" }}>
      <nav className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4">
        {/* Logo */}
        <h1
          className={`text-2xl font-bold transition-colors duration-300`}
          style={{
            fontFamily: "Righteous",
            color: isDark ? "white" : "black",
          }}
        >
          BlogSphere
        </h1>

        {/* Ghost Toggle */}
        <GhostToggle />
      </nav>
    </header>
  );
};

export default Navbar;






