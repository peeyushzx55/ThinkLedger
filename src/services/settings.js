import config from "../config/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("Error fetching post:", error);
      
      // Handle specific error cases
      if (error.code === 404 || error.message.includes("not found")) {
        throw new Error("Post not found");
      }
      
      if (error.code === 401 || error.message.includes("unauthorized")) {
        throw new Error("Authentication required to view this post");
      }
      
      if (error.message.includes("Failed to fetch")) {
        throw new Error("Network error - Check your connection");
      }
      
      // Re-throw the original error for other cases
      throw error;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      // Handle authentication errors
      if (error.code === 401 || error.message.includes("unauthorized")) {
        console.error("Authentication required to fetch posts");
        throw new Error("Authentication required to fetch posts");
      }

      // Handle network/configuration errors
      if (error.message.includes("Failed to fetch")) {
        console.error("Network error - Check your Appwrite configuration");
        throw new Error("Network error - Check your Appwrite configuration");
      }

      // Handle other errors
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

  // file/storage services

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      throw error;
    }
  }

  getFilePreview(fileId) {
    if (!fileId) {
      console.log("File ID is missing");
      throw new Error("File ID is required");
    }
    
    console.log("Getting file preview for ID:", fileId);
    
    try {
      const url = this.bucket.getFileView(config.appwriteBucketId, fileId);
      console.log("Generated URL:", url);
      return url;
    } catch (error) {
      console.error("Error getting file preview:", error);
      // Return a placeholder if the file view fails
      return null;
    }
  }
}

const service = new Service();

export default service;
