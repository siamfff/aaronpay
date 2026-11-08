import type { Timestamp } from "firebase/firestore";

export type UserRole = "merchant" | "admin";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: UserRole;
  emailVerified: boolean;
  
  // মার্চেন্ট প্রপার্টি
  merchantId?: string;
  ownerName?: string;
  businessName?: string;
  websiteUrl?: string;
  logoUrl?: string;
  apiKey?: string;
  webhookUrl?: string;
  subscriptionStatus?: string;
  
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}