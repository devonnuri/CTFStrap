import React from 'react';
import styled, { css } from 'styled-components';
import palette, { buttonColors } from '../../lib/styles/palette';

type ColorType = 'primary' | 'secondary' | 'darkGray' | 'lightGray';
type ButtonSize = 'medium' | 'large';

interface ButtonContainerProps {
  color: ColorType;
  inline: boolean;
  size: ButtonSize;
}

const ButtonContainer = styled.button<ButtonContainerProps>`
  display: inline-flex;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
  color: white;
  background: ${props => buttonColors[props.color].background};
  color: ${props => buttonColors[props.color].color};

  border-radius: 999px;
  padding-top: 0;
  padding-bottom: 0;

  &:hover,
  &:focus {
    background: ${props => buttonColors[props.color].hoverBackground};
  }

  ${props =>
    props.size === 'medium' &&
    css`
      height: 2rem;
      padding-left: 1.25rem;
      padding-right: 1.25rem;
      font-size: 1rem;
    `}
  ${props =>
    props.size === 'large' &&
    css`
      height: 2.5rem;
      padding: 0 4rem;
      & + & {
        margin-left: 0.875rem;
      }
      font-size: 1.125rem;
    `}
    &:disabled {
    cursor: not-allowed;
    background: ${palette.gray300};
    color: ${palette.gray500};
    &:hover {
      background: ${palette.gray300};
      color: ${palette.gray500};
    }
  }
`;

interface ButtonProps extends Omit<React.HTMLProps<HTMLButtonElement>, 'size'> {
  color?: ColorType;
  inline?: boolean;
  size?: ButtonSize;
}

const Button: React.FC<ButtonProps> = ({
  children,
  color = 'primary',
  inline,
  size = 'medium',
  ...rest
}) => {
  const htmlProps = rest as any;
  return (
    <ButtonContainer
      color={color}
      inline={inline}
      size={size}
      onClick={event => {
        if (htmlProps.onClick) {
          htmlProps.onClick(event);
        }
        (event.target as HTMLButtonElement).blur();
      }}
      {...htmlProps}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;
