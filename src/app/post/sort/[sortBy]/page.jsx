import { PostList } from "@/components/PostList";
import { SortLinks } from "@/components/SortLinks"; 

export default async function SortPostsPage({ params, searchParams }) {
  const sortBy = params.sortBy || "top"; // I did default to 'top' sorting
  const currentPage = parseInt(searchParams.page || "1", 10); 

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <SortLinks />

      <h2 className="text-xl mb-4">
        Showing sorted by: {sortBy[0].toUpperCase() + sortBy.slice(1)}
      </h2>

      <PostList currentPage={currentPage} sortBy={sortBy} />
    </div>
  );
}
