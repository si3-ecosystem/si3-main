// app/api/partnerProgram/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import PartnerProgram, { IPartnerProgram } from "@/models/partnerProgramModel";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const { name, email, companyName, interests, details, newsletter } = body;
    if (
      !name ||
      !email ||
      !companyName ||
      !interests ||
      interests.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const partnerProgram: IPartnerProgram = await PartnerProgram.create({
      name,
      email,
      companyName,
      interests,
      details,
      newsletter,
    });

    return NextResponse.json(partnerProgram, { status: 201 });
  } catch (error) {
    console.error("Error creating partner program:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
