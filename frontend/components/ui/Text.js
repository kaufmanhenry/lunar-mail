import styled from 'styled-components';
import { colors, fontSizes } from './Variables';

export const SubText = styled.small`
  font-size: ${props => props.tiny ? fontSizes[5] : fontSizes[6]}px;
  color: ${colors.gray};
  font-weight: 500;
`;

export const ActiveText = styled.span`
  font-size: ${fontSizes[5]};
  color: ${colors.blue};
  font-weight: 500;
`;
