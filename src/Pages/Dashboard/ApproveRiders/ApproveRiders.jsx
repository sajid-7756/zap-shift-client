import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrash, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });
  console.log(riders);

  const updateRiderStatus = (rider, status) => {
    console.log({ rider, status });
    const updatedStatus = { status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updatedStatus).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          title: `Rider status set to ${status}.`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleApprove = (rider) => {
    updateRiderStatus(rider, "approved");
  };

  const handleReject = (rider) => {
    updateRiderStatus(rider, "rejected");
  };

  const handleDelete = (id) => {
    axiosSecure.delete(`/riders/${id}`).then((res) => {
      if (res.data.deletedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          title: `Rider delete success.`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-5xl font-semibold">
        Riders Pending Approval({riders?.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.district}</td>
                <td>
                  <p
                    className={` badge ${
                      rider.status === "pending"
                        ? "badge-warning"
                        : rider.status === "rejected"
                        ? "badge-error"
                        : "badge-success "
                    }`}
                  >
                    {rider.status}
                  </p>
                </td>
                <td>{rider.workStatus}</td>
                <td className="space-x-2">
                  <button onClick={() => handleApprove(rider)} className="btn">
                    <FaUserCheck />
                  </button>
                  <button onClick={() => handleReject(rider)} className="btn">
                    <IoPersonRemoveSharp />
                  </button>
                  <button
                    onClick={() => handleDelete(rider._id)}
                    className="btn"
                  >
                    <FaTrash />
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

export default ApproveRiders;
