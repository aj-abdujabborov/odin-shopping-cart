import styled from 'styled-components';
import { Link } from 'react-router-dom';

const H1 = styled(Link)`
  font-weight: 500;
  font-size: 2rem;
  text-decoration: none;
  color: inherit;
  margin: 0;
  padding: 0;
`;

export default function SiteTitle() {
  return <H1 to="/">ConcocShop</H1>;
}
