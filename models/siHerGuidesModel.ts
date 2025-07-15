// models/siHerGuides.model.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface ISiHerGuides extends Document {
  name: string;
  email: string;
  companyAffiliation: string;
  interests: string[];
  customPronoun?: string;
  personalValues?: string;
  digitalLink: "yes" | "no";
  createdAt: Date;
  updatedAt: Date;
}

const SiHerGuidesSchema: Schema = new Schema(
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
    companyAffiliation: {
      type: String,
      trim: true,
      required: true,
    },
    interests: {
      type: [String],
      trim: true,
      required: true,
    },
    customPronoun: {
      type: String,
      trim: true,
      default: "",
    },
    personalValues: {
      type: String,
      trim: true,
      default: "",
    },
    digitalLink: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
  },
  {
    timestamps: true,
  },
);

SiHerGuidesSchema.index({ createdAt: -1 });

SiHerGuidesSchema.pre<ISiHerGuides>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const SiHerGuides: Model<ISiHerGuides> =
  mongoose.models.SiHerGuides ||
  mongoose.model<ISiHerGuides>("SiHerGuides", SiHerGuidesSchema);

export default SiHerGuides;
