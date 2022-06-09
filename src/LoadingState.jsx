import React from 'react';
import { Spinner, EmptyState, EmptyStateBody } from '@patternfly/react-core';

export default function LoadingState() {
  return <EmptyState><EmptyStateBody><Spinner aria-valuetext="Loading" aria-label="Contents of the basic example" /></EmptyStateBody></EmptyState>;
}
