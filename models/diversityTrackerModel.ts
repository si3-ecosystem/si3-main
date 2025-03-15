import mongoose, { Document, Model, Schema } from "mongoose";

export interface IDiversityTracker extends Document {
  self_identity: string;
  selfIdentityCustom: string;
  age_range: string;
  ethnicity: string;
  ethnicityCustom: string;
  disability: string;
  sexual_orientation: string;
  equity_scale: number;
  improvement_suggestions: string;
  grant_provider: string;
  grant_round: string;
  suggestions: string;
  active_grants_participated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DiversityTrackerSchema: Schema = new Schema(
  {
    selfIdentity: {
      type: String,
      trim: true,
      default: "",
    },
    selfIdentityCustom: { type: String, trim: true, default: "" },
    ageRange: {
      type: String,
      trim: true,
      default: "",
    },

    ethnicity: {
      type: String,
      trim: true,
      default: "",
    },
    ethnicityCustom: { type: String, trim: true, default: "" },

    disability: {
      type: String,
      trim: true,
      default: "",
    },

    sexualOrientation: {
      type: String,
      trim: true,
      default: "",
    },

    equityScale: {
      type: Number,
      min: 1,
      max: 10,
      default: 1,
    },

    improvementSuggestions: {
      type: String,
      trim: true,
      default: "",
    },

    grantProvider: {
      type: String,
      trim: true,
      default: "",
    },

    grantRound: {
      type: String,
      trim: true,
      default: "",
    },

    suggestions: {
      type: String,
      trim: true,
      default: "",
    },

    activeGrantsParticipated: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

DiversityTrackerSchema.index({ createdAt: -1 });

DiversityTrackerSchema.pre<IDiversityTracker>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const DiversityTracker: Model<IDiversityTracker> =
  mongoose.models.DiversityTracker ||
  mongoose.model<IDiversityTracker>("DiversityTracker", DiversityTrackerSchema);

export default DiversityTracker;
