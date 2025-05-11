import { useEffect, useState } from "react";
import { fetchVerificationImages } from "@/modules/Buyer/lib/track-order/api";
import { VerificationResponse } from "@/types/VerificationImage";

export const useVerificationData = (orderId: string) => {
  const [verificationData, setVerificationData] =
    useState<VerificationResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (orderId) {
      setLoading(true);
      fetchVerificationImages(orderId)
        .then((data) => {
          setVerificationData(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to fetch verification images");
          setLoading(false);
        });
    }
  }, [orderId]);

  return { verificationData, loading, error };
};

export default useVerificationData;
