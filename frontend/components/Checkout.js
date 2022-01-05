import styled from "styled-components";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/dist/client/router";
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import SickButton from "./styles/SickButton";
import nProgress from "nprogress";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useCart } from "../lib/cartState";
import { CURRENT_USER_QUERY } from "./User";
const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  display: grid;
  grid-gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
`;
const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const stripe = useStripe();
  const router = useRouter();
  const { closeCart } = useCart();
  const elements = useElements();
  const [checkout, { error: graphQlError }] = useMutation(
    CREATE_ORDER_MUTATION,
    { refetchQueries: [{ query: CURRENT_USER_QUERY }] }
  );
  async function handleSubmit(e) {
    e.preventDefault();
    console.log("we got to do something");
    setLoading(true);
    nProgress.start();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod);
    if (error) {
      setError(error);
      nProgress.done();
      return;
    }
    const order = await checkout({
      variables: { token: paymentMethod.id },
    });
    console.log("ordered", order);
    router.push({
      pathname: "/order/[id]",
      query: { id: order.data.checkout.id },
    });
    closeCart();
    setLoading(false);
    nProgress.done();
  }
  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {graphQlError && <p style={{ fontSize: 12 }}>{graphQlError.message}</p>}
      <CardElement />
      <SickButton>Checkout out now</SickButton>
    </CheckoutFormStyles>
  );
}
function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}
export { Checkout };
