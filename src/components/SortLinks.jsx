import Link from "next/link";

export function SortLinks() {
    return (
    <div className="mb-6">
        <span className="mr-4 font-semibold">Sort by:</span>
        <Link href="/post/sort/top" className="mr-4 text-blue-600 hover:underline">
        Top
        </Link>
        <Link href="/post/sort/recent" className="mr-4 text-blue-600 hover:underline">
        Recent
        </Link>
        <Link href="/post/sort/controversial" className="text-blue-600 hover:underline">
        Controversial
        </Link>
    </div>
    );
}
