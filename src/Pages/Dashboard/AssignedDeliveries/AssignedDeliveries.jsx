import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=in_delivery`
      );
      return res.data;
    },
  });

  const handleDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        console.log(res);
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            title: `Parcel status updated with ${status.split("_").join(" ")}`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <h3 className="text-4xl font-semibold">Assigned Deliveries</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Confirm</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th> {i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>
                  {parcel.deliveryStatus === "driver_assigned" ? (
                    <>
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "rider_arriving")
                        }
                        className="btn btn-success"
                      >
                        Accept
                      </button>
                      <button className="btn btn-error">Reject</button>
                    </>
                  ) : (
                    <span className="badge badge-success">
                      Delivery Accepted
                    </span>
                  )}
                </td>
                <td className="space-x-3">
                  <button
                    onClick={() =>
                      handleDeliveryStatusUpdate(parcel, "parcel_picked_up")
                    }
                    className="btn btn-primary text-black"
                  >
                    Mark as Picked up
                  </button>
                  <button
                    onClick={() =>
                      handleDeliveryStatusUpdate(parcel, "parcel_delivered")
                    }
                    className="btn btn-primary text-black"
                  >
                    Mark as Delivered
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
