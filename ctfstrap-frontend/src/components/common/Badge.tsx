import styled from 'styled-components';
import palette from '../../lib/styles/palette';

interface BadgeProps {
  bgColor?: string;
  color?: string;
}

const Badge = styled.span`
  display: inline;
  margin: 0 0.3rem;
  padding: 0.2rem 0.3rem;
  border-radius: 5px;
  font-size: 0.9rem;

  background-color: ${(props: BadgeProps) => props.bgColor || palette.gray600};
  color: ${(props: BadgeProps) => props.color || 'white'};
`;

export default Badge;
