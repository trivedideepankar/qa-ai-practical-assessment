const { page, request, expect } = require("@playwright/test");
import { _Response } from "../testdata/commonAPIResponse";
const getCurl = require("./requestToCurlLogger");

class commonMethods {
  constructor() { }

  // Use this method to fetch get response
  GetResponse = async (endPoint, headers) => {
    const baseURL = process.env.URL?.replace(/\/?$/, "/");
    let context = await request.newContext({
      baseURL,
    });
    const response = await context.get(endPoint, {
      headers: headers,
    });
    getCurl.logApiRequest("GET", endPoint, headers);
    return response;
  };

  // Use this method to fetch post response
  PostResponse = async (endPoint, payload, headers) => {
    const baseURL = process.env.URL?.replace(/\/?$/, "/");
    let context = await request.newContext({
      baseURL,
    });
    const response = await context.post(endPoint, {
      headers: headers,
      data: payload,
    });

    getCurl.logApiRequest("POST", endPoint, headers, payload);
    return response;
  };

  // Use this method to fetch put response
  PutResponse = async (endPoint, headers, payload) => {
    const baseURL = process.env.URL?.replace(/\/?$/, "/");
    let context = await request.newContext({
      baseURL,
    });
    const response = await context.put(endPoint, {
      headers: headers,
      data: payload,
    });

    getCurl.logApiRequest("PUT", endPoint, headers, payload);
    return response;
  };

  // Use this method to fetch patch response
  PatchResponse = async (endPoint, headers, payload) => {
    const baseURL = process.env.URL?.replace(/\/?$/, "/");
    let context = await request.newContext({
      baseURL,
    });
    const response = await context.patch(endPoint, {
      headers: headers,
      data: payload,
    });
    getCurl.logApiRequest("PATCH", endPoint, headers, payload);
    return response;
  };

  // Use this method to fetch delete response
  DeleteResponse = async (endPoint, headers, payload) => {
    const baseURL = process.env.URL?.replace(/\/?$/, "/");
    let context = await request.newContext({
      baseURL,
    });
    const response = await context.delete(endPoint, {
      headers: headers,
      data: payload,
    });

    getCurl.logApiRequest("DELETE", endPoint, headers, payload);
    return response;
  };
}

module.exports = { commonMethods };
