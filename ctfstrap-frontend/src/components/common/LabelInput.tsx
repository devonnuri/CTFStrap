import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const LabelInputContainer = styled.div<{ active: boolean }>`
  position: relative;
  margin: 2rem 0;

  input {
    font-size: 1.6em;
    border: none;
    outline: none;

    width: 100%;
    color: ${palette.gray700};
    background-color: transparent;
    transition: all 0.125s ease-in;

    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${palette.gray700};

    ${props =>
      props.active &&
      css`
        color: ${palette.primary700};
        box-shadow: 0 1.25px 0 0 ${palette.primary700};
      `}

    & + label {
      position: absolute;
      pointer-events: none;
      top: 0.5rem;
      transform-origin: 0% 100%;
      transition: 0.2s ease all;
      color: ${palette.gray700};

      ${props =>
        props.active &&
        css`
          transform: translateY(-30px) scale(0.85);
          color: ${palette.primary700};
        `}
    }

    &::placeholder {
      color: ${palette.gray500};
    }

    &:disabled {
      color: ${palette.gray600};
    }
  }
`;

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface LabelInputProps extends InputProps {
  label: string;
  value: string;
}

const LabelInput: React.FC<LabelInputProps> = ({ label, value, ...rest }) => {
  const [focus, setFocus] = useState(false);

  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  return (
    <LabelInputContainer active={focus || value.length > 0}>
      <input value={value} onFocus={onFocus} onBlur={onBlur} {...rest} />
      <label>{label}</label>
    </LabelInputContainer>
  );
};

export default LabelInput;
