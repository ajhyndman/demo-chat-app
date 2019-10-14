import React, { ChangeEvent, useRef } from 'react';
import styled from 'styled-components';
import TextArea from 'react-autosize-textarea';
import { LINE_HEIGHT, GUTTERS } from './styles';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const Control = styled(TextArea)`
  border: none;
  box-sizing: border-box;
  display: block;
  line-height: ${LINE_HEIGHT.body};
  padding: ${GUTTERS.S}px;
  resize: none;
  width: 100%;
`;

const Input = ({ value, onChange }: Props) => {
  const inputEl = useRef(null);

  return (
    <Control
      ref={inputEl}
      rows={1}
      maxRows={5}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
        onChange(event.target.value)
      }
    />
  );
};

export default Input;
