/*!
 * Copyright (c) 2018 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {AccountService} from './AccountService.js';
import debounce from 'debounce-promise';

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

  async exists() {
    this.state.checkingExistence = true;

    if(!this._debounceExists) {
      this._debounceExists = debounce(async () => {
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

  async register() {
    this.state.registering = true;

    try {
      const result = await this.accountService.create({
        email: this.state.email,
        // phoneNumber: this.state.phoneNumber
      });
      console.log('create result', result);

      // TODO:
    } finally {
      this.state.registering = false;
    }
  }
}
