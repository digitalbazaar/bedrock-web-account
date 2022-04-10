/*!
 * Copyright (c) 2019-2022 Digital Bazaar, Inc. All rights reserved.
 */
import * as bedrock from '@bedrock/core';
import {passport} from '@bedrock/passport';
import '@bedrock/security-context';
import '@bedrock/account';
import '@bedrock/account-http';
import '@bedrock/express';
import '@bedrock/https-agent';
import '@bedrock/mongodb';

_stubPassport();

import '@bedrock/test';
import '@bedrock/karma';

bedrock.start();

function _stubPassport() {
  const original = passport.authenticate;
  passport._original = original;

  passport.authenticate = (strategyName, options, callback) => {
    // eslint-disable-next-line no-unused-vars
    return async function(req, res, next) {
      req._sessionManager = passport._sm;
      req.isAuthenticated = req.isAuthenticated || (() => !!req.user);
      req.login = (user, callback) => {
        req._sessionManager.logIn(req, user, function(err) {
          if(err) {
            req.user = null;
            return callback(err);
          }
          callback();
        });
      };
      let user = false;
      try {
        user = {account: {id: 'test'}};
      } catch(e) {
        return callback(e);
      }
      callback(null, user);
    };
  };

  return {
    restore() {
      passport.authenticate = passport._original;
    }
  };
}
