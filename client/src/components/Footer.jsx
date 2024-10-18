import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 lg:px-44 py-3">
      <img width={150} src={assets.logo} alt="" />
      <p className="flex-1 border-none sm:border-l sm:border-gray-400 pl-4 text-sm text-gray-500">
        &copy;{" "}
        <Link to="https://hridoysaha.vercel.app" className="text-blue-500">
          hridoysaha.app
        </Link>
        . | All right reserved.
      </p>

      <div className="flex gap-1">
        <img width={40} src={assets.facebook_icon} alt="" />
        <img width={40} src={assets.twitter_icon} alt="" />
        <img width={40} src={assets.google_plus_icon} alt="" />
      </div>
    </div>
  );
};

export default Footer;
