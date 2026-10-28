"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth-server";
import { connectDB } from "@/lib/mongodb";
import { ProfileModel } from "@/models/Profile";
import { SkillModel } from "@/models/Skill";
import { EducationModel } from "@/models/Education";
import { ExperienceModel } from "@/models/Experience";
import { ProjectModel } from "@/models/Project";
import { ContactMessageModel } from "@/models/ContactMessage";
import { profileSchema, projectSchema } from "@/lib/validations";

async function requireAuth() {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized: You must be signed in as an administrator.");
  }
  return session.user;
}

// -------------------------------------------------------------
// PROFILE ACTIONS
// -------------------------------------------------------------

export async function updateProfile(data: any) {
  await requireAuth();
  await connectDB();

  const validated = profileSchema.parse(data);

  const updated = await ProfileModel.findOneAndUpdate(
    {},
    {
      ...validated,
      socialLinks: data.socialLinks || [],
    },
    { new: true, upsert: true }
  );

  revalidatePath("/");
  return { success: true, profile: JSON.parse(JSON.stringify(updated)) };
}

// -------------------------------------------------------------
// SKILLS ACTIONS
// -------------------------------------------------------------

export async function createSkill(data: {
  name: string;
  category: string;
  icon: string;
  proficiency?: number;
  displayOrder: number;
}) {
  await requireAuth();
  await connectDB();

  const skill = await SkillModel.create(data);
  revalidatePath("/");
  return { success: true, skill: JSON.parse(JSON.stringify(skill)) };
}

export async function updateSkill(id: string, data: any) {
  await requireAuth();
  await connectDB();

  const updated = await SkillModel.findByIdAndUpdate(id, data, { new: true });
  revalidatePath("/");
  return { success: true, skill: JSON.parse(JSON.stringify(updated)) };
}

export async function deleteSkill(id: string) {
  await requireAuth();
  await connectDB();

  await SkillModel.findByIdAndDelete(id);
  revalidatePath("/");
  return { success: true };
}

// -------------------------------------------------------------
// EDUCATION ACTIONS
// -------------------------------------------------------------

export async function createEducation(data: {
  qualification: string;
  institution: string;
  subject: string;
  startYear: string | number;
  endYear: string | number;
  grade?: string;
  description: string;
  displayOrder: number;
}) {
  await requireAuth();
  await connectDB();

  const edu = await EducationModel.create(data);
  revalidatePath("/");
  return { success: true, education: JSON.parse(JSON.stringify(edu)) };
}

export async function updateEducation(id: string, data: any) {
  await requireAuth();
  await connectDB();

  const updated = await EducationModel.findByIdAndUpdate(id, data, { new: true });
  revalidatePath("/");
  return { success: true, education: JSON.parse(JSON.stringify(updated)) };
}

export async function deleteEducation(id: string) {
  await requireAuth();
  await connectDB();

  await EducationModel.findByIdAndDelete(id);
  revalidatePath("/");
  return { success: true };
}

// -------------------------------------------------------------
// EXPERIENCE ACTIONS
// -------------------------------------------------------------

export async function createExperience(data: {
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
}) {
  await requireAuth();
  await connectDB();

  const exp = await ExperienceModel.create(data);
  revalidatePath("/");
  return { success: true, experience: JSON.parse(JSON.stringify(exp)) };
}

export async function updateExperience(id: string, data: any) {
  await requireAuth();
  await connectDB();

  const updated = await ExperienceModel.findByIdAndUpdate(id, data, { new: true });
  revalidatePath("/");
  return { success: true, experience: JSON.parse(JSON.stringify(updated)) };
}

export async function deleteExperience(id: string) {
  await requireAuth();
  await connectDB();

  await ExperienceModel.findByIdAndDelete(id);
  revalidatePath("/");
  return { success: true };
}

// -------------------------------------------------------------
// PROJECT ACTIONS
// -------------------------------------------------------------

export async function createProject(data: any) {
  await requireAuth();
  await connectDB();

  const validated = projectSchema.parse(data);
  const proj = await ProjectModel.create(validated);
  
  revalidatePath("/");
  revalidatePath(`/projects/${proj.slug}`);
  return { success: true, project: JSON.parse(JSON.stringify(proj)) };
}

export async function updateProject(id: string, data: any) {
  await requireAuth();
  await connectDB();

  const validated = projectSchema.parse(data);
  const updated = await ProjectModel.findByIdAndUpdate(id, validated, { new: true });

  revalidatePath("/");
  if (updated?.slug) {
    revalidatePath(`/projects/${updated.slug}`);
  }
  return { success: true, project: JSON.parse(JSON.stringify(updated)) };
}

export async function deleteProject(id: string) {
  await requireAuth();
  await connectDB();

  await ProjectModel.findByIdAndDelete(id);
  revalidatePath("/");
  return { success: true };
}

export async function toggleProjectPublish(id: string, currentStatus: boolean) {
  await requireAuth();
  await connectDB();

  const updated = await ProjectModel.findByIdAndUpdate(
    id,
    { published: !currentStatus },
    { new: true }
  );

  revalidatePath("/");
  if (updated?.slug) {
    revalidatePath(`/projects/${updated.slug}`);
  }
  return { success: true, published: updated?.published };
}

export async function toggleProjectFeatured(id: string, currentStatus: boolean) {
  await requireAuth();
  await connectDB();

  const updated = await ProjectModel.findByIdAndUpdate(
    id,
    { featured: !currentStatus },
    { new: true }
  );

  revalidatePath("/");
  return { success: true, featured: updated?.featured };
}

// -------------------------------------------------------------
// MESSAGES ACTIONS
// -------------------------------------------------------------

export async function updateMessageStatus(id: string, status: "new" | "read" | "replied") {
  await requireAuth();
  await connectDB();

  await ContactMessageModel.findByIdAndUpdate(id, { status });
  revalidatePath("/admin/messages");
  return { success: true };
}

export async function deleteMessage(id: string) {
  await requireAuth();
  await connectDB();

  await ContactMessageModel.findByIdAndDelete(id);
  revalidatePath("/admin/messages");
  return { success: true };
}

