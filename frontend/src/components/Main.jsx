import { useEffect, useState } from "react";
import SearchBar from "./common/SearchBar";
import BlogCards from "./common/BlogCards";

const Main = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  // Fetch categories from Strapi
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:1337/api/categories");
        const json = await res.json();
        setCategories(json.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // Fetch blogs from Strapi
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          "http://localhost:1337/api/blog-posts?populate=*"
        );
        const json = await res.json();
        setBlogs(json.data || []);
        setFilteredBlogs(json.data || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on search query or category
  useEffect(() => {
    const filtered = blogs.filter((blog) => {
      const matchesCategory =
        activeCategory === "All" || blog.category?.name === activeCategory;
      const matchesSearch = blog.Title.toLowerCase().includes(
        searchQuery.toLowerCase()
      );
      return matchesCategory && matchesSearch;
    });
    setFilteredBlogs(filtered);
  }, [searchQuery, activeCategory, blogs]);

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8">
      {/* Heading */}
      <div className="text-center mb-10 w-full max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          <span>
            Your Own <span style={{ color: "#382b3f" }}>Blogging</span>
          </span>
          <br />
          <span>Platform</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl">
          This is your space to think out loud, to share what matters and to
          write without filters. Whether it's one word or a thousand, your
          story starts right here.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 w-full max-w-xl">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {/* ALL BUTTON */}
        <button
          onClick={() => setActiveCategory("All")}
          className={`px-4 py-2 rounded-lg transition-colors 
            ${
              activeCategory === "All"
                ? "bg-[#382b3f] text-white"
                : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
        >
          All
        </button>

        {/* Dynamic Categories */}
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.name)}
            className={`px-4 py-2 rounded-lg transition-colors 
              ${
                activeCategory === cat.name
                  ? "bg-[#382b3f] text-white"
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Blog Cards */}
      <BlogCards blogs={filteredBlogs} />
    </main>
  );
};

export default Main;




