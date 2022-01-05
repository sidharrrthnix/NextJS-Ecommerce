import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import useForms from "../lib/useForms";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";
import { CURRENT_USER_QUERY } from "./User";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForms({
    email: "",
    password: "",
    name: "",
  });
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup().catch(console.error);
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
      <h2>Sign Up</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - please go ahead and sign in
          </p>
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
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            placeholder="Enter your Name"
            autoComplete="name"
            value={inputs.name}
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
