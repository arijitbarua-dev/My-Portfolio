import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISkill extends Document {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Tools and Workflow" | string;
  icon: string;
  proficiency?: number;
  displayOrder: number;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["Frontend", "Backend", "Database", "Tools and Workflow"],
    },
    icon: { type: String, default: "Code2" },
    proficiency: { type: Number, min: 0, max: 100 },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

SkillSchema.index({ category: 1, displayOrder: 1 });

export const SkillModel: Model<ISkill> =
  mongoose.models.Skill || mongoose.model<ISkill>("Skill", SkillSchema);

