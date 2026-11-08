import type { Timestamp } from "firebase/firestore";

export type UserRole = "merchant" | "admin";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: UserRole;
  emailVerified: boolean;
  merchantId?: string;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}