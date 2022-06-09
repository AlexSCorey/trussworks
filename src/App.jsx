import React, { useState, useEffect } from 'react';
import {
  Page,
  PageSection,
  Card,
  CardBody,
  CardTitle,
} from '@patternfly/react-core';
import Table from './Table';
import getPlanets from './api';
import PagiatedTable from './PagiatedTable';
import LoadingState from './LoadingState';
import ContentError from './ContentError';

function App() {
  const [planets, setPlanets] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState('');

  async function fetchPlanets() {
    setIsLoading(true);
    try {
      const { data: { results, count } } = await getPlanets(pageNumber);
      const sortedPlanets = results.sort((a, b) => a.name.localeCompare(b.name));
      setPlanets(sortedPlanets);
      setIsLoading(false);
      setTotalCount(count);
    } catch (err) {
      setError(err);
    }
  }

  useEffect(() => {
    fetchPlanets();
  }, [pageNumber]);

  useEffect(() => {
    if (planets.length) {
      let sortedPlanets = planets.sort((a, b) => a.name.localeCompare(b.name)).reverse();
      if (sortOrder === 'desc') {
        sortedPlanets = planets.sort((a, b) => a.name.localeCompare(b.name));
      }
      setPlanets(sortedPlanets);
    }
  }, [sortOrder]);

  if (error) {
    return (
      <Page>
        <PageSection>
          <Card>
            <CardBody>
              <ContentError error={error} />
            </CardBody>
          </Card>
        </PageSection>
      </Page>
    );
  }
  if (isLoading) {
    return (
      <Page>
        <PageSection>
          <Card>
            <CardBody>
              <LoadingState />
            </CardBody>
          </Card>
        </PageSection>
      </Page>
    );
  }
  return (
    <Page>
      <PageSection>
        <Card>
          <CardTitle>Planets of Starwars</CardTitle>
          <PagiatedTable total={totalCount} pageNumber={pageNumber} setPageNumber={setPageNumber} />
          <Table planets={planets} sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </Card>
      </PageSection>
    </Page>
  );
}

export default App;
