import styled, { keyframes, css } from 'styled-components';
import SquareButton from '../miniComponents/SquareButton';

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

const Link = styled.a`
  display: block;

  margin: 1rem 0;
  padding: 1rem;

  background: #afbdde;
  color: black;
`;

function Menu({ show, menuButton }) {
  return (
    <MenuBox $show={show}>
      <MenuSubBox>
        <SquareButton onClick={menuButton} symbolText="menu" />
        <Nav>
          <LinksBox>
            <Link to="">Men&apos;s clothing</Link>
            <Link>Women&apos;s clothing</Link>
            <Link>Jewels</Link>
            <Link>Electronics</Link>
          </LinksBox>
        </Nav>
      </MenuSubBox>
    </MenuBox>
  );
}

export default Menu;
