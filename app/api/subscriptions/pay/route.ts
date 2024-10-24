import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Parse the JSON body from the incoming request
  const { planType, sourceId } = await req.json();

  // Fetch access token from Auth0
  const { accessToken } = await getAccessToken();

  // Make a request to the external API
  const response = await fetch(
    `${process.env.EXTERNAL_API_BASE_URL}/subscriptions/pay`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan_type: planType, // Use extracted values from the request body
        source_id: sourceId,
      }),
    }
  );

  const data = await response.json();

  // Return success or failure response based on the API call
  if (response.ok) {
    return NextResponse.json({ success: true, message: data.message });
  } else {
    return NextResponse.json({ success: false, message: "Payment failed" });
  }
}

// import { getAccessToken } from "@auth0/nextjs-auth0";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   // Extract query parameters
//   const { searchParams } = new URL(req.url);
//   const planType = searchParams.get("plan_type");
//   const sourceId = searchParams.get("source_id");

//   // Fetch access token from Auth0
//   const { accessToken } = await getAccessToken();

//   // Build the external API URL with query parameters
//   const externalApiUrl = `${
//     process.env.EXTERNAL_API_BASE_URL
//   }/subscriptions/pay?plan_type=${encodeURIComponent(
//     !planType
//   )}&source_id=${encodeURIComponent(!sourceId)}`;

//   // Make a request to the external API with query parameters in the URL
//   const response = await fetch(externalApiUrl, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       "Content-Type": "application/json",
//     },
//     // No body needed since the query parameters are in the URL
//   });

//   const data = await response.json();

//   // Return success or failure response based on the API call
//   if (response.ok) {
//     return NextResponse.json({ success: true, message: data.message });
//   } else {
//     return NextResponse.json({ success: false, message: "Payment failed" });
//   }
// }
