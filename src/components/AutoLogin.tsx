import React from 'react';
import { useQuery } from '@apollo/client';

import cookie from '../helpers/cookie';
import { autoLogin } from '../graphql/queries/autoLogin';

export interface AutoLoginProps {
  children: any;
}

export default function AutoLogin(props: AutoLoginProps) {
  const { children } = props || {};

  useQuery(autoLogin, {
    onCompleted: ({ autoLogin }) => {
      cookie.set('access_token', autoLogin.auth_token)
    }
  })

  return (
    <>
      {
        cookie.get('access_token') ? (
          children
        ) : (
          ''
        )
      }
    </>
  )
}
