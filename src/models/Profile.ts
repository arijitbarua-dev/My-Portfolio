import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProfile extends Document {
  name: string;
  slug: string;
  designation: string;
  headline: string;
  introduction: string;
  about: string;
  location: string;
  portrait: string;
  resumeUrl?: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  socialLinks: Array<{ platform: string; url: string; label: string }>;
  availability: string;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, default: "portfolio-owner" },
    designation: { type: String, required: true },
    headline: { type: String, required: true },
    introduction: { type: String, required: true },
    about: { type: String, required: true },
    location: { type: String, required: true },
    portrait: { type: String, required: true },
    resumeUrl: { type: String, default: "/resume.pdf" },
    email: { type: String, required: true },
    phone: { type: String },
    whatsapp: { type: String },
    socialLinks: [
      {
        platform: { type: String, required: true },
        url: { type: String, required: true },
        label: { type: String, required: true },
      },
    ],
    availability: { type: String, default: "Available for new projects" },
  },
  { timestamps: true }
);

export const ProfileModel: Model<IProfile> =
  mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);

