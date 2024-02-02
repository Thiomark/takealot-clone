import type { NextApiRequest, NextApiResponse } from "next";
import admin from "@/utils/firebaseAdmin";
import { ProductType } from "@/types/product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductType | { message: string }>
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { productId } = req.query;

  if (!productId) {
    res.status(400).json({ message: "Product ID is required" });
    return;
  }

  try {
    const db = admin.firestore();
    const productRef = db.collection("products").doc(productId as string);
    const doc = await productRef.get();

    if (!doc.exists) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const product = {
      id: doc.id,
      ...doc.data(),
      image: fetchImageUrl(doc.data()?.image),
    } as ProductType;

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const fetchImageUrl = (imageId: string) => {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const encodedPath = `products%2F${encodeURIComponent(imageId)}`;
  const url = `https://firebasestorage.googleapis.com/v0/b/${projectId}.appspot.com/o/${encodedPath}?alt=media`;
  return url;
};
