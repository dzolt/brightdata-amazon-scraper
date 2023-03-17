import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <DocumentMagnifyingGlassIcon className="h-64 w-64 text-indigo-600/40" />

      <h1 className="text-3xl mt-2 text-black text-center font-bold mb-5">
        Welcome to the Amazon Web Scraper
      </h1>

      <h2 className="txt-lg italic text-center text-black/50">
        Developed by Damian Zoltowski
      </h2>
    </div>
  );
}
