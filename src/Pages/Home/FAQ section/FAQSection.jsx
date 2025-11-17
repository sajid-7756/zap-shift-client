import React from "react";

const faqData = [
  {
    question: "How does this posture corrector work?",
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
    isOpen: true, // Set the first item to be open by default
  },
  {
    question: "Is it suitable for all ages and body types?",
    answer:
      "Posture correctors are generally designed to be adjustable and suitable for a wide range of ages and body types. However, it’s always recommended to check the product specifications and sizing guide to ensure a proper fit. For children or individuals with specific medical conditions, consulting a healthcare professional before use is advisable.",
    isOpen: false,
  },
  {
    question: "Does it really help with back pain and posture improvement?",
    answer:
      "Many users report significant improvements in posture and a reduction in back pain with consistent use of posture correctors. By training your muscles to hold proper alignment, they can alleviate strain and discomfort. For chronic or severe pain, it’s best to consult a doctor or physical therapist.",
    isOpen: false,
  },
  {
    question: "Does it have smart features like vibration alerts?",
    answer:
      "Some advanced posture correctors come with smart features such as vibration alerts that remind you to adjust your posture when you start to slouch. These features often connect to a mobile app to track your progress and provide personalized feedback.",
    isOpen: false,
  },
  {
    question: "How will I be notified when the product is back in stock?",
    answer:
      'You can sign up for our email notifications on the product page. Simply enter your email address in the "Notify Me" section, and we will send you an email as soon as the product is back in stock. You can also follow our social media channels for updates.',
    isOpen: false,
  },
];

// Main FAQ Section Component
const FAQSection = () => {
  return (
    <section className={" py-16 md:py-24 px-4 sm:px-6 lg:px-8"}>
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4`}>
            Frequently Asked Question (FAQ)
          </h2>
          <p className={`text-lg max-w-2xl mx-auto `}>
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>

        {/* FAQ Collapse Items */}
        <div className="space-y-4">
          {" "}
          {/* Adds space between collapse items */}
          {faqData.map((faq, index) => (
            <details key={index} className="collapse bg-base-100 border-base-300 border">
              <summary className="collapse-title font-semibold">
                {faq.question}
              </summary>
              <div className="collapse-content text-sm">{faq.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
