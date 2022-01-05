import { createContext, useContext, useState } from "react";

const LocalStateContext = createContext();

const LocalStateProvider = LocalStateContext.Provider;

export default function CartStateProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  function toggleCart() {
    setCartOpen(!cartOpen);
  }
  function closeCart() {
    setCartOpen(false);
  }
  function openCart() {
    setCartOpen(true);
  }

  return (
    <LocalStateProvider
      value={{ cartOpen, setCartOpen, toggleCart, closeCart, openCart }}
    >
      {children}
    </LocalStateProvider>
  );
}

export function useCart() {
  const all = useContext(LocalStateContext);
  return all;
}
