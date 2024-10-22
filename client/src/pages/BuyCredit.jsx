import { useState } from "react";
import { assets, plans } from "../assets/assets";
import { toast } from "react-toastify";
import { useUser } from "@clerk/clerk-react";

const BuyCredit = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handlePurChase = async (priceId, creditBalance) => {
    setLoading(true);

    if (user) {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/create-checkout-session",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              priceId,
              creditBalance,
              email: user.id,
            }),
          }
        );

        const data = await response.json();
        window.location.href = data.url;
      } catch (error) {
        console.error("Error creating checkout session:", error);
        toast.error("Faild to purchase! Try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-[80vh] text-center pt-14 mb-10">
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our plans
      </button>
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent mb-6 sm:mb-10">
        Choose the plan <br className="sm:hidden" /> {"that's"} right for you.
      </h1>

      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item, ind) => (
          <div
            key={ind}
            className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-700 hover:scale-105 transition-all duration-500"
          >
            <img src={assets.logo_icon} width={40} alt="" />
            <p className="mt-3 font-semibold">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${item.price / 100}</span>/{" "}
              {item.credits} credits
            </p>

            <button
              disabled={loading}
              onClick={() => handlePurChase(item.priceId, item.credits)}
              className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 disabled:bg-gray-500"
            >
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
