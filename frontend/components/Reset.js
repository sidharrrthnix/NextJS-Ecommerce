import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import useForms from "../lib/useForms";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";
import { CURRENT_USER_QUERY } from "./User";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForms({
    email: "",
    password: "",
    token,
  });
  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const errorGQL = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await reset().catch(console.error);
    console.log(res);
    resetForm();
  };
  //   const error =
  //     data?.authenticateUserWithPassword.__typename ===
  //     "UserAuthenticationWithPasswordFailure"
  //       ? data?.authenticateUserWithPassword
  //       : undefined;
  console.log(data);
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Password Reset Page</h2>
      <DisplayError error={error || errorGQL} />
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! check your password has been changed!</p>
        )}
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

        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}
