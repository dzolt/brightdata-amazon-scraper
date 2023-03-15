import { admin, adminDb } from "@/firebaseAdmin";
import { NextApiRequest, NextApiResponse } from "next";

type Body = {
  search: string;
};

type Data = {
  collection_id: string;
  start_eta: number;
};

type Error = {
  error: string;
};

const SCRAPER_URL =
  "https://api.brightdata.com/dca/trigger?collector=c_lf30bzew1xrg8b75r2&queue_next=1";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  try {
    const { search }: Body = req.body;

    console.log("search", search);

    const response = await fetch(SCRAPER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BRIGHT_DATA_API_KEY}`,
      },
      body: JSON.stringify({ search }),
    });

    const { collection_id, start_eta }: Data = await response.json();

    await adminDb.collection("searches").doc(collection_id).set({
      search,
      start_eta,
      status: "pending",
      updated_at: start_eta,
    });

    return res.status(200).json({ collection_id, start_eta });
  } catch (err: any) {
    console.log("err", err);
    return res.status(500).json({ error: err.message });
  }
}
