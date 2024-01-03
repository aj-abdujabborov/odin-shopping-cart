/* eslint-disable react/jsx-no-bind */
import styled, { createGlobalStyle } from 'styled-components';

import { useState } from 'react';
import { Outlet } from 'react-router-dom';

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

const AppDiv = styled.div`
  filter: ${(props) => (props.$blur ? `blur(5px) grayscale(80%)` : '')};
  pointer-events: ${(props) => (props.$blur ? `none` : 'auto')};
  transition: 300ms ease-in-out filter;
`;

function App() {
  const [showMenu, setShowMenu] = useState(0);

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <>
      <GlobalFonts />
      <Menu show={showMenu} menuButton={toggleMenu} />
      <AppDiv $blur={showMenu}>
        <Header menuButton={toggleMenu} />
        <main style={{ padding: '20px' }}>
          <Outlet />
        </main>
      </AppDiv>
    </>
  );
}

export default App;
