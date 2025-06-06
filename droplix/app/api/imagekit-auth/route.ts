import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const authParams = imagekit.getAuthenticationParameters();

    return NextResponse.json(authParams);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to generate authentication parameter for image" },
      { status: 500 }
    );
  }
}

// How we upload a data let's begin whenever we upload a data the image goes into the imageComponent of the imagekit because it's endpoint automatically hits its it upload the image and returns back you the body
