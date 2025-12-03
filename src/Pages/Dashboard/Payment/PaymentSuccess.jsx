import React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";

const PaymentSuccess = () => {
  const [SearchParams] = useSearchParams();
  const sessionId = SearchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});

  // console.log(paymentInfo);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            trackingId: res.data.trackingId,
            transactionId: res.data.transactionId,
          });
        });
    }
  }, [axiosSecure, sessionId]);

  return (
    <div>
      <h2 className="text-3xl">Payment Successful</h2>
      <p>Transaction ID: {paymentInfo.transactionId}</p>
      <p>Tracing ID: {paymentInfo.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;
