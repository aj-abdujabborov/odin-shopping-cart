import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import { useProductsByCategory } from '../hooks/useProductsAPI';
import { useCartDispatch } from '../hooks/useCart';

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

const categoryMap = new Map();
categoryMap.set('mens-clothing', "men's clothing");
categoryMap.set('womens-clothing', "women's clothing");
categoryMap.set('jewelery', 'jewelery');
categoryMap.set('electronics', 'electronics');

function ShopPage() {
  const { category } = useParams();
  const { loading, error, products } = useProductsByCategory({
    category: category ? categoryMap.get(category) : undefined,
  });
  const { add } = useCartDispatch();

  if (loading) return '...';
  if (error) return 'Error'; // navigate to error page

  return (
    <Container>
      <List>
        {products.map((item) => (
          <li key={item.id}>
            <ItemCard
              title={item.title}
              imageSrc={item.image}
              rating={item.rating.rate}
              numRatings={item.rating.count}
              price={item.price}
              addToCart={() => add(item.id)}
            />
          </li>
        ))}
      </List>
    </Container>
  );
}

export default ShopPage;
