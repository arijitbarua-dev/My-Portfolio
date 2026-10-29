import {
  defaultProfile,
  defaultSkills,
  defaultEducation,
  defaultExperience,
  defaultProjects,
} from "@/data/seedData";
import { Profile, Skill, Education, Experience, Project } from "@/types";

export async function getProfile(): Promise<Profile> {
  return defaultProfile;
}

export async function getSkills(category?: string): Promise<Skill[]> {
  if (category) {
    return defaultSkills.filter(
      (s) => s.category.toLowerCase() === category.toLowerCase()
    );
  }
  return defaultSkills;
}

export async function getEducation(): Promise<Education[]> {
  return defaultEducation;
}

export async function getExperience(): Promise<Experience[]> {
  return defaultExperience;
}

export async function getPublishedProjects(): Promise<Project[]> {
  return defaultProjects.filter((p) => p.published);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return defaultProjects.filter((p) => p.published && p.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const project = defaultProjects.find((p) => p.slug === slug && p.published);
  return project || null;
}

export async function getRelatedProjects(
  currentSlug: string,
  limit: number = 3
): Promise<Project[]> {
  return defaultProjects
    .filter((p) => p.slug !== currentSlug && p.published)
    .slice(0, limit);
}
