interface VerificationActionsProps {
  handleApprove: () => void;
  handleReject: () => void;
}

const VerificationActions: React.FC<VerificationActionsProps> = ({
  handleApprove,
  handleReject,
}) => (
  <div className="flex justify-end gap-6">
    <button
      onClick={handleReject}
      className="border border-black text-black font-OpenSans text-lg md:text-xl px-12 py-3 rounded"
    >
      No
    </button>
    <button
      onClick={handleApprove}
      className="bg-primary text-white font-OpenSans text-lg md:text-xl px-12 py-3 rounded"
    >
      Yes
    </button>
  </div>
);

export default VerificationActions;
