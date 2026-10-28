import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  overview: string;
  problem: string;
  goals: string;
  features: string[];
  technologies: string[];
  category: string;
  coverImage: string;
  gallery: string[];
  role: string;
  developmentProcess: string;
  challenges: string;
  solutions: string;
  lessonsLearned: string;
  futurePlans: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    overview: { type: String, required: true },
    problem: { type: String, required: true },
    goals: { type: String, required: true },
    features: [{ type: String }],
    technologies: [{ type: String }],
    category: { type: String, required: true },
    coverImage: { type: String, required: true },
    gallery: [{ type: String }],
    role: { type: String, required: true },
    developmentProcess: { type: String, required: true },
    challenges: { type: String, required: true },
    solutions: { type: String, required: true },
    lessonsLearned: { type: String, required: true },
    futurePlans: { type: String, required: true },
    liveUrl: { type: String },
    githubUrl: { type: String },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ProjectSchema.index({ slug: 1 });
ProjectSchema.index({ published: 1, displayOrder: 1 });
ProjectSchema.index({ featured: 1 });

export const ProjectModel: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

