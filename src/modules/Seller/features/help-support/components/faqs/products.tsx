import { motion } from "framer-motion";
import { FaqItem } from "../faq-item";
import { FaqProps } from "@/modules/Seller/models/feedback";

export const faqs: FaqProps[] = [
  {
    question: "What can I sell on Visibuy?",
    answer:
      "  Visibuy is currently focused on sneakers. Additional categories (apparel, accessories, etc.) will roll out in phases.",
  },
  {
    question: "Are there restricted products?",
    answer:
      "Yes. Counterfeit goods, used items without proper labeling, and prohibited items (e.g. weapons, expired goods) are not allowed. Check our Seller Policy for the full list.",
  },
  {
    question: "How do I list a new product?",
    answer:
      " Login to your Seller Dashboard > Add New Product. Upload images, add product name, description, price, and available sizes/colors.",
  },
  {
    question: " Any tips for better listings?",
    answer: `<ul>
     <li>Use natural lighting</li>
     <li>Follow our 5-angle photo guide</li>
     <li>List accurate sizes and pricing</li>
     <li>Be honest in product descriptions
</li>
    </ul>`,
  },
];

export const ProductFaq = () => {
  return (
    <div className=" mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl mb-8 font-Montserrat font-semibold">
        Products
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
