import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { COLORS, GUTTERS } from './styles';
import Input from './Input';
import CaptureEnter from './CaptureEnter';

const HEADER_HEIGHT = 48;
const FOOTER_HEIGHT = 48;

const Root = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: ${HEADER_HEIGHT}px ${GUTTERS.L}px ${FOOTER_HEIGHT}px;
`;

const Header = styled.div`
  background: white;
  box-sizing: border-box;
  height: ${HEADER_HEIGHT}px;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`;

const Footer = styled.div`
  background: ${COLORS[5]};
  bottom: 0;
  box-sizing: border-box;
  left: 0;
  min-height: ${FOOTER_HEIGHT}px;
  padding: ${GUTTERS.L}px;
  position: fixed;
  right: 0;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const Message = styled.p`
  background: ${COLORS[0]};
  padding: ${GUTTERS.S}px;
  white-space: pre-wrap;
  margin: 0 0 ${GUTTERS.L}px;

  &:first-of-type {
    margin-top: ${GUTTERS.L}px;
  }
`;

const App: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [value, setValue] = useState('');

  // scroll to bottom of page whenever a new message is added
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages])

  return (
    <Root>
      <Header></Header>
      <Spacer />
      {messages.map(message => (
        <Message>{message}</Message>
      ))}
      <Footer>
        <CaptureEnter
          onEnter={() => {
            const nextMessage = value.trim();
            if (nextMessage === '') {
              return;
            }

            setMessages(messages => [...messages, nextMessage]);
            setValue('');
          }}
        >
          <Input value={value} onChange={setValue} />
        </CaptureEnter>
      </Footer>
    </Root>
  );
};

export default App;
