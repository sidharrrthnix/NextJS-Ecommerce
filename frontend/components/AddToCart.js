import { gql, useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";
const ADD_TO_CART = gql`
  mutation ADD_TO_CART($id: ID!) {
    addToCart(productId: $id) {
      id
      quantity
    }
  }
`;

export default function AddToCart({ id }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button disabled={loading} type="button" onClick={addToCart}>
      Add{loading && "ing"} To Cart 🛒
    </button>
  );
}
