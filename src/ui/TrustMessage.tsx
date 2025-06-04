import { FaLock } from 'react-icons/fa';

const TrustMessage: React.FC = () => {
  return (
    <div
      className="mt-2 text-xs sm:text-sm text-blue-400 select-none flex items-center gap-1 sm:gap-2"
      aria-live="polite"
    >
      <FaLock className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
      <span>
        Your payment is safe — it’s held in escrow until you verify real photos and approve the item.
      </span>
    </div>
  );
};

export default TrustMessage;
