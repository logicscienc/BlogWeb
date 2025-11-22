import { useTheme } from "next-themes";

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer
      className="w-full py-10 px-4 flex flex-col items-center text-center"
      style={{ backgroundColor: "#382b3f" }}
    >
      {/* Website Name */}
      <h2
        className="text-2xl font-bold mb-2"
        style={{ color: isDark ? "white" : "white" }} // always visible on #382b3f
      >
        BlogSphere
      </h2>

      {/* Short Description */}
      <p
        className="max-w-md mb-4 text-sm leading-relaxed"
        style={{ color: isDark ? "#e0e0e0" : "#f0f0f0" }} // light gray for light mode
      >
        Sharing thoughts, ideas, and stories. Dive into our blog to explore
        articles on various topics and stay updated with the latest trends.
      </p>

      {/* Separator Line */}
      <div
        className="w-24 h-[1px] my-4"
        style={{ backgroundColor: isDark ? "white" : "#f0f0f0" }} // light line for light mode
      ></div>

      {/* Copyright */}
      <p
        className="text-xs"
        style={{ color: isDark ? "#e0e0e0" : "#f0f0f0" }} // light gray for light mode
      >
        &copy; {new Date().getFullYear()} BlogSphere. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

