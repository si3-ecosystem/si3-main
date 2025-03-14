// models/partnerProgram.model.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPartnerProgram extends Document {
  name: string;
  email: string;
  companyName: string;
  interests: string[];
  details?: string;
  newsletter: "yes" | "no";
  createdAt: Date;
  updatedAt: Date;
}

const PartnerProgramSchema: Schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    companyName: {
      type: String,
      trim: true,
      required: true,
    },
    interests: {
      type: [String],
      trim: true,
      required: true,
    },
    details: {
      type: String,
      trim: true,
      default: "",
    },
    newsletter: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
  },
  {
    timestamps: true,
  },
);

PartnerProgramSchema.index({ createdAt: -1 });

PartnerProgramSchema.pre<IPartnerProgram>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const PartnerProgram: Model<IPartnerProgram> =
  mongoose.models.PartnerProgram ||
  mongoose.model<IPartnerProgram>("PartnerProgram", PartnerProgramSchema);

export default PartnerProgram;
