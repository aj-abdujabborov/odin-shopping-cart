import { useState } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: aliceblue;
  border: none;
  padding: 20px;
  &:hover {
    color: white;
  }
`;

function App() {
  return (
    <div>
      <h1>This is a test</h1>
      <StyledButton>Click me</StyledButton>
    </div>
  );
}

export default App;
