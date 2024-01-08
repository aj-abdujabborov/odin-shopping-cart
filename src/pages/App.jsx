/* eslint-disable react/jsx-no-bind */
import styled, { createGlobalStyle } from 'styled-components';

import { useRef } from 'react';
import { Outlet } from 'react-router-dom';

import CartProvider from '../CartContext';
import Header from '../components/Header';
import Menu from '../components/Menu';

const GlobalFonts = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  :root {
    font-size: 18px;
    font-family: 'Montserrat', sans-serif;
    color: black;
  }

  body {
    margin: 5px;
  }
`;

function App() {
  const menuRef = useRef(null);

  function showMenu() {
    menuRef.current.showModal();
  }

  function closeMenu() {
    menuRef.current.close();
  }

  return (
    <CartProvider>
      <GlobalFonts />
      <Menu ref={menuRef} menuButton={closeMenu} />
      <Header menuButton={showMenu} />
      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </CartProvider>
  );
}

export default App;
