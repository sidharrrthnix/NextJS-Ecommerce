/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
// eslint-disable-next-line quotes

import Link from "next/link";
import styled from "styled-components";

import Cart from "./Cart";
import Nav from "./Nav";
import Search from "./Search";

const Logo = styled.h1`
  background: red;
  transform: skew(-10deg);
  font-size: 4rem;
  margin-left: 2rem;
  z-index: 2;
  a {
    text-decoration: none;
    text-transform: uppercase;
    color: white;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    display: grid;
    grid-template-columns: auto 1fr;
    border-bottom: 10px solid var(--black, black);
    justify-content: space-between;
    align-items: stretch;
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;

    border-bottom: 1px solid var(--black, black);
  }
`;

const Header = () => {
  return (
    <HeaderStyles>
      <div className="bar">
        <Logo>
          <Link href="/">Sick Fits</Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        <Search />
      </div>
      <Cart />
    </HeaderStyles>
  );
};

export default Header;
