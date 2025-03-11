import { FeedbackDto } from "../../models/feedback";
import SellerFeedbackService from "../../lib/feedback/services";
import { useMutation } from "@tanstack/react-query";
export function useCreateSellerFeedback() {
  return useMutation({
    mutationFn: (payload: FeedbackDto) =>
      SellerFeedbackService.createSellerFeeback(payload),
  });
}
