import { FeedbackDto, TSellerFedbackResponse } from "../models/feedback";

interface ISellerFeedbackRepository {
  createFeeback: (payload:FeedbackDto) => Promise<TSellerFedbackResponse>;
}

export default ISellerFeedbackRepository;
