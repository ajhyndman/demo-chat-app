import React from 'react';
import styled from 'styled-components';
import { COLORS, GUTTERS } from './styles';
import { MessageData } from './App';

type Props = {
  message: MessageData;
  isSelf: boolean;
};

const Root = styled.div`
  background: ${COLORS[0]};
  padding: ${GUTTERS.S}px;
  white-space: pre-wrap;
  margin: 0 ${GUTTERS.L}px ${GUTTERS.L}px 0;

  &.self {
    background: white;
    margin: 0 0 ${GUTTERS.L}px ${GUTTERS.L}px;
  }

  &:first-of-type {
    margin-top: ${GUTTERS.L}px;
  }
`;

const UserName = styled.h3`
  margin: 0 0 ${GUTTERS.S}px;
  font-size: 0.66rem;
`;

const Body = styled.p`
  margin: 0;
`;

const Image = styled.img`
  max-width: 200;
`;

const Message = ({ isSelf, message }: Props) => (
  <Root className={isSelf ? 'self' : ''}>
    <UserName>{message.user} </UserName>
    {message.type === 'IMAGE' && <Body><Image src={message.uri} /></Body>}
    {message.type === 'TEXT' && <Body>{message.body}</Body>}
  </Root>
);

export default Message;
