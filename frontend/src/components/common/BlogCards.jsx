import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BlogCards = ({ blogs }) => {
  if (!blogs || blogs.length === 0)
    return <p className="text-gray-500 text-lg">No blogs found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
      {blogs.map((blog, index) => {
        const imgUrl = blog.CoverImage?.formats?.small?.url
          ? `http://localhost:1337${blog.CoverImage.formats.small.url}`
          : "/placeholder.jpg";

        return (
          <Link to={`/blog/${blog.documentId}`} key={blog.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              whileHover={{
                y: -10,
                scale: 1.03,
                rotate: 0.5,
                transition: { type: "spring", stiffness: 250 }
              }}
              className="
                relative overflow-hidden rounded-2xl cursor-pointer group 
                shadow-lg bg-white/10 dark:bg-gray-800/20 backdrop-blur-lg
                transition-all duration-500 
              "
            >
              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={imgUrl}
                  alt={blog.Title}
                  className="
                    w-full h-full object-cover 
                    transition-transform duration-700 
                    group-hover:scale-110
                  "
                />

                <div
                  className="
                    absolute inset-0 bg-gradient-to-t 
                    from-black/50 via-black/20 to-transparent 
                    opacity-60 group-hover:opacity-80
                    transition-opacity duration-500
                  "
                ></div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition group-hover:text-[#382B3F]">
                  {blog.Title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mt-3">
                  {blog.excerpt?.slice(0, 120)}...
                </p>

                <p className="mt-4 text-sm text-gray-500">
                  Category:{" "}
                  <span className="font-medium" style={{ color: "#382B3F" }}>
                    {blog.category?.name}
                  </span>
                </p>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};

export default BlogCards;




