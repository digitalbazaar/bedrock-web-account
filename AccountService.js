/*!
 * Copyright (c) 2018-2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import axios from 'axios';

const headers = {Accept: 'application/ld+json, application/json'};

export class AccountService {
  constructor({
    urls = {
      base: '/accounts'
    }
  } = {}) {
    this.config = {urls};
  }

  /**
  * @method exists
  * @param {Object} options
  * @param {String} options.baseUrl
  * @param {String} options.email
  * @return {Boolean} exists
  * @description the api retruns 404 if the user does not exist
  * if the request is succesfull returns true
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

  async create({url = this.config.urls.base, email}) {
    const response = await axios.post(url, {email}, {headers});
    return response.data;
  }

  async get({baseUrl = this.config.urls.base, id}) {
    const response = await axios.get(baseUrl + '/' + id, {headers});
    return response.data;
  }

  /**
   * @method getAll
   * @param {Object} options
   * @param {string} options.baseUrl - the base baseUrl
   * @param {string} options.email - the user's email
   * @param {string} options.after - an account's ID
   * @param {number} options.limit - how many accounts to return
   * @return {Array} data
   * @description returns all accounts that match the given query parameters.
   */
  async getAll({baseUrl = this.config.urls.base, email, after, limit}) {
    const response = await axios.get(baseUrl, {
      params: {email, after, limit}, headers});
    return response.data;
  }

  /**
   * @method update
   * @param {Object} options
   * @param {string} options.baseUrl
   * @param {string} options.id - an account's id
   * @param {number} options.sequence - an account's sequence number
   * @param {Array<Object>} options.patch - a JSON patch per RFC6902
   * @return {Void}
   * @description updates an account via a json patch as specified by:
   * [json patch format]{@link https://tools.ietf.org/html/rfc6902}
   * [we use fast-json]{@link https://www.npmjs.com/package/fast-json-patch}
   * to apply json patches.
   */
  async update({baseUrl = this.config.urls.base, id, sequence, patch}) {
    const patchHeaders = {'Content-Type': 'application/json-patch+json'};
    await axios.patch(
      `${baseUrl}/${id}`, {sequence, patch}, {headers: patchHeaders});
  }

  /**
   * @method setStatus
   * @param {Object} options
   * @param {string} options.baseUrl
   * @param {string} options.id - an account id
   * @param {string} options.status - a string that is either active or deleted
   * @return {Void}
   * @description changes an account's status to the given status.
  */
  async setStatus({baseUrl = this.config.urls.base, id, status}) {
    await axios.post(`${baseUrl}/${id}/status`, {status}, {headers});
  }

  /**
   * @method getRoles
   * @param {Object} options
   * @param {string} options.baseUrl
   * @param {string} options.id - an account id
   * @return {Array<Object>}
   * @description returns all roles associated with an account.
  */
  async getRoles({baseUrl = this.config.urls.base, id}) {
    const response = await axios.get(`${baseUrl}/${id}/roles`, {headers});
    return response.data;
  }
}
