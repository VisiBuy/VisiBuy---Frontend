import { Link } from "react-router-dom";
import { dashboardConfig } from "../../../lib/config"; 

const DashboardButton = () => {
  const dashboardPath = `${dashboardConfig.getFullPath("buyer", "dashboard")}`;

  return (
    <Link
      to={dashboardPath}
      className="bg-blue text-white py-2 px-6 rounded-md"
    >
      Dashboard
    </Link>
  );
};

export default DashboardButton;
