import styled, { keyframes, css } from 'styled-components';
import { forwardRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ButtonIcon } from '../miniComponents/ClickableSquare';

const animationDuration = '300ms';

const slideIn = keyframes`
  0% {
    transform: translateX(-100%);
  }
`;

const slideOut = keyframes`
  100% {
    transform: translateX(-100%);
  }
`;

const activateBlur = keyframes`
  0% {
    opacity: 0;
  }
`;

const deactivateBlur = keyframes`
  0% {
    opacity: 1;
  }
`;

const open = css`
  animation: ${slideIn} ${animationDuration} ease-in-out;
  visibility: visible;
`;
const close = css`
  animation: ${slideOut} ${animationDuration} ease-in-out;
`;
const blur = css`
  animation: ${activateBlur} ${animationDuration} ease-in-out;
  opacity: 1;
`;
const unblur = css`
  animation: ${deactivateBlur} ${animationDuration} ease-in-out;
`;

const MenuBox = styled.dialog`
  max-width: 100%;
  width: 70%;
  max-height: 100%;
  height: 100%;

  margin-left: 0;
  padding: 0;

  box-shadow: none;
  background: aliceblue;
  border: none;
  outline: none;

  &[open] {
    ${({ $closing }) => ($closing ? '' : open)};
  }
  ${({ $closing }) => ($closing ? close : '')};

  &::backdrop {
    opacity: 0;
    backdrop-filter: blur(5px) grayscale(80%);
    -webkit-backdrop-filter: blur(5px) grayscale(80%);
    ${({ $closing }) => ($closing ? unblur : '')};
  }

  &[open]::backdrop {
    ${({ $closing }) => ($closing ? '' : blur)};
  }
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

// eslint-disable-next-line prefer-arrow-callback
const Menu = forwardRef(function Menu({ menuButton }, ref) {
  const [closing, setClosing] = useState(false);

  return (
    <MenuBox
      ref={ref}
      $closing={closing}
      onAnimationEnd={() => {
        if (!closing) return;
        menuButton();
        setClosing(false);
      }}
      onClick={(e) => {
        const dialogDimensions = ref.current.getBoundingClientRect();
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          setClosing(true);
        }
      }}
    >
      <MenuSubBox>
        <ButtonIcon onClick={() => setClosing(true)} symbolText="menu" />
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
});

export default Menu;
