import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ButtonIcon } from '../miniComponents/ClickableSquare';

const Item = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1rem;

  border-radius: 10px;
  box-shadow: 0 0 20px #0000001e;
`;

const Photo = {
  Box: styled.div`
    flex: 1 1;

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

const Price = styled.span`
  font-weight: 500;
`;

const CountBox = styled.div`
  margin-top: auto;

  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Button = styled(ButtonIcon)`
  display: inline-block;
  background: #2b3344;
  border-radius: 3px;
  color: white;
`;

const TextDeleteButton = styled.button`
  margin-left: auto;
  display: inline-block;
  background: #2b3344;
  border-radius: 3px;
  color: white;

  height: 1.5rem;
  border: none;
  font-size: 0.8rem;
`;

const NumberInput = styled.input`
  width: 2rem;
  height: 1.5rem;
  font-size: 1rem;
  text-align: center;
  background-color: #2b334426;
  border: none;
  border-radius: 3px;
`;

function CartItemCard({
  title,
  price,
  imageSrc,
  count,
  increaseCount,
  decreaseCount,
  setCount,
}) {
  const [countField, setCountField] = useState(count);

  useEffect(() => {
    setCountField(count);
  }, [count]);

  return (
    <Item>
      <Photo.Box>
        <Photo.Image src={imageSrc} alt="" />
      </Photo.Box>
      <Info>
        <Title>{title}</Title>
        <Price>{`$${price}`}</Price>
        <CountBox>
          <Button
            ariaLabel={count === 1 ? 'Delete item' : 'Decrease quantity by 1'}
            buttonSize={1.5}
            iconSize={1.5}
            symbolText={count === 1 ? 'delete_forever' : 'remove'}
            onClick={decreaseCount}
          />
          <NumberInput
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="12"
            value={`${countField}`} // to remove trailing 0s in string
            onChange={(e) => setCountField(+e.target.value)}
            onBlur={() => setCount(Math.max(countField, 1))}
          />
          <Button
            ariaLabel="Increase quantity by 1"
            buttonSize={1.5}
            iconSize={1.5}
            symbolText="add"
            onClick={increaseCount}
          />
          <TextDeleteButton onClick={() => setCount(0)}>
            Delete
          </TextDeleteButton>
        </CountBox>
      </Info>
    </Item>
  );
}

export default CartItemCard;
