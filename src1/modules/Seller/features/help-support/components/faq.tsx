<<<<<<<< HEAD:src1/modules/Seller/features/help-support/components/faq.tsx
"use client";
import { motion } from "framer-motion";
import { FaqItem } from "./faq-item";
import { FaqProps } from "../../../models/feedback";
========
import { motion } from "framer-motion";
import { FaqItem } from "./faq-item";
import { FaqProps } from "@/modules/Seller/models/feedback";
>>>>>>>> staging:src/modules/Seller/features/help-support/components/faq.tsx

export const faqs: FaqProps[] = [
  {
    question: "When do I get paid?",
    answer:
      " You’ll receive payment within 7 working days after the buyer receives and confirms the product. All transactions are processed weekly.",
  },
  {
<<<<<<<< HEAD:src1/modules/Seller/features/help-support/components/faq.tsx
    question: "What payment methods are accepted on Visibuy?",
    answer:
      "Our programs can be taking in 3 forms depending on the proficiency level you want; Done For You, Done With You, and Do It Yourself",
  },
  {
    question: "What payment methods are accepted on Visibuy?",
    answer:
      "Our programs can be taking in 3 forms depending on the proficiency level you want; Done For You, Done With You, and Do It Yourself",
  },
  {
    question: "What payment methods are accepted on Visibuy?",
    answer:
      "Our programs can be taking in 3 forms depending on the proficiency level you want; Done For You, Done With You, and Do It Yourself",
  },
  {
    question: "How do you say cheese to the camera?",
    answer:
      "Our programs can be taking in 3 forms depending on the proficiency level you want; Done For You, Done With You, and Do It Yourself",
========
    question: "Are there any fees?",
    answer:
      "Yes, Visibuy charges a 5% commission, and the payment gateway applies a small processing fee. These are deducted before payout.",
  },
  {
    question: "How do I change my payout account?",
    answer:
      `Go to your Seller Dashboard > Settings > Payout Details. You can update your bank name, account number, and account holder name.
      <br/>🔄 This feature is coming in Visibuy 2.0 — account updates will be available soon.

      `,
>>>>>>>> staging:src/modules/Seller/features/help-support/components/faq.tsx
  },
];

export const Faq = () => {
  return (
<<<<<<<< HEAD:src1/modules/Seller/features/help-support/components/faq.tsx
    <div className=' mx-auto py-4 px-4 sm:px-6 lg:px-8'>
      <h2 className='text-3xl mb-8 font-Montserrat font-semibold'>
        How to pay for your orders
========
    <div className=" mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl mb-8 font-Montserrat font-semibold">
        Payment
>>>>>>>> staging:src/modules/Seller/features/help-support/components/faq.tsx
      </h2>
      <motion.dl
        className='space-y-8 '
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
