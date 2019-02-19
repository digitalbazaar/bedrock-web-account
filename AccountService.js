/*!
 * Copyright (c) 2018 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import axios from 'axios';
const headers = {'Accept': 'application/ld+json, application/json'};
export class AccountService {
  constructor({
    urls = {
      base: '/accounts'
    }
  } = {}) {
    this.config = {urls};
  }

  async exists({url = this.config.urls.base, email}) {
    try {
      await axios.get(url, {
        params: {
          exists: true,
          email
        }
      });
      return true;
    } catch(e) {}
    return false;
  }

  async create({url = this.config.urls.base, email}) {
    const response = await axios.post(url, {email}, {headers});
    return response.data;
  }

  async get({url = this.config.urls.base, id}) {
    const response = await axios.get(url + '/' + id, {headers});
    return response.data;
  }

  /**
   * @method getAll
   * @param {Object} config
   * @param {string} config.url - the base url
   * @param {string} config.email - the user's email
   * @param {string} config.after - an account's DID
   * @param {number} config.limit - how many accounts to return
   * @return {Array} data
   * @description calls on the index route and returns all
   * accounts that match the email passed in.
   */
  async getAll({url = this.config.urls.base, email, after, limit}) {
    const response = await axios.get(url, {
      params: {email, after, limit}, headers});
    return response.data;
  }

  /**
   * @method update
   * @param {Object} config
   * @param {string} config.url
   * @param {string} config.id - an account's id
   * @param {number} config.sequence - an account's sequence number
   * @param {Array<Object>} config.patch - an array of json patches
   * @return {Void}
   * @description updates an account via a series of json patches
   * patches need to be in the:
   * [json patch format]{@link https://tools.ietf.org/html/rfc6902}
   * [we use fast-json]{@link https://www.npmjs.com/package/fast-json-patch}
   * for handling json patches.
   */
  async update({url = this.config.urls.base, id, sequence, patch}) {
    await axios.patch(`${url}/${id}`,
      {sequence, patch}, {headers});
  }

  /**
   * @method setStatus
   * @param {Object} config
   * @param {string} config.url
   * @param {string} config.id - an account id
   * @param {string} config.status - a string that is either active or deleted
   * @return {Void}
   * @description taken an id and a status string changes an account's status
  */
  async setStatus({url = this.config.urls.base, id, status}) {
    await axios.post(`${url}/${id}/status`,
      {status}, {headers});
  }

  /**
   * @method getRoles
   * @param {Object} config
   * @param {string} config.url
   * @param {string} config.id - an account id
   * @return {Array<Object>}
   * @description takes an id and returns all sysRoles for it.
  */
  async getRoles({url = this.config.urls.base, id}) {
    const response = await axios.get(`${url}/${id}/roles`, {headers});
    return response.data;
  }
}
