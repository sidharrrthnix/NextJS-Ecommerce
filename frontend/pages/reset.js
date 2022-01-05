import RequestReset from "../components/RequestReset";
import Reset from "../components/Reset";

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        you must have token to reset your password
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      Reset your password {query.token}
      <Reset token={query.token} />
    </div>
  );
}
