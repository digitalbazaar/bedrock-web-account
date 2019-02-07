/*!
 * Copyright (c) 2018 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import axios from 'axios';

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
    const response = await axios.post(url, {email}, {
      headers: {'Accept': 'application/ld+json, application/json'}
    });
    return response.data;
  }

  async get({url = this.config.urls.base, id}) {
    const response = await axios.get(url + '/' + id, {
      headers: {'Accept': 'application/ld+json, application/json'}
    });
    return response.data;
  }

  /**
   * @method accounts
   * @param {Object} config
   * @return {Array} data
   * @description calls on the adminr route and returns all
   * accounts that match the email passed in.
   * the cursor should be an account's DID
   * and the limit is number.
   */
  async accounts({url = this.config.urls.base, email, cursor, limit}) {
    const response = await axios.get(url + '/admin', {
      params: {email, cursor, limit},
      headers: {'Accept': 'application/ld+json, application/json'}
    });
    return response.data;
  }

  /**
   * @method update
   * @param {Object} config
   * @return {Void}
   * @description id is an account's DID,
   * sequence is an integer
   * patch is an array of json-patches
   */
  async update({url = this.config.urls.base, id, sequence, patch}) {
    await axios.patch(`${url}/${id}`,
      {sequence, patch},
      {headers: {'Accept': 'application/ld+json, application/json'}});
  }

  /**
   * @method setStatus
   * @param {Object} config
   * @return {Void}
   * @description taken an id and a status string
   * patches an account's status
  */
  async setStatus({url = this.config.urls.base, id, status}) {
    await axios.patch(`${url}/${id}/status`,
      {status},
      {headers: {'Accept': 'application/ld+json, application/json'}});
  }
  /**
   * @method getCaps
   * @param {Object} config
   * @return {Void}
   * @description takes an id and returns all caps for it.
  */
  async getCaps({url = this.config.urls.base, id}) {
    const response = await axios.get(`${url}/${id}/caps`,
      {headers: {'Accept': 'application/ld+json, application/json'}});
    return response.data;
  }
}
