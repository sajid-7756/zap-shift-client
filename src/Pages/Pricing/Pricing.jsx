import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const Pricing = () => {
  const { register, handleSubmit, control } = useForm();
  const serviceCenters = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const duplicateRegions = serviceCenters.map((c) => c.region);
  const regions = [...new Set(duplicateRegions)];

  const districsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((r) => r.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handlePricing = (data) => {
    console.log(data);
    const parcelWeight = parseFloat(data.parcelWeight);
    const isDocument = data.documentType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    data.cost = cost;

    Swal.fire({
      title: "Are you sure?",
      text: `You have to pay ${cost} taka`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // post to database
        axiosSecure
          .post("/parcels", data)
          .then((res) => {
            console.log("after posting percel", res.data.result);
            if (res.data.result.insertedId) {
              navigate("/dashboard/my-parcels");
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Parcel has been created. Please pay",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((err) => console.log(err));

        Swal.fire({
          title: "Success !",
          text: "Your Parcel has been added.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="bg-base-100 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto shadow-2xl my-8 border border-gray-200 overflow-hidden">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Add Parcel</h1>

      <form onSubmit={handleSubmit(handlePricing)}>
        {/* Section: Enter your parcel details */}
        <div className="mb-10 pb-6 border-b border-gray-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Enter your parcel details
          </h2>

          {/* Document Type Radio Buttons */}
          <div className="flex items-center space-x-6 mb-8">
            <label className="label cursor-pointer p-0">
              <input
                {...register("documentType")}
                type="radio"
                value="document"
                className="radio radio-success checked:bg-[#48d08c]"
                defaultChecked
              />
              <span className="label-text ml-2 text-gray-700">Document</span>
            </label>
            <label className="label cursor-pointer p-0">
              <input
                {...register("documentType")}
                type="radio"
                value="nonDocument"
                className="radio radio-success checked:bg-[#48d08c]"
              />
              <span className="label-text ml-2 text-gray-700">
                Not-Document
              </span>
            </label>
          </div>

          {/* Parcel Name and Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label htmlFor="parcelName" className="label py-1">
                <span className="label-text text-gray-600">Parcel Name</span>
              </label>
              <input
                {...register("parcelName")}
                type="text"
                placeholder="Parcel Name"
                className="input input-bordered w-full bg-white focus:border-[#48d08c] focus:ring-1 focus:ring-[#48d08c]"
              />
            </div>
            <div className="form-control w-full">
              <label htmlFor="parcelWeight" className="label py-1">
                <span className="label-text text-gray-600">
                  Parcel Weight (KG)
                </span>
              </label>
              <input
                {...register("parcelWeight")}
                type="number"
                placeholder="Parcel Weight (KG)"
                className="input input-bordered w-full bg-white focus:border-[#48d08c] focus:ring-1 focus:ring-[#48d08c]"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-5 border-b border-gray-300 pb-5 mb-5">
          {/* Sender Details */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              Sender Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sender Name */}
              <div className="form-control w-full">
                <label htmlFor="senderName" className="label py-1">
                  <span className="label-text text-gray-600">Sender Name</span>
                </label>
                <input
                  {...register("senderName")}
                  defaultValue={user?.displayName}
                  type="text"
                  placeholder="Sender Name"
                  className="input input-bordered w-full bg-white focus:border-[#48d08c]"
                />
              </div>
              {/* Sender Pickup Warehouse (Dropdown) */}
              <div className="form-control w-full">
                <label htmlFor="senderWarehouse" className="label py-1">
                  <span className="label-text text-gray-600">
                    Sender Pickup Warehouse
                  </span>
                </label>
                <select
                  {...register("senderWarehouse")}
                  className="select select-bordered w-full bg-white focus:border-[#48d08c]"
                >
                  <option disabled selected>
                    Select Wire house
                  </option>
                  <option>Warehouse A</option>
                  <option>Warehouse B</option>
                </select>
              </div>
              {/* Address */}
              <div className="form-control w-full">
                <label htmlFor="senderAddress" className="label py-1">
                  <span className="label-text text-gray-600">Address</span>
                </label>
                <input
                  {...register("senderAddress")}
                  type="text"
                  placeholder="Address"
                  className="input input-bordered w-full bg-white focus:border-[#48d08c]"
                />
              </div>
              {/* Sender Contact No */}
              <div className="form-control w-full">
                <label htmlFor="senderContact" className="label py-1">
                  <span className="label-text text-gray-600">
                    Sender Contact No
                  </span>
                </label>
                <input
                  {...register("senderContact")}
                  type="tel"
                  placeholder="Sender Contact No"
                  className="input input-bordered w-full bg-white focus:border-[#48d08c]"
                />
              </div>
              {/* Sender Email */}
              <div className="form-control w-full">
                <label htmlFor="senderEmail" className="label py-1">
                  <span className="label-text text-gray-600">Sender Email</span>
                </label>
                <input
                  {...register("senderEmail")}
                  defaultValue={user?.email}
                  type="email"
                  placeholder="Sender Email"
                  className="input input-bordered w-full bg-white focus:border-[#48d08c]"
                />
              </div>
            </div>

            {/* Sender Region (Dropdown) */}
            <div className="form-control w-full mt-6">
              <label htmlFor="senderRegion" className="label py-1">
                <span className="label-text text-gray-600">Sender Region</span>
              </label>
              <select
                {...register("senderRegion")}
                className="select select-bordered w-full bg-white focus:border-[#48d08c]"
              >
                <option disabled selected>
                  Select your region
                </option>
                {regions.map((r, index) => (
                  <option key={index}>{r}</option>
                ))}
              </select>
            </div>

            {/* Sender District (Dropdown) */}
            <div className="form-control w-full mt-6">
              <label htmlFor="senderDistrict" className="label py-1">
                <span className="label-text text-gray-600">
                  Sender District
                </span>
              </label>
              <select
                {...register("senderDistrict")}
                className="select select-bordered w-full bg-white focus:border-[#48d08c]"
              >
                <option disabled selected>
                  Select your District
                </option>
                {districsByRegion(senderRegion).map((r, index) => (
                  <option key={index}>{r}</option>
                ))}
              </select>
            </div>

            {/* Pickup Instruction (Textarea) */}
            <div className="mt-6 form-control w-full">
              <label htmlFor="pickupInstruction" className="label py-1">
                <span className="label-text text-gray-600">
                  Pickup Instruction
                </span>
              </label>
              <textarea
                {...register("pickupInstruction")}
                rows="3"
                placeholder="Pickup Instruction"
                className="textarea textarea-bordered h-24 w-full bg-white focus:border-[#48d08c]"
              ></textarea>
            </div>
          </div>

          {/* Receiver Details */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              Receiver Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Receiver Name */}
              <div className="form-control w-full">
                <label htmlFor="receiverName" className="label py-1">
                  <span className="label-text text-gray-600">
                    Receiver Name
                  </span>
                </label>
                <input
                  {...register("receiverName")}
                  type="text"
                  placeholder="Receiver Name"
                  className="input input-bordered w-full bg-white focus:border-[#48d08c]"
                />
              </div>
              {/* Receiver Delivery Warehouse (Dropdown) */}
              <div className="form-control w-full">
                <label htmlFor="receiverWarehouse" className="label py-1">
                  <span className="label-text text-gray-600">
                    Receiver Delivery Wire house
                  </span>
                </label>
                <select
                  {...register("receiverWarehouse")}
                  id="receiverWarehouse"
                  className="select select-bordered w-full bg-white focus:border-[#48d08c]"
                >
                  <option disabled selected>
                    Select Wire house
                  </option>
                  <option>Warehouse C</option>
                  <option>Warehouse D</option>
                </select>
              </div>
              {/* Receiver Address */}
              <div className="form-control w-full">
                <label htmlFor="receiverAddress" className="label py-1">
                  <span className="label-text text-gray-600">
                    Receiver Address
                  </span>
                </label>
                <input
                  {...register("receiverAddress")}
                  type="text"
                  placeholder="Address"
                  className="input input-bordered w-full bg-white focus:border-[#48d08c]"
                />
              </div>
              {/* Receiver Contact No */}
              <div className="form-control w-full">
                <label htmlFor="receiverContact" className="label py-1">
                  <span className="label-text text-gray-600">
                    Receiver Contact No
                  </span>
                </label>
                <input
                  {...register("receiverContact")}
                  type="tel"
                  placeholder="Receiver Contact No"
                  className="input input-bordered w-full bg-white focus:border-[#48d08c]"
                />
              </div>
              {/* Receiver Email */}
              <div className="form-control w-full">
                <label htmlFor="receiverEmail" className="label py-1">
                  <span className="label-text text-gray-600">
                    Receiver Email
                  </span>
                </label>
                <input
                  {...register("receiverEmail")}
                  type="email"
                  placeholder="Receiver Email"
                  className="input input-bordered w-full bg-white focus:border-[#48d08c]"
                />
              </div>
            </div>
            {/* Receiver Region (Dropdown) */}
            <div className="form-control w-full mt-6">
              <label htmlFor="receiverRegion" className="label py-1">
                <span className="label-text text-gray-600">
                  Receiver Region
                </span>
              </label>
              <select
                {...register("receiverRegion")}
                className="select select-bordered w-full bg-white focus:border-[#48d08c]"
              >
                <option disabled selected>
                  Select your region
                </option>

                {regions.map((r, index) => (
                  <option key={index}>{r}</option>
                ))}
              </select>
            </div>

            {/* Recever District (Dropdown) */}
            <div className="form-control w-full mt-6">
              <label htmlFor="receiverDistrict" className="label py-1">
                <span className="label-text text-gray-600">
                  Receiver District
                </span>
              </label>
              <select
                {...register("receiverDistrict")}
                className="select select-bordered w-full bg-white focus:border-[#48d08c]"
              >
                <option disabled selected>
                  Select your District
                </option>
                {districsByRegion(receiverRegion).map((r, index) => (
                  <option key={index}>{r}</option>
                ))}
              </select>
            </div>

            {/* Delivery Instruction (Textarea) */}
            <div className="mt-6 form-control w-full">
              <label htmlFor="deliveryInstruction" className="label py-1">
                <span className="label-text text-gray-600">
                  Delivery Instruction
                </span>
              </label>
              <textarea
                {...register("deliveryInstruction")}
                rows="3"
                placeholder="Delivery Instruction"
                className="textarea textarea-bordered h-24 w-full bg-white focus:border-[#48d08c]"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Pickup Time Note */}
        <p className="text-sm text-gray-500 mb-8">
          * PickUp Time 4pm-7pm Approx.
        </p>

        {/* Proceed Button */}
        <button
          type="submit"
          className="
          btn 
          w-full md:w-auto 
          text-gray-800
          shadow-md
          border-none
        "
          style={{
            backgroundColor: "#b6f06a", // Custom lime green to match the design
            borderColor: "#b6f06a",
          }}
        >
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Pricing;
