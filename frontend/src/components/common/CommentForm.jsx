import { useState } from "react";

const CommentForm = ({ blogId, onCommentAdded, className }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!name || !comment) return alert("Please enter name and comment");

  setLoading(true);

  try {
    // 1. Get blog numeric id from documentId
    const blogRes = await fetch(`http://localhost:1337/api/blog-posts?filters[documentId][$eq]=${blogId}`);
    const blogJson = await blogRes.json();
    const numericId = blogJson.data[0]?.id;
    if (!numericId) throw new Error("Blog not found");

    // 2. Prepare Rich Text comment
    const richTextComment = [
      { type: "paragraph", children: [{ type: "text", text: comment }] },
    ];

    // 3. POST comment with numeric id
    const res = await fetch("http://localhost:1337/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          name,
          Comment: richTextComment,
          blog_post: numericId, // numeric id, not documentId
        },
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Error posting comment:", data);
      alert("Failed to post comment.");
    } else {
      onCommentAdded(data.data);
      setName("");
      setComment("");
    }
  } catch (err) {
    console.error("Error posting comment:", err);
    alert("Failed to post comment.");
  }

  setLoading(false);
};


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#382B3F]"
      />

      <textarea
        placeholder="Your Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#382B3F]"
        rows={5}
      />

      <button
        type="submit"
        disabled={loading}
        className={`rounded-lg px-6 py-3 font-semibold transition-colors ${
          document.documentElement.classList.contains("dark")
            ? "bg-white text-[#382B3F] hover:bg-gray-200"
            : "bg-[#382B3F] text-white hover:bg-[#2e1f32]"
        }`}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default CommentForm;





