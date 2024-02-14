import type { NextApiRequest } from "next";

export interface ExtendedIncomingMessage extends NextApiRequest {
  user?: User | null;
  isAdmin?: boolean;
}
