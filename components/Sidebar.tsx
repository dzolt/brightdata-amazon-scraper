"use client";

import { db } from "@/firebase";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import SidebarRow from "./SidebarRow";

type Props = {};

const Sidebar = (props: Props) => {
  const [snapshot, loading, error] = useCollection(
    query(collection(db, "searches"), orderBy("start_eta", "desc"))
  );

  return (
    <div className="px-2 py-6 overflow-y-auto border-b border-indigo-500/50">
      <div className="flex flex-col pb-2 md:p-10 items-center justify-center">
        <DocumentMagnifyingGlassIcon className="h-16 md:w-16 text-indigo-600" />
        <h1 className="hidden md:inline text-center text-3xl font-bold mt-2 mb-2">
          Web Scraper
        </h1>
        <h2 className="hidden md:inline text-center text-xs italic">
          Scraping the Unscrapable
        </h2>
      </div>
      <ul className="flex flex-col gap-2 py-2 pl-2 overflow-x-auto">
        {snapshot?.docs.map((doc) => (
          <SidebarRow key={doc.id} doc={doc} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
