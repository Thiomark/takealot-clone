import type { NextApiRequest, NextApiResponse } from "next";
import admin from "@/utils/firebaseAdmin";
import { ProductType } from "@/types/product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<ProductType> | { message: string }>
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  try {
    const db = admin.firestore();
    const productsRef = db.collection("products");
    const snapshot = await productsRef.get();

    if (snapshot.empty) {
      res.status(404).json({ message: "No matching documents." });
      return;
    }

    let products = snapshot.docs
      .map(
        (doc: any) =>
          ({
            id: doc.id,
            ...doc.data(),
            image: fetchImageUrl(doc.data().image),
            images: doc.data().images.map((img: string) => fetchImageUrl(img)),
          } as ProductType)
      )
      .filter((product: ProductType) => product.disabled !== true);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const fetchImageUrl = (imageId: string) => {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const encodedPath = `products%2F${encodeURIComponent(imageId)}`;
  const url = `https://firebasestorage.googleapis.com/v0/b/${projectId}.appspot.com/o/${encodedPath}?alt=media`;
  return url;
};
