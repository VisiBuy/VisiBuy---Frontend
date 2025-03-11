import { FeedbackDto } from "../../models/feedback";
import SellerFeedbackApi from "./api";
 async function createSellerFeeback(payload: FeedbackDto) {
  const feedbackResponse = await SellerFeedbackApi.createFeeback(payload);
  return feedbackResponse;
}
export default {createSellerFeeback}