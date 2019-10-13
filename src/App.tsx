import React from 'react';
import styled from 'styled-components';
import { COLORS } from './styles';

const HEADER_HEIGHT = 48;
const FOOTER_HEIGHT = 48;

const Root = styled.div`
  border: 1px solid violet;
  box-sizing: border-box;
  min-height: 100vh;
  padding-bottom: ${FOOTER_HEIGHT}px;
  padding-top: ${HEADER_HEIGHT}px;
`;

const Header = styled.div`
  border: 1px solid violet;
  box-sizing: border-box;
  height: ${HEADER_HEIGHT}px;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`;

const Footer = styled.div`
  border: 1px solid violet;
  bottom: 0;
  box-sizing: border-box;
  left: 0;
  min-height: ${FOOTER_HEIGHT}px;
  position: fixed;
  right: 0;
`;

const App: React.FC = () => {
  return (
    <Root>
      <Header>Header</Header>
      <div>message log</div>
      <Footer>input</Footer>
    </Root>
  );
};

export default App;
