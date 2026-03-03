import { NextResponse } from "next/server";

export async function POST() {

  try {

    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    // Remove auth cookie

    response.cookies.set("token", "", {
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    });

    return response;

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message: "Logout failed",
      },
      { status: 500 }
    );

  }

}