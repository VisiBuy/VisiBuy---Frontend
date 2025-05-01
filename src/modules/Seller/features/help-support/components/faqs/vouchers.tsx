import { motion } from "framer-motion";
import { FaqItem } from "../faq-item";
import { FaqProps } from "@/modules/Seller/models/feedback";

export const faqs: FaqProps[] = [
  {
    question: "How do buyer vouchers work?",
    answer:
      " Buyers may apply promo vouchers during checkout. This discount comes from Visibuy's marketing budget, not your revenue. You’ll still be paid your full price.",
  },
  {
    question: "Do vouchers affect my payout?",
    answer:
      "No. Your payout remains the same. Buyers see a discount, but sellers are paid in full unless stated otherwise in a specific campaign.",
  },
];

export const VouchersFaq = () => {
  return (
    <div className=" mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl mb-8 font-Montserrat font-semibold">
        How our vouchers works
      </h2>
      <motion.dl
        className="space-y-8 "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {faqs.map((faq, index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </motion.dl>
    </div>
  );
};
