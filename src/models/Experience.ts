import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExperience extends Document {
  title: string;
  company: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  displayOrder: number;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    employmentType: { type: String, default: "Full-Time" },
    location: { type: String, default: "Remote" },
    startDate: { type: String, required: true },
    endDate: { type: String, default: "Present" },
    current: { type: Boolean, default: false },
    description: { type: String, required: true },
    achievements: [{ type: String }],
    technologies: [{ type: String }],
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ExperienceSchema.index({ displayOrder: 1 });

export const ExperienceModel: Model<IExperience> =
  mongoose.models.Experience || mongoose.model<IExperience>("Experience", ExperienceSchema);

