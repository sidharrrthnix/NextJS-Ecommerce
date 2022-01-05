/* eslint-disable arrow-body-style */

import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import OrderStyles from "../../components/styles/OrderStyles";
import formatMoney from "../../lib/formatMoney";
const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const SingleOrdersPage = ({ query }) => {
  const { data, loading, error } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id: query.id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { order } = data;
  console.log(order);
  return (
    <OrderStyles>
      <Head>
        <title>Sick Fits - {order.id}</title>
      </Head>
      <p>
        <span>Order Id:</span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Charge:</span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Order Total:</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>Item Count:</span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((item) => (
          <div className="order-item" key={item.id}>
            <img src={item.photo.image.publicUrlTransformed} alt={item.title} />
            <div className="item-details">
              <h2>{item.name}</h2>
              <h4>Qty: {item.quantity}</h4>
              <h4>Each: {formatMoney(item.price)}</h4>
              <h4>Qty: {formatMoney(item.price * item.quantity)}</h4>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
};

export default SingleOrdersPage;
