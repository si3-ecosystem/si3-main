import mongoose from "mongoose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import dbConnect from "@/config/db";

const DataSchema = new mongoose.Schema({
  name: String,
  value: String,
});

const Data = mongoose.models.Data || mongoose.model("Data", DataSchema);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const data = await Data.find({});
    return NextResponse.json(data);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
}
