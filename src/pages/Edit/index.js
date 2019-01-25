import React, { lazy, Suspense } from 'react';

import ErrorBoundary from 'components/ErrorBoundary';
import Loading from 'components/Loading';

const LazyLoadedContainer = lazy(() => import('./Container'));

const Edit = () => (
  <ErrorBoundary>
    <Suspense fallback={<Loading />}>
      <LazyLoadedContainer />
    </Suspense>
  </ErrorBoundary>
);

export default Edit;
