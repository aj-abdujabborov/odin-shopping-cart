import styled from 'styled-components';
import { ButtonIcon, LinkIcon } from '../miniComponents/ClickableSquare';
import SiteTitle from '../miniComponents/SiteTitle';

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
`;

function Header({ menuButton }) {
  return (
    <HeaderElem>
      <HeaderDiv>
        <ButtonIcon onClick={menuButton} symbolText="menu" />
        <SiteTitle />
        <LinkRight symbolText="shopping_cart" to="/cart" />
      </HeaderDiv>
    </HeaderElem>
  );
}

export default Header;
