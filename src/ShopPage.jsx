import styled from 'styled-components';
import ItemCard from './components/ItemCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  display: grid;
  gap: 20px;
`;

function ShopPage({ itemArray }) {
  return (
    <Container>
      <List>
        {itemArray.map((item) => (
          <li key={item.id}>
            <ItemCard
              title={item.title}
              imageSrc={item.image}
              rating={item.rating.rate}
              numRatings={item.rating.count}
              price={item.price}
            />
          </li>
        ))}
      </List>
    </Container>
  );
}

export default ShopPage;
