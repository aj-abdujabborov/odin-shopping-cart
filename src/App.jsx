/* eslint-disable react/jsx-no-bind */
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

import { useState } from 'react';

import Header from './components/Header';
import Menu from './components/Menu';
import ItemCard from './components/ItemCard';
import ShopPage from './ShopPage';

const GlobalFonts = createGlobalStyle`
  :root {
    font-size: 18px;
    font-family: 'Montserrat', sans-serif;
    color: black;
  }

  body {
    margin: 5px;
  }
`;

const StyledButton = styled.button`
  background: aliceblue;
  border: none;
  padding: 20px;
  &:hover {
    color: white;
  }
`;

const AppDiv = styled.div`
  filter: ${(props) => (props.$blur ? `blur(5px) grayscale(80%)` : '')};
  pointer-events: ${(props) => (props.$blur ? `none` : 'auto')};
  transition: 300ms ease-in-out filter;
`;

const items = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops.',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts ',
    price: 22.3,
    description:
      'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
    category: "men's clothing",
    image:
      'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: 'Mens Cotton Jacket',
    price: 55.99,
    description:
      'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    rating: { rate: 4.7, count: 500 },
  },
];

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
          <ShopPage itemArray={items} />
        </main>
      </AppDiv>
    </>
  );
}

export default App;
