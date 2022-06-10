import React from 'react';
import PropTypes from 'prop-types';
import { EmptyState, EmptyStateBody } from '@patternfly/react-core';

export default function ContentError({ error }) {
  return (
    <EmptyState>
      <EmptyStateBody>
        {error.message}
        <div>Return to Table</div>
      </EmptyStateBody>
    </EmptyState>
  );
}
ContentError.propTypes = {
  error: PropTypes.objectOf(PropTypes.shape({ message: PropTypes.string })).isRequired,
};
