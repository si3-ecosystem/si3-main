// app/api/siHerGuides/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import SiHerGuides, { ISiHerGuides } from "@/models/siHerGuidesModel";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const {
      name,
      email,
      companyAffiliation,
      interests,
      personalValues,
      digitalLink,
    } = body;

    if (
      !name ||
      !email ||
      !companyAffiliation ||
      !interests ||
      interests.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const siHerGuides: ISiHerGuides = await SiHerGuides.create({
      name,
      email,
      companyAffiliation,
      interests,
      personalValues,
      digitalLink,
    });

    return NextResponse.json(siHerGuides, { status: 201 });
  } catch (error) {
    console.error("Error creating SI Her Guides entry:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
