interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 max-w-3xl w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export const ModalHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="border-b pb-3 mb-4">{children}</div>
);

export const ModalContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`modal-content ${className}`}>{children}</div>
);
