import conf from "../conf/conf";

import { Client, Account, ID, Permission, Role  } from "appwrite";
const sdk = require("node-appwrite");

export class AuthService {
  client = new Client();

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectID);
    this.account = new Account(this.client);
    this.users = new sdk.Users(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
        [Permission.read(Role.any())]
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async createSmsAccount({ phone }) {
    // input phonenumber
    try {
      await this.account.createPhoneToken(ID.unique(), phone);
    } catch (error) {
      console.log(error);
    }
  }

  async smsLogin({ userId, secret }) {
    return await this.account.updatePhoneSession(userId, secret);
  }
  //acc exist or not
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async getUserbyID(userID) {
    try {
      return await this.users.get(userID);  
    } catch (error) {
      console.log(error);
    }
  }
  async logout() {
    try {
      console.log("log out");
      return await this.account.deleteSession("current");
    } catch (error) {
      console.log(error);
    }
  }
}

const authService = new AuthService();
export default authService;
