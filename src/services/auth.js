import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    // Validate environment variables
    if (!import.meta.env.VITE_APPWRITE_URL) {
      console.error("VITE_APPWRITE_URL is not set in environment variables");
    }
    if (!import.meta.env.VITE_APPWRITE_PROJECT_ID) {
      console.error(
        "VITE_APPWRITE_PROJECT_ID is not set in environment variables"
      );
    }

    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // Create session and return user data
        const session = await this.login({ email, password });
        if (session) {
          // Try to get user data immediately after session creation
          try {
            const userData = await this.account.get();
            return userData;
          } catch (error) {
            // If getCurrentUser fails, return the session info
            return session;
          }
        }
      }
      return userAccount;
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      // Check if it's an authentication error (user not logged in)
      if (
        error.code === 401 ||
        error.message.includes("missing scope (account)") ||
        error.message.includes("unauthorized")
      ) {
        // User is not authenticated, return null silently
        console.log("User not authenticated");
        return null;
      }

      // Handle network/configuration errors
      if (error.message.includes("Failed to fetch")) {
        console.error(
          "Appwrite service :: Network error - Check your configuration:"
        );
        console.error(
          "- VITE_APPWRITE_URL:",
          import.meta.env.VITE_APPWRITE_URL
        );
        console.error(
          "- VITE_APPWRITE_PROJECT_ID:",
          import.meta.env.VITE_APPWRITE_PROJECT_ID
        );
        console.error(
          "- Make sure your Appwrite service is running and accessible"
        );
        return null;
      }

      // For other unexpected errors, log and return null
      console.error(
        "Appwrite service :: getCurrentUser :: unexpected error",
        error
      );
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const auth = new AuthService();

export default auth;
