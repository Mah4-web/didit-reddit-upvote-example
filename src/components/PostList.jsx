import Link from "next/link";
import { Pagination } from "./Pagination";
import { Vote } from "./Vote";
import { db } from "@/db";
import { POSTS_PER_PAGE } from "@/config";


export async function PostList({ currentPage = 1, sortBy = "top" }) {
  const offset = POSTS_PER_PAGE * (currentPage - 1);

    const SORT_OPTIONS = {
    recent: "posts.created_at DESC",
    controversial: "ABS(COALESCE(SUM(votes.vote), 0)) DESC",
    top: "COALESCE(SUM(votes.vote), 0) DESC",
  };

  // I decided to pick safe order by from SORT_OPTIONS
  const orderBy = SORT_OPTIONS[sortBy] || SORT_OPTIONS.top;

  const { rows: posts } =
    await db.query(`SELECT posts.id, posts.title, posts.body, posts.created_at, users.name, 
    COALESCE(SUM(votes.vote), 0) AS vote_total
     FROM posts
     JOIN users ON posts.user_id = users.id
     LEFT JOIN votes ON votes.post_id = posts.id
     GROUP BY posts.id, users.name
     ORDER BY ${orderBy}
     LIMIT $1
     OFFSET $2`,
    [POSTS_PER_PAGE, offset]
  );

  return (
    <>
      <ul className="max-w-screen-lg mx-auto p-4 mb-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className=" py-4 flex space-x-6 hover:bg-zinc-200 rounded-lg"
          >
            <Vote postId={post.id} votes={post.vote_total} />
            <div>
              <Link
                href={`/post/${post.id}`}
                className="text-3xl hover:text-pink-500"
              >
                {post.title}
              </Link>
              <p className="text-zinc-700">posted by {post.name}</p>
            </div>
          </li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} />
    </>
  );
}
