import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import { perPage } from "../config";
import Product from "./Product";
export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      description
      price
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;
const ProductListStyle = styled.div`
  display: grid;
  /* grid-auto-flow: column; */
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;
const Products = ({ page }) => {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: { skip: page * perPage - perPage, first: perPage },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div>
      <ProductListStyle>
        {data.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductListStyle>
    </div>
  );
};
export default Products;
