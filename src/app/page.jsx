import { PostList } from "../components/PostList";
import { SortLinks } from "../components/SortLinks";


export default async function Home() {
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <SortLinks />
      <PostList sortBy="top" currentPage={1} />
    </div>
    );
}
