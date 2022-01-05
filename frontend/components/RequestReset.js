import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import useForms from "../lib/useForms";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";
import { CURRENT_USER_QUERY } from "./User";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForms({
    email: "",
  });
  const [reset, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );
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
      <h2>Password Reset</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! check your email {inputs.email} from a link!</p>
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

        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}
