
import { Link } from "react-router-dom";

const PurchasingHistory  = () => {
  return (
    <div>
      {/* Header row with title and View all link */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold font-OpenSans tracking-wide ">Purchasing History</h2>
        <Link to="/dashboard/buyer/history" className="text-blue-500 text-sm">
          View all
        </Link>
      </div>

      {/* White box below */}
      <div className="bg-white shadow-lg px-6 py-12 rounded-md">
        <p className="text-sm text-gray-600">
          
        </p>
      </div>
    </div>
  );
};

export default PurchasingHistory;
