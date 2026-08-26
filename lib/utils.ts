import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | string): string {
  if (typeof amount === "string" && amount.includes("₹")) {
    return amount;
  }
  const numeric = typeof amount === "string" ? parseFloat(amount.replace(/[^0-9.]/g, "")) : amount;
  if (isNaN(numeric)) return "₹1,500";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(numeric);
}

export function generateARN(): string {
  const year = new Date().getFullYear().toString().slice(-2);
  const randomDigits = Math.floor(1000000 + Math.random() * 9000000);
  return `PSK-ARN-${year}-${randomDigits}`;
}

export function generateTransactionId(): string {
  const timestamp = Date.now().toString().slice(-6);
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `PSP-TXN-${timestamp}-${randomSuffix}`;
}

export function generateBatchNumber(): string {
  const letters = ["A", "B", "C", "D"];
  const char = letters[Math.floor(Math.random() * letters.length)];
  const num = Math.floor(10 + Math.random() * 90);
  return `BATCH-${char}${num}`;
}
