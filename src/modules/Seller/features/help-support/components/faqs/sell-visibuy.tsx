import { motion } from "framer-motion";
import { FaqItem } from "../faq-item";
import { FaqProps } from "@/modules/Seller/models/feedback";

export const faqs: FaqProps[] = [
  {
    question: " How do I become a seller?",
    answer: `<p> Go to visibuy.com.ng and click on “Become a Seller.” Fill out your registration form with store name, contact info, and product category.
      </p>
      <p>⚠️ No ID or document verification is currently required.</p>`,
  },
  {
    question: "What support do I get after signing up?",
    answer:
      "Every new seller is assigned a Launch Guide — someone from our team who will walk you through your first product upload, order fulfillment, and how to use the dashboard.",
  },
  {
    question: "How long does approval take?",
    answer:
      " Typically within 48 hours if all info is filled correctly. You’ll be notified by email once approved.",
  },
];

export const SellVisibuyFaq = () => {
  return (
    <div className=" mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl mb-8 font-Montserrat font-semibold">
        How to sell on Visibuy
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
