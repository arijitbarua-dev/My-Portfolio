import { connectDB } from "@/lib/mongodb";
import { ProfileModel } from "@/models/Profile";
import { SkillModel } from "@/models/Skill";
import { EducationModel } from "@/models/Education";
import { ExperienceModel } from "@/models/Experience";
import { ProjectModel } from "@/models/Project";
import { ContactMessageModel } from "@/models/ContactMessage";
import {
  defaultProfile,
  defaultSkills,
  defaultEducation,
  defaultExperience,
  defaultProjects,
} from "@/data/seedData";
import { Profile, Skill, Education, Experience, Project } from "@/types";

function serializeDoc<T>(doc: any): T {
  if (!doc) return doc;
  const json = doc.toObject ? doc.toObject() : doc;
  return JSON.parse(JSON.stringify(json));
}

export async function getProfile(): Promise<Profile> {
  try {
    await connectDB();
    const profile = await ProfileModel.findOne().lean();
    if (profile) return serializeDoc<Profile>(profile);
  } catch (error) {
    console.warn("MongoDB unavailable or empty. Serving fallback profile.", error);
  }
  return defaultProfile;
}

export async function getSkills(category?: string): Promise<Skill[]> {
  try {
    await connectDB();
    const query = category ? { category } : {};
    const skills = await SkillModel.find(query).sort({ displayOrder: 1 }).lean();
    if (skills && skills.length > 0) {
      return serializeDoc<Skill[]>(skills);
    }
  } catch (error) {
    console.warn("MongoDB unavailable. Serving fallback skills.", error);
  }
  return category
    ? defaultSkills.filter((s) => s.category.toLowerCase() === category.toLowerCase())
    : defaultSkills;
}

export async function getEducation(): Promise<Education[]> {
  try {
    await connectDB();
    const education = await EducationModel.find().sort({ displayOrder: 1 }).lean();
    if (education && education.length > 0) {
      return serializeDoc<Education[]>(education);
    }
  } catch (error) {
    console.warn("MongoDB unavailable. Serving fallback education.", error);
  }
  return defaultEducation;
}

export async function getExperience(): Promise<Experience[]> {
  try {
    await connectDB();
    const experience = await ExperienceModel.find().sort({ displayOrder: 1 }).lean();
    if (experience && experience.length > 0) {
      return serializeDoc<Experience[]>(experience);
    }
  } catch (error) {
    console.warn("MongoDB unavailable. Serving fallback experience.", error);
  }
  return defaultExperience;
}

export async function getPublishedProjects(): Promise<Project[]> {
  try {
    await connectDB();
    const projects = await ProjectModel.find({ published: true })
      .sort({ displayOrder: 1 })
      .lean();
    if (projects && projects.length > 0) {
      return serializeDoc<Project[]>(projects);
    }
  } catch (error) {
    console.warn("MongoDB unavailable. Serving fallback projects.", error);
  }
  return defaultProjects;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    await connectDB();
    const projects = await ProjectModel.find({ published: true, featured: true })
      .sort({ displayOrder: 1 })
      .lean();
    if (projects && projects.length > 0) {
      return serializeDoc<Project[]>(projects);
    }
  } catch (error) {
    console.warn("MongoDB unavailable. Serving fallback featured projects.", error);
  }
  return defaultProjects.filter((p) => p.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    await connectDB();
    const project = await ProjectModel.findOne({ slug, published: true }).lean();
    if (project) return serializeDoc<Project>(project);
  } catch (error) {
    console.warn(`MongoDB unavailable. Searching fallback project: ${slug}`, error);
  }
  const fallback = defaultProjects.find((p) => p.slug === slug);
  return fallback || null;
}

export async function getRelatedProjects(
  currentSlug: string,
  limit: number = 3
): Promise<Project[]> {
  try {
    await connectDB();
    const related = await ProjectModel.find({
      slug: { $ne: currentSlug },
      published: true,
    })
      .limit(limit)
      .lean();
    if (related && related.length > 0) {
      return serializeDoc<Project[]>(related);
    }
  } catch (error) {
    console.warn("MongoDB unavailable. Serving fallback related projects.", error);
  }
  return defaultProjects.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

export async function getAdminCounts() {
  try {
    await connectDB();
    const [skillsCount, educationCount, experienceCount, projectsCount, messagesCount] =
      await Promise.all([
        SkillModel.countDocuments(),
        EducationModel.countDocuments(),
        ExperienceModel.countDocuments(),
        ProjectModel.countDocuments(),
        ContactMessageModel.countDocuments({ status: "new" }),
      ]);
    return {
      skillsCount,
      educationCount,
      experienceCount,
      projectsCount,
      newMessagesCount: messagesCount,
    };
  } catch (error) {
    console.warn("MongoDB unavailable for admin counts.", error);
    return {
      skillsCount: defaultSkills.length,
      educationCount: defaultEducation.length,
      experienceCount: defaultExperience.length,
      projectsCount: defaultProjects.length,
      newMessagesCount: 0,
    };
  }
}

