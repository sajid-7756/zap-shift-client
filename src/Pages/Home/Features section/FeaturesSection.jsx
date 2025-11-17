import React from "react";
import FeatureItem from "./FeatureItem";
import liveTrackingImg from "../../../assets/live-tracking.png";
import safeDeleveryImg from "../../../assets/safe-delivery.png";

const featureData = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
    image: liveTrackingImg,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: safeDeleveryImg,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: safeDeleveryImg,
  },
];

const FeaturesSection = () => {
  return (
    <section className={` py-12 md:py-20 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-6xl mx-auto">
        {featureData.map((feature, index) => (
          <FeatureItem
            key={index}
            title={feature.title}
            description={feature.description}
            image={feature.image}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
