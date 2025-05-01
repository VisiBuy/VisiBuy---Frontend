import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { FaqProps } from "../../../models/feedback";
import Icon from "../../../../../ui/Icon";

export const FaqItem = ({ question, answer }: FaqProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='border-b  py-8 px-6 bg-blue-200 rounded-md'>
      <button
        className='flex justify-between items-start  w-full text-left'
        onClick={() => setIsOpen(!isOpen)}
      >
<<<<<<<< HEAD:src1/modules/Seller/features/help-support/components/faq-item.tsx
        <span className='text-foreground text-2xl text-left font-Montserrat font-medium '>
========
        <span className="text-foreground text-2xl text-left font-Montserrat font-medium ">
>>>>>>>> staging:src/modules/Seller/features/help-support/components/faq-item.tsx
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? -90 : 0 }}
          transition={{ duration: 0.3 }}
          className='ml-6 flex-shrink-0'
        >
<<<<<<<< HEAD:src1/modules/Seller/features/help-support/components/faq-item.tsx
          <Icon name='chevron-right' className='text-blue' />
========
          <Icon name="chevron-right" className="text-blue" />
>>>>>>>> staging:src/modules/Seller/features/help-support/components/faq-item.tsx
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='mt-2 pr-12 overflow-hidden'
          >
<<<<<<<< HEAD:src1/modules/Seller/features/help-support/components/faq-item.tsx
            <p className='text-gray-500 text-xl font-Montserrat'>{answer}</p>
========
            <p
              dangerouslySetInnerHTML={{ __html: answer }}
              className="text-gray-500 text-xl font-Montserrat"
            ></p>
>>>>>>>> staging:src/modules/Seller/features/help-support/components/faq-item.tsx
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
