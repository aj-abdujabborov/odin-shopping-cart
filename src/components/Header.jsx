import styled from 'styled-components';
import { ButtonIcon, LinkIcon } from '../miniComponents/ClickableSquare';
import SiteTitle from '../miniComponents/SiteTitle';
import { useCart } from '../hooks/useCart';

const HeaderElem = styled.header`
  border-bottom: 1px solid black;
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 1rem 0;
`;

const LinkRight = styled(LinkIcon)`
  margin-left: auto;

  position: relative;
`;

const NumProducts = styled.span`
  position: absolute;
  left: 1.5rem;
  bottom: 1.75rem;
  background: #2d3342;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;
`;

function Header({ menuButton }) {
  const { numProducts } = useCart();

  return (
    <HeaderElem>
      <HeaderDiv>
        <ButtonIcon onClick={menuButton} symbolText="menu" />
        <SiteTitle />
        <LinkRight symbolText="shopping_cart" to="/cart">
          {numProducts > 0 && <NumProducts>{numProducts}</NumProducts>}
        </LinkRight>
      </HeaderDiv>
    </HeaderElem>
  );
}

export default Header;
