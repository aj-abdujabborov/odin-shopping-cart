import styled from 'styled-components';
import { useCartProducts, useNumCartProducts } from '../hooks/useCartData';
import { useProductsByIds } from '../hooks/useProductsAPI';
import CartItemCard from '../components/CartItemCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CheckoutBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ListBox = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  display: grid;
  gap: 1rem;
`;

const ListItem = styled.li`
  display: block;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  border: none;
  background: #2b3344;

  padding: 0.75rem;
  border-radius: 10px;
  font-size: 1.25rem;
  color: white;
`;

export default function CartPage() {
  const { numCartProducts } = useNumCartProducts();
  const { cartItemIds, cartItemCounts, addItem, removeItem, setItemCount } =
    useCartProducts();
  const { loading, error, products } = useProductsByIds(cartItemIds);

  if (loading) return '...';
  if (error) return `Error: ${error}`;

  const totalPrice =
    Math.round(
      products.reduce(
        (sum, currProd, ind) => sum + currProd.price * cartItemCounts[ind],
        0,
      ) * 100,
    ) / 100;

  return (
    <Container>
      <CheckoutBox>
        <span>{`Subtotal: $${totalPrice}`}</span>
        <Button>
          {`Checkout ${numCartProducts} item${numCartProducts > 1 && 's'}`}
        </Button>
      </CheckoutBox>
      <ListBox aria-label="Items in cart">
        {products.map((prod, ind) => (
          <ListItem aria-label={prod.title} key={prod.id}>
            <CartItemCard
              title={prod.title}
              price={prod.price}
              imageSrc={prod.image}
              count={cartItemCounts[ind]}
              increaseCount={() => addItem(prod.id)}
              decreaseCount={() => removeItem(prod.id)}
              setCount={(count) => setItemCount(prod.id, count)}
            />
          </ListItem>
        ))}
      </ListBox>
    </Container>
  );
}
