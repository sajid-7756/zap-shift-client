import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Rider = () => {
  const { user } = useAuth();
  const { register, handleSubmit, control, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();

  const riderRegion = useWatch({ control, name: "region" });

  const duplicateRegions = serviceCenters.map((c) => c.region);
  const regions = [...new Set(duplicateRegions)];

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((r) => r.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const onSubmit = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        console.log("data after post", res.data);
        Swal.fire({
          position: "top-end",
          text: "Your Applicaiton has been submitted. We reach out to you in 7 days.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl font-semibold ">Be a Rider</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="gap-5 border-b border-gray-300 pb-5 mb-5">
          {/* Sender Details */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              Sender Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sender Name */}
              <div className="form-control w-full">
                <label htmlFor="senderName" className="label py-1">
                  <span className="label-text text-gray-600">Rider Name</span>
                </label>
                <input
                  {...register("name")}
                  defaultValue={user?.displayName}
                  type="text"
                  placeholder="Sender Name"
                  className="input input-bordered w-full bg-white focus:border-[#48d08c]"
                />
              </div>
              {/* Address */}
              <div className="form-control w-full">
                <label htmlFor="senderAddress" className="label py-1">
                  <span className="label-text text-gray-600">Address</span>
                </label>
                <input
                  {...register("address")}
                  type="text"
                  placeholder="Address"
                  className="input input-bordered w-full bg-white focus:border-[#48d08c]"
                />
              </div>
              {/* Sender Contact No */}
              <div className="form-control w-full">
                <label htmlFor="contact" className="label py-1">
                  <span className="label-text text-gray-600">Contact No</span>
                </label>
                <input
                  {...register("contact")}
                  type="tel"
                  placeholder="Contact No"
                  className="input input-bordered w-full bg-white focus:border-[#48d08c]"
                />
              </div>
              {/* Sender Email */}
              <div className="form-control w-full">
                <label htmlFor="senderEmail" className="label py-1">
                  <span className="label-text text-gray-600">Email</span>
                </label>
                <input
                  {...register("email")}
                  value={user?.email}
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full bg-white focus:border-[#48d08c]"
                />
              </div>
            </div>

            {/* Sender Region (Dropdown) */}
            <div className="form-control w-full mt-6">
              <label htmlFor="region" className="label py-1">
                <span className="label-text text-gray-600">Rider Region</span>
              </label>
              <select
                {...register("region")}
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
              <label htmlFor="district" className="label py-1">
                <span className="label-text text-gray-600">District</span>
              </label>
              <select
                {...register("district")}
                className="select select-bordered w-full bg-white focus:border-[#48d08c]"
              >
                <option disabled selected>
                  Select your District
                </option>
                {districtsByRegion(riderRegion).map((r, index) => (
                  <option key={index}>{r}</option>
                ))}
              </select>
            </div>
            {/* Driving License */}
            <div className="form-control w-full">
              <label htmlFor="receiverName" className="label py-1">
                <span className="label-text text-gray-600">
                  Driving License
                </span>
              </label>
              <input
                {...register("license")}
                type="text"
                placeholder="Driving License"
                className="input input-bordered w-full bg-white focus:border-[#48d08c]"
              />
            </div>
            {/* NID */}
            <div className="form-control w-full">
              <label htmlFor="receiverAddress" className="label py-1">
                <span className="label-text text-gray-600">NID</span>
              </label>
              <input
                {...register("nid")}
                type="text"
                placeholder="NID"
                className="input input-bordered w-full bg-white focus:border-[#48d08c]"
              />
            </div>
            {/* bikeInformation */}
            <div className="form-control w-full">
              <label htmlFor="bikeInformation" className="label py-1">
                <span className="label-text text-gray-600">
                  Bike Information
                </span>
              </label>
              <input
                {...register("bike")}
                type="text"
                placeholder="Bike Information"
                className="input input-bordered w-full bg-white focus:border-[#48d08c]"
              />
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
          Apply as a Rider
        </button>
      </form>
    </div>
  );
};

export default Rider;
