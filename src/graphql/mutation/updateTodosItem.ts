
import gql from 'graphql-tag';

export const updateTodosItem = gql`
  mutation UpdateTodosItemMutation($id: String!, $todo_id: String!, $name: String, $progress_percentage: Int, $target_todo_id: String) {
    updateTodosItem (
      id: $id,
      todo_id: $todo_id,
      input: {
        name: $name,
        progress_percentage: $progress_percentage,
        target_todo_id: $target_todo_id
      }) @rest(type: "UpdateTodosItem", path: "/todos/{args.todo_id}/items/{args.id}", method: "PATCH") {
        id
    }
  }
`
