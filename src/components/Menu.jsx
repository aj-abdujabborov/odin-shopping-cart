import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';
import { ButtonIcon } from '../miniComponents/ClickableSquare';

const slideIn = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  0% {
    visibility: visible;
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const open = css`
  animation: ${slideIn} 300ms ease-in-out;
  visibility: visible;
`;
const close = css`
  animation: ${slideOut} 300ms ease-in-out;
`;

const MenuBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 70%;
  background: aliceblue;
  z-index: 3;
  visibility: hidden;
  ${({ $show }) => {
    if ($show === true) return open;
    if ($show === false) return close;
    return null;
    // on page load, $show will be 0,
    // and we want no animations to prevent slide-in-animation
  }};
`;

const MenuSubBox = styled.div`
  padding: 1rem 0;
  margin: 0 5px;
`;

const Nav = styled.nav`
  padding: 0.5rem;
`;

const LinksBox = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledLink = styled(Link)`
  display: block;

  margin: 1rem 0;
  padding: 1rem;

  background: #afbdde;
  color: black;

  text-decoration: none;
`;

const linkMap = [
  { text: "Men's clothing", to: '/shop/mens-clothing' },
  { text: "Women's clothing", to: '/shop/womens-clothing' },
  { text: 'Jewelery', to: '/shop/jewelery' },
  { text: 'Electronics', to: '/shop/electronics' },
  { text: 'Shop all', to: '/shop' },
];

function Menu({ show, menuButton }) {
  return (
    <MenuBox $show={show}>
      <MenuSubBox>
        <ButtonIcon onClick={menuButton} symbolText="menu" />
        <Nav>
          <LinksBox>
            {linkMap.map((link, ind) => (
              <StyledLink key={ind} to={link.to} onClick={menuButton}>
                {link.text}
              </StyledLink>
              // fine to use ind since order won't change at runtime
            ))}
          </LinksBox>
        </Nav>
      </MenuSubBox>
    </MenuBox>
  );
}

export default Menu;
