import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { FaqProps } from "@/modules/Seller/models/feedback";
import Icon from "@/ui/Icon";

export const FaqItem = ({ question, answer }: FaqProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b  py-8 px-6 bg-blue-200 rounded-md">
      <button
        className="flex justify-between items-start  w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-foreground text-2xl text-left font-Montserrat font-medium ">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? -90 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-6 flex-shrink-0"
        >
         <Icon name="chevron-right" className="text-blue" />
        </motion.span>
      </button>
      <AnimatePresence> 
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 pr-12 overflow-hidden"
          >
            <p className="text-gray-500 text-xl font-Montserrat">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};