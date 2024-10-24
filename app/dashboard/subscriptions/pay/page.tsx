"use client";

import { useSearchParams } from "next/navigation"; // Use this for query parameters
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";

export default function SubscriptionPayment() {
  const searchParams = useSearchParams();
  const planType = searchParams.get("planType"); // Get plan type from query parameters
  const applicationId = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
  const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

  return (
    <PaymentForm
      applicationId={applicationId}
      locationId={locationId}
      cardTokenizeResponseReceived={async (token) => {
        const response = await fetch("/api/subscriptions/pay", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sourceId: token.token,
            planType: planType, // Include planType in the request body
          }),
        });
      }}
    >
      <CreditCard />
    </PaymentForm>
  );
}
