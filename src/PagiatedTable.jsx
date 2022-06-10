import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '@patternfly/react-core';

function PaginatedTable({ total, setPageNumber, pageNumber }) {
  return (
    <Pagination
      perPageComponent="button"
      itemCount={total}
      perPage={10}
      page={pageNumber}
      onSetPage={(e, num) => setPageNumber(num)}
      widgetId="pagination-options-menu-top"
    />
  );
}

PaginatedTable.propTypes = {
  total: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
};
export default PaginatedTable;
