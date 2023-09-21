/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {AccountService} from './AccountService.js';
import {httpClient} from '@digitalbazaar/http-client';
import pDebounce from 'p-debounce';

export class RegisterController {
  /**
   * Encapsulates the registration methods.
   *
   * @param {object} options - The options to use.
   * @param {number} [options.debounceExists = 500] - DebounceExists.
   * @param {object} [options.accountServiceConfig = {}] - AccountServiceConfig.
   */
  constructor({debounceExists = 500, accountServiceConfig = {}} = {}) {
    this.state = {
      registering: false,
      checkingExistence: false,
      email: null,
      token: null
      // phoneNumber: null
    };
    this.accountService = new AccountService(accountServiceConfig);
    this.debounceExists = debounceExists;
  }

  /**
   * Exists is a debounced method used to check if an email already exists
   * during registration.
   *
   * @returns {Promise<boolean>} - Exists.
   */
  async exists() {
    this.state.checkingExistence = true;

    if(!this._debounceExists) {
      this._debounceExists = pDebounce(async () => {
        let exists = false;
        const email = this.state.email.toLowerCase();
        try {
          exists = await this.accountService.exists({
            email,
            // phoneNumber: this.state.phoneNumber
          });
        } finally {
          this.state.checkingExisting = false;
        }
        return exists;
      }, this.debounceExists);
    }

    return this._debounceExists();
  }

  /**
   * Registers a user then sets registering to false.
   *
   * @returns {Promise<object>} - Result.
   */
  async register() {
    const email = this.state.email.toLowerCase();
    this.state.registering = true;
    const token = this.state.token;

    if(token) {
      await _verifyTurnstileToken({token});
    }

    try {
      const result = await this.accountService.create({
        email,
        // phoneNumber: this.state.phoneNumber
      });
      return result;
    } finally {
      this.state.registering = false;
    }
  }
}

async function _verifyTurnstileToken({token}) {
  // dummy secret key, load actual key from config
  const SECRET_KEY = '1x0000000000000000000000000000000AA';
  // TODO: load url from config
  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  const payload = {
    secret: SECRET_KEY,
    response: token,
    // how to get remoteIP?
    remoteip: ''
  };
  try {
    const result = await httpClient.post(url, payload);
    if(result.data.success) {
      // captcha was successful, do nothing
      return;
    } else {
      // what error to throw?
      throw new Error('Turnstile token not validated.');
    }
  } catch(e) {
    // what do we do if there is an error with the turnstile call itself?
    console.dir(e);
  }
}
