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
  }) {
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
    const response = await axios.post(url, {email});
    return response.data;
  }

  async get({url = this.config.urls.base, id}) {
    const response = await axios.get(url + '/' + id);
    return response.data;
  }
}
