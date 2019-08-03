import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

type ColorType = 'primary' | 'secondary';

const AlertContainer = styled.div<{ color: ColorType }>`
  padding: 0.7rem 1rem;

  font-size: 1.2em;
  border-width: 2px;
  border-style: solid;

  ${props =>
    props.color === 'primary'
      ? css`
          color: ${palette.primary900};
          background-color: ${palette.primary100};
          border-color: ${palette.primary700};
        `
      : css`
          color: ${palette.secondary900};
          background-color: ${palette.secondary100};
          border-color: ${palette.secondary700};
        `}
`;

interface AlertProps {
  color: ColorType;
}

const Alert: React.FC<AlertProps> = ({ children, color, ...rest }) => {
  const htmlProps = rest as any;
  return (
    <AlertContainer color={color} {...htmlProps}>
      {children}
    </AlertContainer>
  );
};

export default Alert;
