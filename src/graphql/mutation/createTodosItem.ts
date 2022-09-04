
import gql from 'graphql-tag';

export const createTodosItem = gql`
  mutation CreateTodosItemMutation($todo_id: String!, $name: String, $progress_percentage: Int) {
    createTodosItem (
      todo_id: $todo_id,
      input: {
        name: $name,
        progress_percentage: $progress_percentage,
      }) @rest(type: "CreateTodosItem", path: "/todos/{args.todo_id}/items", method: "POST") {
        id
    }
  }
`
