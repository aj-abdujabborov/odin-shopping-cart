import styled from 'styled-components';

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

const Span = styled.span`
  padding: 0;
  font-size: 2.5rem;
  &:hover {
    color: #cf8804;
  }
`;

export default function SquareButton({
  className,
  children,
  symbolText = '',
  onClick,
}) {
  return (
    <Button type="button" className={className} onClick={onClick}>
      <Span className="material-symbols-outlined">{symbolText}</Span>
      {children}
    </Button>
  );
}
