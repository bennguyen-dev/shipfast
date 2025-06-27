import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    const response = NextResponse.json({
      authenticated: !!session?.user,
      user: session?.user ? {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      } : null,
    });

    // Add CORS headers to allow Astro app to access this endpoint
    response.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_URL || 'http://localhost:4321');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Methods', 'GET');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Accept');

    return response;
  } catch (error) {
    console.error("Auth status check failed:", error);
    const errorResponse = NextResponse.json(
      { authenticated: false, user: null },
      { status: 500 }
    );

    // Add CORS headers to error response as well
    errorResponse.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_URL || 'http://localhost:4321');
    errorResponse.headers.set('Access-Control-Allow-Credentials', 'true');

    return errorResponse;
  }
}

// Handle preflight requests
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_URL || 'http://localhost:4321');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Accept');
  return response;
}
