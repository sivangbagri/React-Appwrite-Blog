import conf from "../conf/conf";

import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
    author,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabaseID,
        conf.appWriteBlogsCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userID: userId,
          author,
          createdAt: new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date()),
        }
      );
    } catch (error) {
      alert("Appwrite serive :: createPost :: error", error);
    }
  }
  async createUserData(userID, lineData) {
    console.log("userID ", userID);
    console.log("lineData ", lineData);
    try {
      const isPresent = await this.databases.getDocument(
        conf.appWriteDatabaseID,
        conf.appWriteUsersCollectionID,
        userID
      );
      if (!isPresent) {
        return await this.databases.createDocument(
          conf.appWriteDatabaseID,
          conf.appWriteUsersCollectionID,
          userID,
          {
            lines: [JSON.stringify(lineData)],
          }
        );
      } else {
        console.log("exist : ", isPresent);
        isPresent.lines.push(JSON.stringify(lineData));
        const new_lines = isPresent.lines;
        return await this.databases.updateDocument(
          conf.appWriteDatabaseID,
          conf.appWriteUsersCollectionID,
          userID,
          {
            lines: new_lines,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getUserData(userID,attribute) {
    const doc= await this.databases.getDocument(
      conf.appWriteDatabaseID,
      conf.appWriteUsersCollectionID,
      userID
    );
    
    if(attribute==="lines"){
      return doc.lines
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabaseID,
        conf.appWriteBlogsCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appWriteDatabaseID,
        conf.appWriteBlogsCollectionID,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async getPost(slug) {
    console.log("getpost", slug);
    try {
      return await this.databases.getDocument(
        conf.appWriteDatabaseID,
        conf.appWriteBlogsCollectionID,
        slug
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  // query
  // indexes are mandatory for query
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabaseID,
        conf.appWriteBlogsCollectionID,
        queries
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // FILE UPLOAD SERVICES
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appWriteBucketID, fileId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appWriteBucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appWriteBucketID, fileId);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const service = new Service();

export default service;
