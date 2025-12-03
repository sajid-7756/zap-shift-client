import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyPercels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data.result;
    },
  });

  const handleParcelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/parcels/${id}`)
          .then((res) => {
            console.log(res);
            if (res.data.result.deletedCount) {
              //refresh the data
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your parcel request has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const handlePayment = async (parcel) => {
    console.log(parcel);
    const parcelInfo = {
      cost: parcel.cost,
      parcelName: parcel.parcelName,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      trackingId: parcel.trackingId,
    };
    const res = await axiosSecure.post(
      "/payment-checkout-session",
      parcelInfo
    );
    // console.log(res.data);
    // window.location = res.data.url;
    window.location.assign(res.data.url);
  };

  console.log(parcels);

  return (
    <div className="container mx-auto border">
      <h3 className="text-4xl font-semibold">All Parcels: {parcels?.length}</h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Tracking Id</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels?.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                {console.log(parcel.cost)}
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <span className="text-green-400">Paid</span>
                  ) : (
                    <>
                      {/* <Link to={`/dashboard/payment/${parcel._id}`}>
                      <button className="btn btn-sm btn-primary text-black">
                        Pay
                      </button>
                      </Link> */}
                      <button
                        onClick={() => handlePayment(parcel)}
                        className="btn btn-sm btn-primary text-black"
                      >
                        Pay
                      </button>
                    </>
                  )}
                </td>
                <td>
                  <Link to={`/parcel-track/${parcel.trackingId}`}>
                    {parcel.trackingId}
                  </Link>
                </td>
                <td>{parcel.deliveryStatus}</td>
                <td className="flex gap-2">
                  <button className="btn btn-outline btn-warning text-black">
                    Update
                  </button>
                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="btn btn-outline btn-error text-black"
                  >
                    Delete
                  </button>
                  <button className="btn btn-outline btn-accent text-black">
                    View
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

export default MyPercels;
