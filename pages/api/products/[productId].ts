import type { NextApiRequest, NextApiResponse } from "next";
import admin from "@/utils/firebaseAdmin";
import { ProductType } from "@/types/product";
import { getRandomArbitrary } from "@/utils/helperFunctions";

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
      oldPrice: getRandomArbitrary(60, 3000),
      sale: getRandomArbitrary(7, 35),
      rating: (Math.random() * (5 - 3) + 3).toFixed(1),
      reviews: getRandomArbitrary(10, 200),
      inStock: ["jhb", "cpt"],
      summary:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet",
      productInfo: {
        categories: "Gaming / Gaming Accessories / Controllers",
        warranty: "Limited (12 months)",
        Platform: "PS4",
        Barcode: getRandomArbitrary(111719874669, 911719874669),
      },
    } as any;

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
