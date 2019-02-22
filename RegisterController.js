/*!
 * Copyright (c) 2018 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {AccountService} from './AccountService.js';
import pDebounce from 'p-debounce';

/**
 * Encapsulates the registration methods.
 * @param {Object} options
 * @param {number} [options.debounceExists = 500]
 * @param {Object} [options.accountServiceConfig = {}]
 */
export class RegisterController {
  constructor({debounceExists = 500, accountServiceConfig = {}} = {}) {
    this.state = {
      registering: false,
      checkingExistence: false,
      email: null,
      // phoneNumber: null
    };
    this.accountService = new AccountService(accountServiceConfig);
    this.debounceExists = debounceExists;
  }
  /**
   * Exists is a debounced method used to check if an email already exists
   * during registration.
   * @memberOf RegisterController
   */
  async exists() {
    this.state.checkingExistence = true;

    if(!this._debounceExists) {
      this._debounceExists = pDebounce(async () => {
        let exists = false;
        try {
          exists = await this.accountService.exists({
            email: this.state.email,
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
   * @memberOf RegisterController
   */
  async register() {
    this.state.registering = true;

    try {
      const result = await this.accountService.create({
        email: this.state.email,
        // phoneNumber: this.state.phoneNumber
      });
      return result;
    } finally {
      this.state.registering = false;
    }
  }
}
