import React from 'react';

type Props = {
  children: React.ReactNode;
  onEnter: () => void;
};

const CaptureEnter = ({ children, onEnter }: Props) => (
  <div
    onKeyPress={event => {
      // listen to enter events, but ignore [Shift] + [Enter]
      if (event.key === 'Enter' && !event.shiftKey) {
        onEnter();
        event.preventDefault();
      }
    }}
  >
    {children}
  </div>
);

export default CaptureEnter;
