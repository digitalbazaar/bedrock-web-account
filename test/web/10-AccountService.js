/*!
 * Copyright (c) 2019-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {AccountService} from '@bedrock/web-account';

const accountService = new AccountService();

describe('AccountService', () => {
  describe('create', () => {
    it('fails to create an account with no email', async () => {
      let result;
      let err;
      try {
        result = await accountService.create();
      } catch(e) {
        err = e;
      }
      should.not.exist(result);
      should.exist(err);
    });
  }); // end create
});
