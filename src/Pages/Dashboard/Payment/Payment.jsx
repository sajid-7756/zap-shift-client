import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: parcel = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data.result;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      parcelId: parcel.parcelId,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
      cost: parcel.cost,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    // window.location = res.data.url;
  };

  return (
    <div>
      <h2 className="text-4xl">Please Pay: {parcel.cost}</h2>
      <p> {parcel.parcelName}</p>
      <button onClick={handlePayment} className="btn btn-primary text-black">
        Pay
      </button>
    </div>
  );
};

export default Payment;
