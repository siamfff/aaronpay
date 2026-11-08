import { doc, getDoc, setDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "./config";
import type { MerchantProfile } from "@/types/merchant";
import { generateMerchantId } from "@/lib/utils/id";

export async function createMerchant(
  uid: string,
  data: Omit<MerchantProfile, "id" | "uid" | "status" | "trialUsed" | "subscriptionStatus" | "createdAt" | "updatedAt">
): Promise<MerchantProfile> {
  const merchantId = generateMerchantId();
  const now = new Date();
  const trialEndsAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const newMerchant: MerchantProfile = {
    ...data,
    id: merchantId,
    uid,
    status: "Pending",
    logoUrl: "",
    trialUsed: true,
    subscriptionStatus: "trial",
    trialExpiresAt: Timestamp.fromDate(trialEndsAt),
    createdAt: serverTimestamp() as Timestamp,
    updatedAt: serverTimestamp() as Timestamp,
  };

  await setDoc(doc(db, "merchants", merchantId), newMerchant);
  return newMerchant;
}

export async function getMerchantById(merchantId: string): Promise<MerchantProfile | null> {
  const snap = await getDoc(doc(db, "merchants", merchantId));
  if (snap.exists()) {
    return snap.data() as MerchantProfile;
  }
  return null;
}