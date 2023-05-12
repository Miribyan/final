import Link from "next/link";

export default function TagCloudComponent({ tags }) {
    return (
        <div class="m-6 p-4 rounded-md">
            <div class="flex flex-wrap gap-3 justify-center">
                <div class="flex items-center w-full">
                    <span class="flex-grow bg-gray-200 rounded h-0.5"></span>
                    <span class="mx-3 text-lg font-medium">TAG CLOUD</span>
                    <span class="flex-grow bg-gray-200 rounded h-0.5"></span>
                </div>
                {tags.map((tag) => (
                    <div key={tag.id}>
                        <Link
                            href={`/search?tag=${tag.title}`}
                            className="bg-gray-300 text-white rounded-md px-3 py-2 "
                        >
                            {tag.title}
                        </Link>
                        
                    </div>
                ))}
            </div>
        </div>
    );
}
