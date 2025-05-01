import { motion } from "framer-motion";
import { FaqItem } from "../faq-item";
import { FaqProps } from "@/modules/Seller/models/feedback";

export const faqs: FaqProps[] = [
  {
    question: "Who handles delivery?",
    answer:
      " Visibuy coordinates delivery through trusted logistics partners. Once the buyer approves verification, the assigned rider is dispatched.",
  },
  {
    question: "What is Visual Verification?",
    answer:
      "Before delivery, sellers are required to upload a real-time photo or video of the actual product. This is sent to the buyer via our Visual Verification Engine (VVE) for approval.",
  },
  {
    question: "What happens after a buyer approves or rejects?",
    answer:
      " Once approved, the product is released for delivery.If the buyer rejects the item, the order is stopped.",
  },
];

export const DeliverFaq = () => {
  return (
    <div className=" mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl mb-8 font-Montserrat font-semibold">
        Delivery
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
