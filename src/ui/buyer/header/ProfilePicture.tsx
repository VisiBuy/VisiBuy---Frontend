import { Link } from "react-router-dom";
import { dashboardConfig } from "../../../lib/config"; 

const ProfilePicture = ({
  imageSrc,
  altText,
}: {
  imageSrc: string;
  altText: string;
}) => {
  const profilePath = dashboardConfig.getFullPath("buyer", "profile");

  return (
    <Link to={profilePath}>
      <img
        src={imageSrc}
        alt={altText}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full border-none"
      />
    </Link>
  );
};

export default ProfilePicture;
