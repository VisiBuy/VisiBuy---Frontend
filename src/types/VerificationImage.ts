export interface VerificationImage {
  imageUrl: string;
  sneakerName: string;
  size: string;
  color: string;
  verifiedDate: string;
}

export interface VerificationResponse {
  productName: string;
  images: VerificationImage[];
  verificationId: string;
  normalizedOrderDetails?: {
    sizes?: { label: string }[];
    colors?: { label: string }[];
  }[];
}
