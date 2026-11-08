import type { Timestamp } from "firebase/firestore";

export type MerchantStatus = "Pending" | "Active" | "Suspended" | "Expired" | "Rejected";

export interface MerchantPaymentMethod {
  enabled: boolean;
  number: string;
  accountType?: string;
}

export interface MerchantProfile {
  id: string;
  uid: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  websiteUrl: string;
  category: string;
  country: string;
  status: MerchantStatus;
  logoUrl?: string;
  paymentMethods: {
    bkash: MerchantPaymentMethod;
    nagad: MerchantPaymentMethod;
    rocket: MerchantPaymentMethod;
  };
  trialUsed: boolean;
  subscriptionStatus: "trial" | "active" | "expired" | "none";
  trialExpiresAt?: Timestamp | Date;
  subscriptionExpiresAt?: Timestamp | Date;
  plan?: "monthly" | "quarterly" | "yearly";
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}