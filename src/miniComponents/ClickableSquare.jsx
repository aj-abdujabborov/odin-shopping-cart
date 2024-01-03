import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => `${props.$size}rem`};
  height: ${(props) => `${props.$size}rem`};
  text-decoration: none;

  padding: 0;
  margin: 0;

  &:hover {
    cursor: pointer;
  }
`;

const Span = styled.span`
  padding: 0;
  font-size: ${(props) => `${props.$size}rem`};
  &:hover {
    color: #cf8804;
  }
`;

function ButtonIcon({
  buttonSize = 3,
  iconSize,
  className,
  children,
  symbolText = '',
  onClick,
}) {
  return (
    <Button
      $size={buttonSize}
      type="button"
      className={className}
      onClick={onClick}
    >
      <Span
        $size={iconSize || buttonSize * 0.83}
        className="material-symbols-outlined"
      >
        {symbolText}
      </Span>
      {children}
    </Button>
  );
}

function LinkIcon({
  buttonSize = 3,
  iconSize,
  className,
  children,
  symbolText = '',
  to = '',
}) {
  return (
    <Button as={Link} $size={buttonSize} className={className} to={to}>
      <Span
        $size={iconSize || buttonSize * 0.83}
        className="material-symbols-outlined"
      >
        {symbolText}
      </Span>
      {children}
    </Button>
  );
}

export { ButtonIcon, LinkIcon };
