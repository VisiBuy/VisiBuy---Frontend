import { Link } from "react-router-dom";
import { dashboardConfig } from "../../../lib/config"; 

const DashboardButton = () => {
  const dashboardPath = `${dashboardConfig.getFullPath("buyer", "dashboard")}`;

  return (
    <Link
      to={dashboardPath}
      className="bg-blue text-white text-lg font-semibold font-OpenSans py-2 px-7 md:py-3 md:px-8 rounded-md"
    >
      Dashboard
    </Link>
  );
};

export default DashboardButton;
