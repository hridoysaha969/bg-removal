import logo from "./logo.svg";
import logo_icon from "./logo_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import header_img from "./header_img.png";
import remove_bg_icon from "./remove_bg_icon.svg";
import upload_btn_icon from "./upload_btn_icon.svg";
import upload_icon from "./upload_icon.svg";
import download_icon from "./download_icon.svg";
import image_w_bg from "./image_w_bg.png";
import image_wo_bg from "./image_wo_bg.png";
import facebook_icon from "./facebook_icon.svg";
import google_plus_icon from "./google_plus_icon.svg";
import twitter_icon from "./twitter_icon.svg";
import profile_img_1 from "./profile_img_1.png";
import profile_img_2 from "./profile_img_2.png";
import credit_icon from "./credit_icon.png";

export const assets = {
  logo,
  logo_icon,
  arrow_icon,
  header_img,
  remove_bg_icon,
  upload_icon,
  download_icon,
  image_w_bg,
  image_wo_bg,
  facebook_icon,
  google_plus_icon,
  twitter_icon,
  upload_btn_icon,
  credit_icon,
};

export const testimonialsData = [
  {
    id: 1,
    text: "I've been using bg.removal for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    author: "Richard Nelson",
    image: profile_img_1,
    jobTitle: "Web Developer",
  },
  {
    id: 2,
    text: "I've been using bg.removal for nearly 6 months, I had a fantastic experience. The quality is top-notch. I recommend others to try this app.",
    author: "Donald Jackman",
    image: profile_img_2,
    jobTitle: "UI Deginer",
  },
];

export const plans = [
  {
    id: "Basic",
    price: 1000,
    credits: 100,
    desc: "Best for personal use.",
    priceId: "price_1QCZbu03UnRh84OeJW4Yp2G3",
  },
  {
    id: "Advanced",
    price: 5000,
    credits: 500,
    desc: "Best for business use.",
    priceId: "price_1QCa7p03UnRh84OeZE14rEIx",
  },
  {
    id: "Business",
    price: 25000,
    credits: 5000,
    desc: "Best for enterprise use.",
    priceId: "price_1QCa7p03UnRh84OehPCQ4s1f",
  },
];
