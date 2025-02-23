"use client";
import { getAllPosts } from "@/queries/blog-data";
import { useState } from "react";
import LatestPost from "./latestPost";
import PostCard from "./postCard";

export default function PostList({ posts, page }) {
  const [items, setItems] = useState(posts);
  const [endCursor, setEndCursor] = useState(page.endCursor);
  const [hasNextPage, setHasNextPage] = useState(page.hasNextPage);
  const [loading, setLoading] = useState(false);

  console.log(items.length);
  // posts are sorted by time. Get the latest one.
  const latestPost = items[0].node;
  // rest of the post to handle separately.
  const restPosts = items.slice(1);

  const fetchItems = async (cursor) => {
    setLoading(true);
    try {
      // Pass an empty array since you're not filtering by tags.
      const data = await getAllPosts([], cursor);
      console.log(data);
      setItems((prev) => [...prev, ...data.edges]);
      setEndCursor(data.pageInfo.endCursor);
      setHasNextPage(data.pageInfo.hasNextPage);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="px-8 py-8 bg-gray-100">
        <LatestPost post={latestPost} />
      </div>

      {restPosts.length > 0 && (
        <div className="px-8 py-16">
          <div className="grid gap-4 mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {restPosts.map((post) => (
              <PostCard key={post?.node?.id} post={post?.node} />
            ))}
          </div>
          <button
            onClick={() => fetchItems(endCursor)}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/90 h-10 px-4 py-2 mt-8"
          >
            {loading ? "Loading..." : "Show More Posts"}
          </button>
        </div>
      )}
    </>
  );
}
