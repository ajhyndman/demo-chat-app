import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MdSend, MdCameraAlt } from 'react-icons/md';

import { COLORS, GUTTERS } from './styles';
import Input from './Input';
import CaptureEnter from './CaptureEnter';
import Message from './Message';

export type MessageData =
  | {
      type: 'TEXT';
      body: string;
      timestamp: string;
      user: string;
    }
  | {
      type: 'IMAGE';
      uri: string;
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

const Row = styled.div`
  display: flex;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const Button = styled.button`
  border: none;
  background: none;
  padding: 10px;
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
  const [imageMode, setImageMode] = useState(false);

  const fileInput = useRef(null);

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

  // TODO: Use ref to improve performance of this callback.
  const handleSendMessage = () => {
    if (imageMode) {
      // IMAGE message
      // @ts-ignore: input won't be null here
      const imageFiles = fileInput.current.files;
      if (imageFiles.length !== 1) {
        throw new Error('You can only upload exactly one file');
      }
      const file = imageFiles[0];

      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        const uri = fileReader.result;

        console.log(uri);

        // submit message to server
        messageSocket.send(
          JSON.stringify({
            type: 'IMAGE',
            user: userId,
            uri,
            timestamp: new Date().toISOString(),
          }),
        );
      });

      fileReader.readAsDataURL(file);
    } else {
      // TEXT message
      const nextMessage = value.trim();
      if (nextMessage === '') {
        return;
      }

      // submit message to server
      messageSocket.send(
        JSON.stringify({
          type: 'TEXT',
          user: userId,
          body: nextMessage,
          timestamp: new Date().toISOString(),
        }),
      );
    }

    // reset input state
    setValue('');
  };

  return (
    <Root>
      <Header></Header>

      {/* Use a spacer to push messages to the bottom of screen in new
      conversations */}
      <Spacer />

      {messages.map(message => (
        <Message message={message} isSelf={message.user === userId} />
      ))}

      <Footer>
        <CaptureEnter onEnter={handleSendMessage}>
          <Row>
            {imageMode ? (
              <input type="file" ref={fileInput} />
            ) : (
              <Input value={value} onChange={setValue} />
            )}
            <Button
              onClick={() => {
                setImageMode(currentMode => !currentMode);
              }}
            >
              <MdCameraAlt />
            </Button>
            <Button onClick={() => handleSendMessage()}>
              <MdSend />
            </Button>
          </Row>
        </CaptureEnter>
      </Footer>
    </Root>
  );
};

export default App;
