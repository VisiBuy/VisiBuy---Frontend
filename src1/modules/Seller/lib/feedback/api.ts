import { axiosWithAuth } from "../../../../lib/client";
import ISellerFeebackRepository from "../../respository/seller-feedback-repository";
import { FeedbackDto, TSellerFedbackResponse } from "../../models/feedback";

class SellerFeedbackApiAdpater implements ISellerFeebackRepository {
  async createFeeback(payload: FeedbackDto): Promise<TSellerFedbackResponse> {
    const response = await axiosWithAuth.post("/seller/feedback", payload);
    return response.data;
  }
}

export default new SellerFeedbackApiAdpater();
