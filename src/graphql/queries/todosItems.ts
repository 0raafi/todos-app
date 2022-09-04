import gql from 'graphql-tag';

export const todosItemsQuery = gql`
  query TodosItemsQuery($todo_id: String!) {
    todosItems(todo_id: $todo_id) @rest(type: "todosItems", path: "/todos/{args.todo_id}/items", method: "GET") {
      id
      name
      done
      todo_id
      progress_percentage
    }
  }
`
