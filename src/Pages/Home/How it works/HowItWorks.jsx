import React from "react";
import { FaBabyCarriage } from "react-icons/fa";
const HowItWorks = () => {
  const works = [
    {
      id: 1,
      title: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      id: 2,
      title: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      id: 3,
      title: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      id: 4,
      title: "Booking SME & Corporate",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-2xl text-secondary font-semibold">How It Works</h2>
      <div className="booking-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {works.map((work) => (
          <div
            key={work.id}
            className="card bg-base-100 shadow-md hover:shadow-lg transition rounded-xl"
          >
            <div className="card-body items-center text-center">
              {/* Icon Area */}
              <div className="card-icon text-primary text-4xl mb-3">
                <FaBabyCarriage />
              </div>

              {/* Title/Heading */}
              <h3 className="card-title text-lg font-semibold">{work.title}</h3>

              {/* Description/Body Text */}
              <p className="card-description text-sm opacity-80">
                {work.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
