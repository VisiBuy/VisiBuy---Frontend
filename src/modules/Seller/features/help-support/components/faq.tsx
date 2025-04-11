
import {motion} from 'framer-motion';
import { FaqItem } from "./faq-item";
import { FaqProps } from '@/modules/Seller/models/feedback';

export const faqs: FaqProps[] = [
  {
    question: "What payment methods are accepted on Visibuy?",
    answer:
      "Our programs can be taking in 3 forms depending on the proficiency level you want; Done For You, Done With You, and Do It Yourself",
  },
  {
    question: "What payment methods are accepted on Visibuy?",
    answer: "Our programs can be taking in 3 forms depending on the proficiency level you want; Done For You, Done With You, and Do It Yourself",
  },
  {
    question: "What payment methods are accepted on Visibuy?",
    answer: "Our programs can be taking in 3 forms depending on the proficiency level you want; Done For You, Done With You, and Do It Yourself",
  },
  {
    question: "What payment methods are accepted on Visibuy?",
    answer: "Our programs can be taking in 3 forms depending on the proficiency level you want; Done For You, Done With You, and Do It Yourself",
  },
  {
    question: "How do you say cheese to the camera?",
    answer: "Our programs can be taking in 3 forms depending on the proficiency level you want; Done For You, Done With You, and Do It Yourself",
  },
];

export const Faq = () => {
  return (
    <div className=" mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl mb-8 font-Montserrat font-semibold">
        How to pay for your orders
        </h2>
      <motion.dl
        className="space-y-8 "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {faqs.map((faq,index) => (
          <FaqItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </motion.dl>
    </div>
  );
};