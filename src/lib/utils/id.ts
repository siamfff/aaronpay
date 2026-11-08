export function generateMerchantId(): string {
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `merchant_${randomStr}`;
}