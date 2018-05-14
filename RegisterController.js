/*!
 * Copyright (c) 2018 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {AccountService} from './AccountService.js';

export class RegisterController {
  constructor(config = {}) {
    this.state = {
      loading: false,
      email: null,
      // phoneNumber: null
    };
    this.accountService = new AccountService(config);
  }

  async exists() {
    this.state.loading = true;
    let exists = false;

    try {
      exists = await this.accountService.exists({
        email: this.state.email,
        // phoneNumber: this.state.phoneNumber
      });
    } finally {
      this.state.loading = false;
    }

    return exists;
  }

  async register() {
    this.state.loading = true;

    try {
      const result = await this.accountService.create({
        email: this.state.email,
        // phoneNumber: this.state.phoneNumber
      });
      console.log('create result', result);

      // TODO:
    } finally {
      this.state.loading = false;
    }
  }
}
