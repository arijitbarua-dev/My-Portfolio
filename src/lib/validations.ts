import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please provide a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(150),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  honeypot: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const profileSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  designation: z.string().min(2),
  headline: z.string().min(5),
  introduction: z.string().min(10),
  about: z.string().min(10),
  location: z.string().min(2),
  portrait: z.string().min(1),
  resumeUrl: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  availability: z.string().min(2),
});

export const projectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  subtitle: z.string().min(2),
  description: z.string().min(10),
  overview: z.string().min(10),
  problem: z.string().min(10),
  goals: z.string().min(10),
  features: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  category: z.string().min(2),
  coverImage: z.string().min(1),
  gallery: z.array(z.string()).default([]),
  role: z.string().min(2),
  developmentProcess: z.string().min(10),
  challenges: z.string().min(10),
  solutions: z.string().min(10),
  lessonsLearned: z.string().min(10),
  futurePlans: z.string().min(5),
  liveUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  displayOrder: z.number().default(0),
});

