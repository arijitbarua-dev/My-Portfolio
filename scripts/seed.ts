import "dotenv/config";
import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import { defaultProfile, defaultSkills, defaultEducation, defaultExperience, defaultProjects } from "../src/data/seedData";
import { ProfileModel } from "../src/models/Profile";
import { SkillModel } from "../src/models/Skill";
import { EducationModel } from "../src/models/Education";
import { ExperienceModel } from "../src/models/Experience";
import { ProjectModel } from "../src/models/Project";
import { ContactMessageModel } from "../src/models/ContactMessage";
import { auth } from "../src/lib/auth";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@portfolio.local";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "AdminPassword123!";

async function runSeed() {
  console.log("=================================================");
  console.log("   EDITORIAL PORTFOLIO // DATABASE SEEDER");
  console.log("=================================================");
  console.log(`Connecting to MongoDB at: ${MONGODB_URI.split("@").pop() || MONGODB_URI}`);

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connection established.");

    // 1. Seed Profile
    await ProfileModel.deleteMany({});
    const profile = await ProfileModel.create(defaultProfile);
    console.log(`✓ Profile document seeded (${profile.name})`);

    // 2. Seed Skills
    await SkillModel.deleteMany({});
    await SkillModel.insertMany(defaultSkills);
    console.log(`✓ ${defaultSkills.length} categorized skills seeded`);

    // 3. Seed Education
    await EducationModel.deleteMany({});
    await EducationModel.insertMany(defaultEducation);
    console.log(`✓ ${defaultEducation.length} education records seeded`);

    // 4. Seed Experience
    await ExperienceModel.deleteMany({});
    await ExperienceModel.insertMany(defaultExperience);
    console.log(`✓ ${defaultExperience.length} professional experience entries seeded`);

    // 5. Seed Projects
    await ProjectModel.deleteMany({});
    await ProjectModel.insertMany(defaultProjects);
    console.log(`✓ ${defaultProjects.length} demo case-study projects seeded`);

    // 6. Clean messages
    await ContactMessageModel.deleteMany({});
    console.log("✓ Contact messages initialized (0 messages)");

    // 7. Seed Admin User via Better-Auth
    console.log(`\nInitializing admin user: ${ADMIN_EMAIL}...`);
    try {
      // Better-Auth server-side sign up
      const adminUser = await auth.api.signUpEmail({
        body: {
          name: "Portfolio Administrator",
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
        },
      });
      console.log(`✓ Admin user created successfully: ${ADMIN_EMAIL}`);
    } catch (err: any) {
      if (err?.message?.includes("already exists") || err?.body?.message?.includes("already exists")) {
        console.log(`ℹ Admin user (${ADMIN_EMAIL}) already exists. Skipping recreation.`);
      } else {
        console.warn(`Admin sign-up note: ${err?.message || "User may already exist or pending init."}`);
      }
    }

    console.log("\n=================================================");
    console.log("   SEED COMPLETE // ALL DATA POPULATED");
    console.log("=================================================");
    console.log(`Admin Email:    ${ADMIN_EMAIL}`);
    console.log(`Admin Password: ${ADMIN_PASSWORD}`);
    console.log("=================================================\n");
  } catch (error) {
    console.error("Seed script failed:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

runSeed();

