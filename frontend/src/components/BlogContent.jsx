import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentForm from "./common/CommentForm";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.5 },
  }),
};

const BlogContent = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `http://localhost:1337/api/blog-posts/${id}?populate=*`
        );
        const json = await res.json();
        setBlog(json.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    fetchBlog();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:1337/api/comments?filters[blog_post][documentId][$eq]=${id}`
        );
        const json = await res.json();
        setComments(json.data || []);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [id]);

  if (!blog)
    return (
      <p className="text-center text-lg text-gray-500">Loading...</p>
    );

  const publishDate = new Date(blog.publishedAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const imgUrl = blog.CoverImage?.formats?.large?.url
    ? `http://localhost:1337${blog.CoverImage.formats.large.url}`
    : "/placeholder.jpg";

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      {/* Publish Date */}
      <motion.p
        className="text-gray-500 text-sm mb-2 text-center"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        Published on {publishDate}
      </motion.p>

      {/* Title */}
      <motion.h1
        className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight text-center"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        {blog.Title}
      </motion.h1>

      {/* Author */}
      <motion.p
        className="text-gray-600 dark:text-gray-300 mt-2 mb-6"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        By <span className="font-medium text-[#382B3F]">Admin</span>
      </motion.p>

      {/* Image */}
 <motion.img
  src={imgUrl}
  alt={blog.Title}
   className="w-full h-auto rounded-2xl mb-10 shadow-[0_10px_30px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
  variants={fadeInUp}
  initial="hidden"
  animate="visible"
  custom={3}
/>




      {/* Paragraphs */}
      <motion.div
        className="prose prose-lg dark:prose-invert max-w-none leading-relaxed"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={4}
      >
        {blog.Content?.map((block, i) => (
          <p key={i} className="mb-5">
            {block.children.map((child) => child.text).join("")}
          </p>
        ))}
      </motion.div>

      {/* Tags + Category */}
      <motion.div
        className="mt-10 flex flex-wrap gap-3 justify-center"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={5}
      >
        <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
          Category: {blog.category?.name}
        </span>
        {blog.tags?.map((tag) => (
          <span
            key={tag.id}
            className="px-3 py-1 bg-[#382B3F]/10 text-[#382B3F] rounded-full text-sm"
          >
            #{tag.name}
          </span>
        ))}
      </motion.div>

      {/* Comments */}
      <motion.div
        className="mt-10 text-left"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={6}
      >
        <h2 className="text-2xl font-bold mb-5">Comments</h2>

        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          <div className="space-y-4">
            {comments.map((c) => {
              const commentText = c.Comment?.map((block) =>
                block.children.map((child) => child.text).join("")
              ).join("\n") || "";

              return (
                <div
                  key={c.id}
                  className="p-4 border border-gray-300 dark:border-gray-700 rounded-xl"
                >
                  <p className="font-semibold">{c.name || "Anonymous"}</p>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {commentText}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Comment Form */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={7}
        className="mt-10"
      >
        <CommentForm
          blogId={id}
          className="w-full max-w-xl mx-auto"
          onCommentAdded={(newComment) =>
            setComments([...comments, newComment])
          }
        />
      </motion.div>
    </div>
  );
};

export default BlogContent;
 

