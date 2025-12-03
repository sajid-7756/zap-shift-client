import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UserAssignTable from "../../../Components/UserAssignTable/UserAssignTable";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const axiosSecure = useAxiosSecure();
  const assignRiderModalRef = useRef();

  const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup"
      );
      return res.data.result;
    },
  });

  const { data: riders = [] } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel?.senderDistrict,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel.senderDistrict}&workStatus=available`
      );
      return res.data;
    },
  });

  console.log(selectedParcel);

  const handleAssignRider = (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderName: rider.name,
      riderEmail: rider.email,
      parcelId: selectedParcel._id,
      trackingId: selectedParcel._trackingId,
    };
    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
      .then((res) => {
        if (res.data.parcelUpdate.modifiedCount) {
          assignRiderModalRef.current.close();
          parcelsRefetch();
          Swal.fire({
            position: "top-end",
            title: `Rider has been Assigned.`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <h3 className="text-4xl font-semibold">
        Assign Riders({parcels.length})
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Created At</th>
              <th>Pickup District</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <UserAssignTable
                key={parcel._id}
                parcel={parcel}
                index={index}
                assignRiderModalRef={assignRiderModalRef}
                setSelectedParcel={setSelectedParcel}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      <dialog
        ref={assignRiderModalRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Riders({riders.length})</h3>
          <p className="py-4">Please select a rider</p>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider, i) => (
                  <tr key={rider._id}>
                    <th>{i + 1}</th>
                    <td>{rider.name}</td>
                    <td>{rider.email}</td>
                    <td>
                      <button
                        onClick={() => handleAssignRider(rider)}
                        className="btn btn-primary text-black"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
