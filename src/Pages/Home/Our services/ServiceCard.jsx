// Reusable Service Card Component
const ServiceCard = ({
  title,
  description,
    icon,
  bgColor = "bg-white",
  textColor = "text-[#2a2d33]",
}) => (
  <div
    className={`
      ${bgColor} 
      ${textColor}
      rounded-xl 
      p-6 md:p-8 
      shadow-lg 
      flex 
      flex-col 
      h-full
      transition 
      duration-300
      hover:shadow-2xl
      transform
      hover:-translate-y-1
      border-2
      border-transparent
     hover:bg-primary
    `}
  >
    <div className="flex items-center mb-4">
      {/* The image in the original design looks like a styled, subtle background circle 
        with an icon on top. We'll simulate the icon and its glow effect.
      */}
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center relative">
        {/* Placeholder for the actual icon/image */}
        <span className="text-2xl" role="img" aria-label="Icon">
          <img src={icon} alt="" />
        </span>
        {/* Simulating the blurred glow effect */}
        <div className="absolute inset-0 rounded-full blur-md opacity-50 bg-pink-200"></div>
      </div>
    </div>

    <h3 className="text-xl font-semibold mb-3">{title}</h3>

    <p className="text-sm opacity-85 leading-relaxed">{description}</p>
  </div>
);

export default ServiceCard;