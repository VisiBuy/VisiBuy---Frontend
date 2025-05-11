import { Link } from "react-router-dom";
import { dashboardConfig } from "../../../lib/config";

// Accept user's first and last names as props
const ProfilePicture = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  const profilePath = dashboardConfig.getFullPath("buyer", "profile");

  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

  return (
    <Link to={profilePath}>
<<<<<<< HEAD
      <img
        src={imageSrc}
        alt={altText}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full border-none"
      />
=======
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-blue flex items-center justify-center bg-transparent text-blue font-bold text-2xl md:text-3xl">
        {initials}
      </div>
>>>>>>> staging
    </Link>
  );
};

export default ProfilePicture;
