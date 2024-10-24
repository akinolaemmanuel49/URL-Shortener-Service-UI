"use client";

import { useRouter } from "next/navigation";

const subscriptionPlans = [
  { id: "free", name: "Free Plan", price: 0 },
  { id: "standard", name: "Standard Plan", price: 3 },
  { id: "premium", name: "Premium Plan", price: 5 },
];

export default function SubscriptionPlans() {
  const router = useRouter();

  const handleSelectPlan = (planType: string) => {
    router.push(`/dashboard/subscriptions/pay?planType=${planType}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {subscriptionPlans.map((plan) => (
        <div key={plan.id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-bold">{plan.name}</h2>
          <p className="text-lg">${plan.price} / month</p>
          <button
            onClick={() => handleSelectPlan(plan.id)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Select Plan
          </button>
        </div>
      ))}
    </div>
  );
}
