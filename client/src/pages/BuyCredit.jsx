import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { assets, plans } from "../assets/assets";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BuyCredit = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Triggered when a user selects a plan
  const handlePurchase = (price) => {
    setSelectedPrice(price); // Set the selected plan's price
    setErrorMessage(""); // Clear any previous errors
    setPaymentSuccess(""); // Clear any success messages
  };

  // const handleSubmit = async (amount) => {
  //   if (!stripe || !elements) {
  //     return;
  //   }

  //   const cardElement = elements.getElement(CardElement);

  //   // Step 1: Validate Card Element
  //   const { error: methodError, paymentMethod } =
  //     await stripe.createPaymentMethod({
  //       type: "card",
  //       card: cardElement,
  //     });

  //   if (methodError) {
  //     // Display the error if card details are incomplete or invalid
  //     setErrorMessage(methodError.message);
  //     toast.error(errorMessage);
  //     return;
  //   }

  //   const response = await fetch(
  //     import.meta.env.VITE_BACKEND_URL + "/create-payment-intent",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ amount }),
  //     }
  //   );

  //   const { clientSecret } = await response.json();

  //   if (!clientSecret) {
  //     setErrorMessage("Failed to retrieve client secret.");
  //     toast.error(errorMessage);
  //     return;
  //   }
  //   setIsLoading(true);

  //   const { error, paymentIntent } = await stripe.confirmCardPayment(
  //     clientSecret,
  //     {
  //       payment_method: paymentMethod.id,
  //     }
  //   );

  //   if (error) {
  //     setErrorMessage(error.message);
  //     toast.error(errorMessage);
  //   } else if (paymentIntent.status === "succeeded") {
  //     setPaymentSuccess("Payment successful!");
  //     toast.success(paymentSuccess);
  //   }
  //   setIsLoading(false);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !selectedPrice) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Step 1: Validate card details
    const { error: methodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

    if (methodError) {
      setErrorMessage(methodError.message);
      toast.error(errorMessage);
      return;
    }

    // Step 2: Fetch client_secret from backend
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: selectedPrice }), // Use the selected price
      }
    );

    const { clientSecret } = await response.json();

    if (!clientSecret) {
      setErrorMessage("Failed to retrieve client secret.");
      toast.error(errorMessage);
      return;
    }

    setIsLoading(true);

    // Step 3: Confirm the card payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: paymentMethod.id,
      }
    );

    if (error) {
      setErrorMessage(error.message);
      toast.error(errorMessage);
    } else if (paymentIntent.status === "succeeded") {
      setPaymentSuccess("Payment successful!");
      toast.success("Congrats!" + paymentSuccess);
      setSelectedPrice(null);
      navigate("/");
    }

    setIsLoading(false);
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

            {/* Purchase button triggers handleSubmit */}
            <button
              disabled={
                !stripe ||
                isLoading ||
                (selectedPrice != item.price && selectedPrice != null)
              }
              onClick={() => handlePurchase(item.price)} // Trigger the selected price
              className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 disabled:bg-gray-500"
            >
              {isLoading ? "Loading..." : "Purchase"}
            </button>
          </div>
        ))}
      </div>
      {/* Single CardElement for payment */}
      {selectedPrice && (
        <form onSubmit={handleSubmit} className="mt-8 mx-auto max-w-4xl">
          <CardElement /> {/* Only one CardElement */}
          <button
            disabled={!stripe || !selectedPrice || isLoading}
            type="submit"
            className="w-full bg-blue-600 text-white mt-8 text-sm rounded-md py-2.5 min-w-52"
          >
            {isLoading
              ? "Processing..."
              : `Pay ${selectedPrice ? `$${selectedPrice / 100}` : ""}`}
          </button>
        </form>
      )}
    </div>
  );
};

export default BuyCredit;
