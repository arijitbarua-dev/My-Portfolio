import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientInstance: MongoClient | undefined;
}

let client: MongoClient;
if (process.env.NODE_ENV === "production") {
  client = new MongoClient(MONGODB_URI);
} else {
  if (!global._mongoClientInstance) {
    global._mongoClientInstance = new MongoClient(MONGODB_URI);
  }
  client = global._mongoClientInstance;
}

const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "editorial_portfolio_dev_secret_key_32_chars_min_length_123",
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000",
});

