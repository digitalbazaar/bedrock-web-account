/*!
 * Copyright (c) 2018-2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import axios from 'axios';

const headers = {Accept: 'application/ld+json, application/json'};
/**
 * This service is used to encapsulate all account
 * based activity for a project.
 * @param {Object} [config = {urls: {base: '/accounts'}}]
 * @param {Object} [config.urls = {}]
 * @param {string} [config.urls.base = /accounts]
 */
export class AccountService {
  constructor({
    urls = {
      base: '/accounts'
    }
  } = {}) {
    this.config = {urls};
  }

  /**
   * On 200 exists returns true
   * on error if it is a NotFoundError we return false
   * in all other cases we forward the error to the project.
   * @memberOf AccountService
   * @param {Object} options
   * @param {string} [options.baseUrl = /accounts]
   * @param {string} options.email
   *
   * @return {Boolean} exists
   */
  async exists({baseUrl = this.config.urls.base, email}) {
    try {
      await axios.get(baseUrl, {
        params: {
          exists: true,
          email
        }
      });
      return true;
    } catch(e) {
      // if e has a `NotFound` response return false, otherwise throw error
      const {data = false} = e.response || {};
      if(data && data.type === 'NotFoundError') {
        return false;
      }
      throw e;
    }
  }

  /**
   * Takes a url and an email then creates an account for a user.
   * @memberOf AccountService
   * @param {Object} options
   * @param {string} [options.url = /accounts]
   * @param {string} options.email
   *
   * @return {Object}
   */
  async create({url = this.config.urls.base, email}) {
    const response = await axios.post(url, {email}, {headers});
    return response.data;
  }
  /**
   * Takes a url and an id and finds a single account.
   * @memberOf AccountService
   * @param {Object} options
   * @param {string} [options.baseUrl = /accounts]
   * @param {string} options.id
   *
   * @return {Object} an account
   */
  async get({baseUrl = this.config.urls.base, id}) {
    const response = await axios.get(baseUrl + '/' + id, {headers});
    return response.data;
  }

  /**
   * Returns all accounts that match the given query parameters.
   * @memberOf AccountService
   * @param {Object} options
   * @param {string} [options.baseUrl = /accounts] - The base baseUrl.
   * @param {string} options.email - The user's email.
   * @param {string} [options.after = null] - An account's ID.
   * @param {number} [options.limit = 10] - How many accounts to return.
   *
   * @return {Array} data
   */
  async getAll(
    {baseUrl = this.config.urls.base, email, after = null, limit = 10}) {
    const response = await axios.get(baseUrl, {
      params: {email, after, limit}, headers});
    return response.data;
  }

  /**
   * Updates an account via a series of json patches
   * patches need to be in the:
   *
   * [json patch format]{@link https://tools.ietf.org/html/rfc6902}
   * [we use fast-json]{@link https://www.npmjs.com/package/fast-json-patch}
   * for handling json patches.
   * @memberOf AccountService
   * @param {Object} options
   * @param {string} [options.baseUrl = /accounts]
   * @param {string} options.id - An account's id.
   * @param {number} options.sequence - An account's sequence number.
   * @param {Array<Object>} config.patch - A JSON patch per RFC6902.
   *
   * @return {Void}
   */
  async update({baseUrl = this.config.urls.base, id, sequence, patch}) {
    const patchHeaders = {'Content-Type': 'application/json-patch+json'};
    await axios.patch(
      `${baseUrl}/${id}`, {sequence, patch}, {headers: patchHeaders});
  }

  /**
   * @typedef {"active" | "disabled" | "deleted" } StatusType
   */

  /**
   * Takes an id and a status string then changes an account's status.
   * @memberOf AccountService
   * @param {Object} options
   * @param {string} [options.baseUrl = /accounts]
   * @param {string} options.id - An account id.
   * @param {StatusType} options.status - one of 3 status types
   *
   * @return {Void}
  */
  async setStatus({baseUrl = this.config.urls.base, id, status}) {
    await axios.post(`${baseUrl}/${id}/status`, {status}, {headers});
  }

  /**
   * Takes an account's id and returns all sysRoles for it.
   * @memberOf AccountService
   * @param {Object} options
   * @param {string} [options.baseUrl = /accounts]
   * @param {string} options.id - An account id.
   *
   * @return {Array<Object>}
  */
  async getRoles({baseUrl = this.config.urls.base, id}) {
    const response = await axios.get(`${baseUrl}/${id}/roles`, {headers});
    return response.data;
  }
}
