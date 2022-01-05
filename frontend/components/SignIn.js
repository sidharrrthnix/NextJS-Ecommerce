import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import useForms from "../lib/useForms";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";
import { CURRENT_USER_QUERY } from "./User";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForms({
    email: "",
    password: "",
  });
  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin();
    resetForm();
  };
  const error =
    data?.authenticateUserWithPassword.__typename ===
    "UserAuthenticationWithPasswordFailure"
      ? data?.authenticateUserWithPassword
      : undefined;
  console.log(data);
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <DisplayError error={data?.authenticateUserWithPassword} />
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Enter your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  );
}
