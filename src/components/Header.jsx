import styled from 'styled-components';
import SquareButton from '../miniComponents/SquareButton';
import SiteTitle from '../miniComponents/SiteTitle';
import { Link } from 'react-router-dom';

const HeaderElem = styled.header`
  border-bottom: 1px solid black;
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 1rem 0;
`;

const ButtonRight = styled(SquareButton)`
  margin-left: auto;
`;

function Header({ menuButton }) {
  return (
    <HeaderElem>
      <HeaderDiv>
        <SquareButton onClick={menuButton} symbolText="menu" />
        <SiteTitle />
        <ButtonRight type="button" symbolText="shopping_cart" />
        <Link to="/cart">Cart</Link>
      </HeaderDiv>
    </HeaderElem>
  );
}

export default Header;
