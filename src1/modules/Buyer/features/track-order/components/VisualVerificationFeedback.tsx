import React, { useState } from "react";
import { submitFeedback } from "../../../lib/track-order/api";

interface VisualVerificationFeedbackProps {
  orderId: string;
  token: string;
  onFeedbackSubmitted: (feedback: any) => void;
}

const VisualVerificationFeedback: React.FC<VisualVerificationFeedbackProps> = ({
  orderId,
  token,
  onFeedbackSubmitted,
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async () => {
    if (rating === null) return;
    try {
      setLoading(true);
      const result = await submitFeedback(orderId, rating, comments, token);
      onFeedbackSubmitted(result);
    } catch (err: any) {
      setError(err.message || "Feedback submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-6 text-center'>
      <h3 className='text-xl md:text-3xl font-bold text-black'>
        Rate your experience with the visual verification system (1-10)
      </h3>
      <div className='grid grid-cols-5 md:grid-cols-10 gap-4 justify-center'>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setRating(num)}
            className={`w-14 h-14 sm:w-16 sm:h-16 text-3xl font-bold rounded-full border border-green-600 flex items-center justify-center transition 
              ${rating === num ? "bg-green-600 text-white" : "text-black hover:bg-green-600 hover:text-white"}`}
          >
            {num}
          </button>
        ))}
      </div>
      <textarea
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        placeholder='Add any comments here (optional)...'
        className='border border-gray-300 rounded-md p-2 w-full max-w-lg mx-auto'
        rows={4}
      />
      {error && <p className='text-red-500'>{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={rating === null || loading}
        className='bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition'
      >
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
    </div>
  );
};

export default VisualVerificationFeedback;
