import React, { useState } from "react";

const AboutUs = () => {
  const [selectedText, setSelectedText] = useState("story");

  const handleSelectedText = (value) => {
    setSelectedText(value);
  };

  const selectedPara = [
    {
      id: 1,
      name: "story",
      para1:
        "We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.",
      para2:
        "From day one, we believed that great delivery service is built on trust. That’s why we’ve focused on transparency, communication, and consistency in every step of the journey. With optimized routes, trained delivery teams, and smart technology, we’ve made sending and receiving parcels easier than ever. Your packages aren’t just items — they’re moments, memories, and commitments, and we treat them with the care they deserve.",
      para3:
        "As our network continues to grow across Bangladesh, we remain dedicated to improving speed and reliability without compromise. Every parcel we handle reflects our promise to deliver excellence, whether you’re a small business owner shipping daily or a customer sending something special to a loved one. With continuous innovation and a passion for service, we’re redefining what modern parcel delivery should feel like — simple, fast, and worry-free.",
    },

    {
      id: 2,
      name: "missions",
      para1:
        "Our mission has always been simple: empower people and businesses with a delivery service they can depend on. We aim to take the stress out of sending parcels by combining smart logistics with real-time digital tools. Every decision we make pushes us closer to a system where speed, transparency, and reliability work hand in hand.",
      para2:
        "We believe a delivery company should do more than just move packages — it should move possibilities. That’s why we work continuously to expand our coverage, strengthen our network, and introduce better technology. Our mission is to ensure that no matter where you are, you can send or receive your parcel with complete confidence.",
      para3:
        "At the heart of our mission is a commitment to people. We invest in trained staff, modern vehicles, and seamless communication so customers feel cared for at every step. Our goal is not only to deliver parcels but to deliver trust, convenience, and peace of mind — today and for the future.",
    },

    {
      id: 3,
      name: "success",
      para1:
        "Every successful delivery tells a story — of efficiency, teamwork, and the trust our customers place in us. Over time, we’ve turned challenges into achievements, proving our ability to deliver under pressure. Each parcel that reaches its destination safely marks another successful trip that strengthens our commitment to excellence.",
      para2:
        "From crowded city streets to remote villages, our delivery teams have completed thousands of successful trips across Bangladesh. These journeys highlight our dedication to reliability and service, ensuring every customer receives their parcels without hassle or delay.",
      para3:
        "Our success comes from more than technology; it comes from the people behind each delivery. Their commitment, communication, and focus on quality ensure that every trip — big or small — ends with a satisfied customer. With each success, we continue raising our standards for the next journey.",
    },

    {
      id: 4,
      name: "others",
      para1:
        "Beyond delivery, we provide a range of additional services to make your parcel experience smoother. From secure packaging support to scheduled pickups, our extra services help you manage your shipments with ease and flexibility.",
      para2:
        "We also invest heavily in tools that enhance your experience, such as real-time support, instant notifications, and advanced shipment monitoring. These features ensure you stay informed and confident throughout the entire delivery process.",
      para3:
        "As customer needs evolve, so do our services. We continuously listen, update, and expand our offerings — whether for businesses, individuals, or special handling requirements. Our aim is to deliver not just parcels, but complete convenience in every interaction.",
    },
  ];

  const selectedData = selectedPara.find((e) => e.name === selectedText);

  return (
    <div className="my-10 space-y-7">
      <div className="space-y-5">
        <h3 className="text-5xl text-secondary font-bold">About Us</h3>
        <p className="text-gray-500">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal <br /> packages to business shipments — we
          deliver on time, every time.
        </p>
      </div>
      <hr className="text-gray-300" />
      <div className="space-y-6">
        <div className="flex gap-5">
          <button
            className={`cursor-pointer ${
              selectedText === "story" ? "text-secondary font-semibold" : ""
            }`}
            onClick={() => handleSelectedText("story")}
          >
            Story
          </button>
          <button
            className={`cursor-pointer ${
              selectedText === "missions" ? "text-secondary font-semibold" : ""
            }`}
            onClick={() => handleSelectedText("missions")}
          >
            Missions
          </button>
          <button
            className={`cursor-pointer ${
              selectedText === "success" ? "text-secondary font-semibold" : ""
            }`}
            onClick={() => handleSelectedText("success")}
          >
            Success Trip
          </button>
          <button
            className={`cursor-pointer ${
              selectedText === "others" ? "text-secondary font-semibold" : ""
            }`}
            onClick={() => handleSelectedText("others")}
          >
            Others
          </button>
        </div>
        <div className="space-y-5 text-gray-500">
          <p>{selectedData.para1}</p>
          <p>{selectedData.para2}</p>
          <p>{selectedData.para3}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
