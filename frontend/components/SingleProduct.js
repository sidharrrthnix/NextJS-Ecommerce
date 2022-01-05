import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import DisplayError from "./ErrorMessage";
const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;
const ProductStyles = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 1fr;
  align-items: top;
  justify-content: center;
  max-width: var(--maxWidth);
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;
const SingleProduct = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });
  console.log({ data, loading, error });
  if (loading) return <div>Loading...</div>;
  if (error) return <DisplayError error={error} />;
  const { Product } = data;
  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {Product.name}</title>
      </Head>
      <img
        src={Product.photo.image.publicUrlTransformed}
        alt={Product.photo.altText}
      />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </ProductStyles>
  );
};

export default SingleProduct;
