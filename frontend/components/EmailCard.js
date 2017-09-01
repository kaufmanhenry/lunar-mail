import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router';

import { colors } from './ui/Variables';

const StyledEmailCard = styled.div`
  background-color: ${colors.white};
  padding: 2rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
  border-radius: 4px;
  margin-bottom: 1.25rem;
  h3 {
    color: ${colors.black};
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: .5rem;
  }
  p {
    color: ${colors.gray};
    font-size: .75rem;
    font-weight: 500;
    &:not(:last-child) {
      margin-right: 1.5rem;
    }
  }
`;

const EmailCard = ({ name, id }) => (
  <StyledEmailCard>
    <h3>{name}</h3>
    <Link to={`emails/${id}`}>View</Link>
  </StyledEmailCard>
);

EmailCard.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string.isRequired
};

EmailCard.defaultProps = {
  name: 'Email Name'
};

export default EmailCard;
