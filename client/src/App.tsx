import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { COLORS, GUTTERS } from './styles';
import Input from './Input';
import CaptureEnter from './CaptureEnter';
import Message from './Message';

type MessageData = {
  text: string;
  timestamp: string;
  user: string;
};

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

// TODO: Instantiate this socket using a ref, a provider, or another safer
// mechanism.
const messageSocket = new WebSocket('ws://localhost:8080');

// TODO: Use a more stable and meaningful method to generate and persist user
// IDs.
const userId = Math.random().toString();

const App: React.FC = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    // populate local message state with messages persisted to server
    messageSocket.addEventListener('message', event => {
      setMessages(messages => [...messages, JSON.parse(event.data)]);
    });
  }, []);

  // scroll to bottom of page whenever a new message is added
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);

  const handleSendMessage = (message: string) =>
    messageSocket.send(
      JSON.stringify({
        user: userId,
        text: message,
        timestamp: new Date().toISOString(),
      }),
    );

  return (
    <Root>
      <Header></Header>

      {/* Use a spacer to push messages to the bottom of screen in new
      conversations */}
      <Spacer />

      {messages.map(message => (
        <Message
          body={message.text}
          isSelf={message.user === userId}
          username={message.user}
        />
      ))}

      <Footer>
        <CaptureEnter
          onEnter={() => {
            const nextMessage = value.trim();
            if (nextMessage === '') {
              return;
            }

            // submit message to server
            handleSendMessage(nextMessage);

            // reset input state
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
