import gql from 'graphql-tag';

export const todosQuery = gql`
  query TodosQuery {
    todos @rest(type: "todos", path: "/todos", method: "GET") {
      id
      title
      description
    }
  }
`
