import { NextRequest, NextResponse } from "next/server";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

export const POST = withApiAuthRequired(async function shorten(
  req: NextRequest
) {
  try {
    const { searchParams } = new URL(req.url);
    const original_url = searchParams.get("url");

    if (!original_url) {
      return NextResponse.json(
        { message: "Invalid or missing url parameter" },
        { status: 400 }
      );
    }

    const { accessToken } = await getAccessToken();

    const apiUrl = new URL(`${process.env.EXTERNAL_API_BASE_URL}/shorten/`);
    apiUrl.searchParams.append("url", original_url);

    const response = await fetch(apiUrl.toString(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to shorten URL");
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

export const GET = withApiAuthRequired(async function list(req: NextRequest) {
  try {
    const { accessToken } = await getAccessToken();

    // Extract limit and offset from query parameters
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit") || "4"; // Default to 4 if not provided
    const offset = searchParams.get("offset") || "0"; // Default to 0 if not provided

    const apiUrl = new URL(`${process.env.EXTERNAL_API_BASE_URL}/shorten/`);
    apiUrl.searchParams.append("limit", limit);
    apiUrl.searchParams.append("offset", offset);

    const response = await fetch(apiUrl.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to retrieve URLs");
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
