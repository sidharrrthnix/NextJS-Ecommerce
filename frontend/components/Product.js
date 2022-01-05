import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { useCart } from "../lib/cartState";
import formatMoney from "../lib/formatMoney";
import AddToCart from "./AddToCart";
import DeleteProduct from "./DeleteProduct";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";
import Title from "./styles/Title";

const Product = ({ product }) => {
  const { openCart } = useCart();
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: "update",
            query: {
              id: product.id,
            },
          }}
        >
          Edit ✏️
        </Link>

        <AddToCart onClick={openCart} id={product.id} />

        <DeleteProduct id={product.id}>Delete</DeleteProduct>
      </div>
    </ItemStyles>
  );
};

export default Product;
