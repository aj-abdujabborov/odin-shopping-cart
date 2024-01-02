import styled from 'styled-components';

const Item = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1rem;

  border-radius: 10px;
  box-shadow: 0 0 20px #0000001e;
`;

const Photo = {
  Box: styled.div`
    flex: 2 1;

    display: flex;
    align-items: center;
  `,
  Image: styled.img`
    object-fit: contain;
    max-width: 100%;
  `,
};

const Info = styled.div`
  flex: 3 1;

  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Title = styled.h3`
  margin: 0;
  font-weight: 500;
  font-size: 1rem;
`;

const Rating = {
  Box: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,
  Icon: styled.span`
    width: 1rem;
    height: 1rem;
  `,
  SubIcon: styled.span`
    font-size: 1.8rem;

    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-variation-settings: 'FILL' 1;
  `,
  Text: styled.span`
    font-weight: 300;
  `,
};

const Price = styled.span`
  font-weight: 500;
`;

const Button = styled.button`
  border: none;

  margin-top: auto;
  background: #2b3344;

  padding: 0.5rem;
  border-radius: 20px;
  font-size: 1rem;
  color: white;
`;

function ItemCard({ title, price, imageSrc, rating, numRatings, addToCart }) {
  return (
    <Item>
      <Photo.Box>
        <Photo.Image src={imageSrc} alt="" />
      </Photo.Box>
      <Info>
        <Title>{title}</Title>
        <Rating.Box>
          <Rating.Icon>
            <Rating.SubIcon className="material-symbols-outlined">
              star
            </Rating.SubIcon>
          </Rating.Icon>
          <Rating.Text>
            {rating} ({numRatings} ratings)
          </Rating.Text>
        </Rating.Box>
        <Price>${price}</Price>
        <Button type="button" onClick={addToCart}>
          Add to cart
        </Button>
      </Info>
    </Item>
  );
}

export default ItemCard;
