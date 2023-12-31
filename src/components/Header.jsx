import styled from 'styled-components';

const HeaderElem = styled.header`
  border-bottom: 1px solid black;
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 1rem 0;
`;

const SiteTitle = styled.h1`
  font-weight: 500;
  margin: 0;
  padding: 0;
`;

const Button = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;

  padding: 0;
  margin: 0;

  &:hover {
    cursor: pointer;
  }
`;

const ButtonRight = styled(Button)`
  margin-left: auto;
`;

const Span = styled.span`
  padding: 0;
  font-size: 2.5rem;
  &:hover {
    color: #cf8804;
  }
`;

function Header() {
  return (
    <HeaderElem>
      <HeaderDiv>
        <Button type="button">
          <Span className="material-symbols-outlined">menu</Span>
        </Button>
        <SiteTitle>ConcocShop</SiteTitle>
        <ButtonRight type="button">
          <Span className="material-symbols-outlined">shopping_cart</Span>
        </ButtonRight>
      </HeaderDiv>
    </HeaderElem>
  );
}

export default Header;
