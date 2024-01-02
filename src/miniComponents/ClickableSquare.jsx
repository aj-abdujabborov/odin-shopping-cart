import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  text-decoration: none;

  padding: 0;
  margin: 0;

  &:hover {
    cursor: pointer;
  }
`;

const Span = styled.span`
  padding: 0;
  font-size: 2.5rem;
  &:hover {
    color: #cf8804;
  }
`;

function ButtonIcon({ className, children, symbolText = '', onClick }) {
  return (
    <Button type="button" className={className} onClick={onClick}>
      <Span className="material-symbols-outlined">{symbolText}</Span>
      {children}
    </Button>
  );
}

function LinkIcon({ className, children, symbolText = '', to = '' }) {
  return (
    <Button as={Link} className={className} to={to}>
      <Span className="material-symbols-outlined">{symbolText}</Span>
      {children}
    </Button>
  );
}

export { ButtonIcon, LinkIcon };
