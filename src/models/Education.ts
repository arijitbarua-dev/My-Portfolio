import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEducation extends Document {
  qualification: string;
  institution: string;
  subject: string;
  startYear: string | number;
  endYear: string | number;
  grade?: string;
  description: string;
  displayOrder: number;
}

const EducationSchema = new Schema<IEducation>(
  {
    qualification: { type: String, required: true },
    institution: { type: String, required: true },
    subject: { type: String, required: true },
    startYear: { type: Schema.Types.Mixed, required: true },
    endYear: { type: Schema.Types.Mixed, required: true },
    grade: { type: String },
    description: { type: String, required: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

EducationSchema.index({ displayOrder: 1 });

export const EducationModel: Model<IEducation> =
  mongoose.models.Education || mongoose.model<IEducation>("Education", EducationSchema);

