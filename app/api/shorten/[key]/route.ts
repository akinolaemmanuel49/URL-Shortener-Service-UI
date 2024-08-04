import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "@auth0/nextjs-auth0";

// Define the API route handler function
export async function DELETE(
  req: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const { key } = params;
    const { accessToken } = await getAccessToken();

    const response = await fetch(
      `${process.env.EXTERNAL_API_BASE_URL}/shorten/${key}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete URL");
    }

    return NextResponse.json(
      { message: "URL deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

// export const DELETE = withApiAuthRequired(
//   async (req: NextRequest, { params }: { params: { key: string } }) => {
//     try {
//       const { key } = params;
//       const { accessToken } = await getAccessToken();

//       const response = await fetch(
//         `${process.env.EXTERNAL_API_BASE_URL}/shorten/${key}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to delete URL");
//       }

//       return NextResponse.json(
//         { message: "URL deleted successfully" },
//         { status: 200 }
//       );
//     } catch (error) {
//       return NextResponse.json(
//         { message: (error as Error).message },
//         { status: 500 }
//       );
//     }
//   }
// );
