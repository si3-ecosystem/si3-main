// app/api/diversity-tracker/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import DiversityTracker, {
  IDiversityTracker,
} from "@/models/diversityTrackerModel";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const {
      self_identity,
      age_range,
      ethnicity,
      disability,
      sexual_orientation,
      equity_scale,
      improvement_suggestions,
      grant_provider,
      grant_round,
      suggestions,
      active_grants_participated,
    } = body;

    if (
      !self_identity ||
      !age_range ||
      !ethnicity ||
      !disability ||
      !sexual_orientation ||
      !equity_scale ||
      equity_scale < 1 ||
      equity_scale > 10
    ) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 },
      );
    }

    const diversityTracker: IDiversityTracker = await DiversityTracker.create({
      selfIdentity: self_identity,
      ageRange: age_range,
      ethnicity,
      disability,
      sexualOrientation: sexual_orientation,
      equityScale: equity_scale,
      improvementSuggestions: improvement_suggestions,
      grantProvider: grant_provider,
      grantRound: grant_round,
      suggestions,
      activeGrantsParticipated: active_grants_participated,
    });

    return NextResponse.json(diversityTracker, { status: 201 });
  } catch (error) {
    console.error("Error creating diversity tracker:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
