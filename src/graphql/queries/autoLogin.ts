import gql from 'graphql-tag';

export const autoLogin = gql`
  query AutoLoginQuery {
    autoLogin (input: {
        email: "tony@stark.com",
        password: "password"
      }) @rest(type: "Login", path: "/auth/login", method: "POST") {
        auth_token
    }
  }
`
