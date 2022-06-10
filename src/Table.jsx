import React from 'react';
import PropTypes from 'prop-types';
import { CardBody } from '@patternfly/react-core';
import {
  TableComposable, Tr, Th, Thead, Tbody, Td as TD,
} from '@patternfly/react-table';
import styled from 'styled-components';

const Td = styled(TD)`
  border: 1px solid grey;
`;

function Table({ planets, sortOrder, setSortOrder }) {
  const hasName = (item) => (item === 'unknown' ? '?' : item);

  const getSortParams = (columnIndex) => ({
    sortBy: {
      index: 0,
      direction: sortOrder,
      defaultDirection: 'desc',
    },
    onSort: (_event, index, direction) => {
      setSortOrder(direction);
    },
    columnIndex,
  });
  const formatNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return (
    <CardBody>
      <TableComposable aria-label="Sortable table">
        <Thead>
          <Tr>
            <Th sort={getSortParams(0)}>
              Names
            </Th>
            <Th>Climate</Th>
            <Th>Terrain</Th>
            <Th>Population</Th>
            <Th modifier="wrap">Surface area of water</Th>
          </Tr>
        </Thead>
        <Tbody>
          {planets.map((planet) => {
            const hasSurfaceWater = planet.surface_water !== 'unknown';
            const hasDiameter = planet.diameter !== 'unknown';
            let calculatedSurfaceWater = '?';
            if (hasSurfaceWater && hasDiameter) {
              calculatedSurfaceWater = Math.round((planet.surface_water / 100) * planet.diameter);
            }
            return (
              <Tr key={planet.url}>
                <Td dataLabel="names"><a href={`${planet.url}`} target="_blank" rel="noreferrer">{hasName(planet.name)}</a></Td>
                <Td dataLabel="climate">{hasName(planet.climate)}</Td>
                <Td dataLabel="Terrain">{hasName(planet.terrain)}</Td>
                <Td dataLabel="Population">{formatNumber(hasName(planet.population))}</Td>
                {calculatedSurfaceWater === '?' ? <Td dataLabel="Surface area of water">?</Td>
                  : (
                    <Td dataLabel="Surface area of water">
                      <>
                        {formatNumber(`${calculatedSurfaceWater}`)}
                        km
                        <sup>2</sup>
                      </>
                    </Td>
                  )}
              </Tr>
            );
          })}
        </Tbody>
      </TableComposable>
    </CardBody>
  );
}

Table.propTypes = {
  planets: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })).isRequired,
  sortOrder: PropTypes.string.isRequired,
  setSortOrder: PropTypes.func.isRequired,
};

export default Table;
