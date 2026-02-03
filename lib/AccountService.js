/*!
 * Copyright (c) 2018-2023 Digital Bazaar, Inc. All rights reserved.
 */
import {httpClient} from '@digitalbazaar/http-client';

export class AccountService {
  /**
   * This service is used to encapsulate all account
   * based activity for a project.
   *
   * @param {object} [config = {urls: {base: '/accounts'}}] - The config to use.
   * @param {object} [config.urls = {}] - The urls to use.
   */
  constructor({
    urls = {
      base: '/accounts'
    }
  } = {}) {
    this.config = {urls};
  }

  /**
   * On 200 exists returns true.
   * On error if it is a NotFoundError we return false.
   * In all other cases we forward the error to the project.
   *
   * @param {object} options - The options to use.
   * @param {string} [options.baseUrl = /accounts] - The base baseUrl.
   * @param {string} options.email - The user's email.
   *
   * @returns {Promise<boolean>} - Exists.
   */
  async exists({baseUrl = this.config.urls.base, email}) {
    try {
      await httpClient.get(baseUrl, {
        searchParams: {
          exists: true,
          email
        }
      });
      return true;
    } catch(e) {
      // if error is `NotFoundError`; return false, otherwise throw error
      const {data} = e;
      if(data && data.type === 'NotFoundError') {
        return false;
      }
      throw e;
    }
  }

  /**
   * Takes a url and an email then creates an account for a user.
   *
   * @param {object} options - The options to use.
   * @param {string} [options.url = /accounts] - The base baseUrl.
   * @param {string} options.email - The user's email.
   * @param {string} [options.authorization] - An optional captcha
   *  authorization with token.
   *
   * @returns {Promise<object>} - Data.
   */
  async create({url = this.config.urls.base, email, authorization} = {}) {
    const response = await httpClient.post(url, {json: {email, authorization}});
    return response.data;
  }

  /**
   * Takes a url and an id and finds a single account.
   *
   * @param {object} options - The options to use.
   * @param {string} [options.baseUrl = /accounts] - The base baseUrl.
   * @param {string} options.id - An account's id.
   *
   * @returns {Promise<object>} - An account.
   */
  async get({baseUrl = this.config.urls.base, id}) {
    const response = await httpClient.get(baseUrl + '/' + id);
    return response.data;
  }

  /**
   * Returns all accounts that match the given query parameters.
   *
   * @param {object} options - The options to use.
   * @param {string} [options.baseUrl = /accounts] - The base baseUrl.
   * @param {string} options.email - The user's email.
   * @param {string} [options.after = null] - An account's ID.
   * @param {number} [options.limit = 10] - How many accounts to return.
   *
   * @returns {Promise<Array>} - Data.
   */
  async getAll(
    {baseUrl = this.config.urls.base, email, after = null, limit = 10}) {
    const response = await httpClient.get(
      baseUrl, {searchParams: {email, after, limit}});
    return response.data;
  }

  /**
   * Updates an account via an overwrite (`id` must not change` and an
   * existing sequence number).
   *
   * @param {object} options - The options to use.
   * @param {string} [options.baseUrl = /accounts] - The base baseUrl.
   * @param {number} options.sequence - An account's sequence number.
   * @param {object} options.account - The new account.
   */
  async update({baseUrl = this.config.urls.base, sequence, account}) {
    const {id} = account;
    await httpClient.post(
      `${baseUrl}/${id}`, {json: {sequence, account}});
  }

  /**
   * @typedef {"active" | "disabled" | "deleted" } StatusType
   */

  /**
   * Takes an id and a status string then changes an account's status.
   *
   * @param {object} options - The options to use.
   * @param {string} [options.baseUrl = /accounts] - The base baseUrl.
   * @param {string} options.id - An account id.
   * @param {StatusType} options.status - One of 3 status types.
  */
  async setStatus({baseUrl = this.config.urls.base, id, status}) {
    await httpClient.post(`${baseUrl}/${id}/status`, {json: {status}});
  }

  /**
   * Creates meters for products in productIds array.
   *
   * @param {object} options - The options to use.
   * @param {string} [options.baseUrl = /accounts] - The base baseUrl.
   * @param {string} options.action - Action to perform.
   * @param {Array} options.productIds - Product IDs that need meters.
   * @param {object} options.account - The new account.
   *
   * @returns {Promise<Array>} - Data.
   */
  async createMeters({
    baseUrl = this.config.urls.base, account, action = 'create', productIds = []
  }) {
    const url = `${baseUrl}/${account.id}/meters`;
    return httpClient.post(url, {json: {action, productIds}});
  }
}
