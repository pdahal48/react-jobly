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

    static async getCompanies() {
      let res = await this.request(`companies`);
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

    static async getJobs() {
        let res = await this.request(`jobs`);
        return res.jobs;
    }
    /** Get detials on a job by its title */

    static async getJob(id) {
        let res = await this.request(`jobs/${id}`);
        return res.job;
    }

    //Users

   /** sign up the user */

//    static async register(userObj) {
//     let res = await this.request(`auth/register`, {
//       username: userObj.username,
//       password: userObj.password,
//       firstName: userObj.firstName,
//       lastName: userObj.lastName,
//       email: userObj.email
//     });
//     return res.user;
// }


static async register(userObj) {
  let res = await this.request(`auth/register`, userObj, "post");
  return res.token;
}

}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
