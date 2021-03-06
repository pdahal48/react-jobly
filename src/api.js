import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

export class JoblyApi {
  // the token to interact with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

    /** Get list of all companies in the database */

    static async getCompanies(name) {
      let res = await this.request("companies", { name });
      return res.companies;
    }
    // Get all matching companies from the database
    static async findCompanies(obj) {
      let res = await this.request(`companies`, {
        name: obj.searchBox
      });
      return res;
    }
      // Get all matching jobs from the database
    static async findJobs(obj) {
      let res = await this.request(`jobs`, {
        title: obj.searchBox
      });
      return res;
    }


    /** Get list of all jobs in the database */

    static async getJobs(title) {
      let res = await this.request("jobs", { title });
      return res.jobs;
    }
    /** Get detials on a job by its title */

    static async getJob(id) {
        let res = await this.request(`jobs/${id}`);
        return res.job;
    }


    /** Apply to a job */

  static async applyToJob(username, id) {
    await this.request(`users/${username}/jobs/${id}`, {}, "post");
  }

    //Users

   /** sign up the user */

static async signup(userObj) {
  try {
    let res = await this.request(`auth/register`, userObj, "post");
    return res.token;
  } catch(e) {
      return new Error(e);
  }
}

   /** Logs in the user */

   static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }


    /** PUlls user info */

    static async get(username) {
      try {
        let res = await this.request(`users/${username}`);
        return res;
      } catch(e) {
          return new Error(e);
      }
    }

    /** Save user profile page. */

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}
