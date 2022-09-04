
import gql from 'graphql-tag';

export const deleteTodosItem = gql`
  mutation DeleteTodosItemMutation($todo_id: String!, $id: String) {
    deleteTodosItem (
      todo_id: $todo_id,
      id: $id,
    ) @rest(type: "DeleteTodosItem", path: "/todos/{args.todo_id}/items/{args.id}", method: "DELETE") {
      id
    }
  }
`
