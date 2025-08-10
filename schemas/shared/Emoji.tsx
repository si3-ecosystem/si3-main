import React from 'react';

interface EmojiProps {
  symbol: string;
  size?: string;
  label?: string;
}

const Emoji: React.FC<EmojiProps> = ({ symbol, size = '1em', label }) => {
  return (
    <span
      role="img"
      aria-label={label}
      style={{ fontSize: size }}
    >
      {symbol}
    </span>
  );
};

export default Emoji;
