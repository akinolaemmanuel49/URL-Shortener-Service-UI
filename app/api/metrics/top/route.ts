import { NextRequest, NextResponse } from "next/server";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export const GET = withApiAuthRequired(async function getTopUrls(
  req: NextRequest
) {
  try {
    const { accessToken } = await getAccessToken();

    const apiUrl = `${process.env.EXTERNAL_API_BASE_URL}/metrics/top`

    console.log(accessToken);
    console.log(apiUrl);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log(response)

    if (!response.ok) {
      throw new Error("Failed to fetch top URLs");
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
});
