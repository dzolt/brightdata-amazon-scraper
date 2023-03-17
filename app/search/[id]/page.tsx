"use client";

import Results from "@/components/Results";
import { deleteDoc, doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../../firebase";
import Spinner from "react-spinkit";
import { useRouter } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const SearchPage = ({ params: { id } }: Props) => {
  const [snapshot, loading, error] = useDocument(doc(db, "searches", id));
  const router = useRouter();

  const handleDelete = () => {
    deleteDoc(doc(db, "searches", id));
    router.push("/");
  };

  const deleteButton = (
    <button
      className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
      onClick={handleDelete}
    >
      Delete Search
    </button>
  );

  if (loading) {
    return (
      <h1 className="text-center p-10 animate-pulse text-xl text-indigo-600/50">
        Loading Results...
      </h1>
    );
  }

  if (!snapshot?.exists()) return;

  if (snapshot.data()?.status === "pending") {
    return (
      <div className="flex flex-col gap-y-5 py-10 items-center justify-between">
        <p className="text-indigo-600 animate-pulse text-center">
          Scraping results from Amazon...
        </p>

        <Spinner
          style={{
            height: "100px",
            width: "100px",
          }}
          name="cube-grid"
          fadeIn="none"
          color="indigo"
        />

        {deleteButton}
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center py-5">
        <div className="flex flex-col items-center md:flex-row gap-x-4 pr-2 md:pr-6">
          <h1 className="font-bold">
            Search results for{" "}
            <span className="text-indigo-600">"{snapshot.data()?.search}"</span>
          </h1>
          <p className="text-gray-300">
            {snapshot.data()?.results?.length > 0 &&
              `${snapshot.data()?.results?.length} results found`}
          </p>
        </div>

        {deleteButton}
      </div>
      {snapshot.data()?.results?.length > 0 && (
        <Results results={snapshot.data()?.results} />
      )}
    </>
  );
};

export default SearchPage;
