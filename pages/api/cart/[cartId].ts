// pages/api/cart/[cartId].ts
import type { NextApiRequest, NextApiResponse } from 'next';

import { updateCart, addToCart } from '../../../services/updateCart';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cartId } = req.query;

  if (!cartId) {
    return res.status(400).json({ error: 'Cart ID is required' });
  }

  try {
    switch (req.method) {
        // TODO
    //   case 'GET':
    //     const cart = await getCart(req, cartId as string);
    //     res.status(200).json(cart);
    //     break;

      case 'PUT':
        const updatedCart = await updateCart(req, cartId as string);
        res.status(200).json(updatedCart);
        break;

      case 'POST':
        const { product_id, quantity, selectedOptions } = req.body;
        const newCart = await addToCart(cartId as string, product_id, quantity, selectedOptions);
        res.status(200).json(newCart);
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    const statusCode = error?.statusCode || 500;
    const message = error?.statusMessage || 'Something went wrong';
    res.status(statusCode).json({ error: message });
  }
}
