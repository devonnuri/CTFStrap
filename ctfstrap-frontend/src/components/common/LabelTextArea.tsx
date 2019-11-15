import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const LabelTextAreaContainer = styled.div<{ active: boolean }>`
  position: relative;
  margin: 2rem 0;

  textarea {
    font-size: 1.4em;
    line-height: 1.4em;
    border: none;
    outline: none;
    resize: none;

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

type TextAreaProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

interface LabelTextAreaProps extends TextAreaProps {
  label: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const LabelTextArea: React.FC<LabelTextAreaProps> = ({
  label,
  value,
  onChange,
  ...rest
}) => {
  const [focus, setFocus] = useState(false);
  const [rows, setRows] = useState(1);

  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const onChangeHeight = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textareaLineHeight = 31;

    const previousRows = rows;
    event.target.rows = 1;

    const currentRows = Math.floor(
      event.target.scrollHeight / textareaLineHeight,
    );

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    setRows(currentRows);

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <LabelTextAreaContainer active={focus || value.length > 0}>
      <textarea
        rows={rows}
        onChange={onChangeHeight}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        {...rest}
      />
      <label>{label}</label>
    </LabelTextAreaContainer>
  );
};

export default LabelTextArea;
