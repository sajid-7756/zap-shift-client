// Reusable Feature Item Component
const FeatureItem = ({ title, description, image }) => (
  // The card container with the separator line effect
  <div
    className="
    bg-white 
    rounded-xl 
    shadow-xl 
    mb-8 
    p-4 
    md:p-8 
    lg:p-10
    relative
    overflow-hidden
"
  >
    <div className="flex flex-col md:flex-row items-center md:items-start pt-2 pb-2">
      {/* 1. Illustration Area (Left Side) */}
      <div className="w-full md:w-1/3 lg:w-1/4 flex justify-center p-4 md:p-0 mb-4 md:mb-0">
        <div className="w-full max-w-[200px] h-auto aspect-square flex items-center justify-center border-r-0 md:border-r border-gray-200">
          <div className="p-2">
            <img src={image} alt="" />
          </div>
        </div>
      </div>

      {/* 2. Text Content (Right Side) */}
      <div className="w-full md:w-2/3 lg:w-3/4 md:pl-8">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          {title}
        </h3>
        <p className="text-base text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

export default FeatureItem;
