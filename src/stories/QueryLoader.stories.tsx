import React, { useState, useEffect } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { CircularProgress, Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import QueryLoader, { QueryLoaderProps } from 'components/QueryLoader';

// Create a QueryClient instance
const queryClient = new QueryClient();

const MockFetchingComponent = () => {
  const [fetching, setFetching] = useState(true);

  // Simulate fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setFetching(false);
    }, 2000); // Simulate a 2-second fetch
    return () => clearTimeout(timer);
  }, []);

  return fetching;
};

const QueryLoaderWrapper = ({ queryKey, loaderComponent, children }: QueryLoaderProps) => {
  const isFetching = MockFetchingComponent();

  return (
    <QueryLoader queryKey={queryKey} loaderComponent={loaderComponent}>
      {isFetching ? loaderComponent : children}
    </QueryLoader>
  );
};

const MetaData: Meta<typeof QueryLoader> = {
  title: 'Components/QueryLoader',
  component: QueryLoader,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    )
  ]
};

export default MetaData;

const Template: StoryFn<typeof QueryLoader> = (args) => (
  <Box sx={{ width: '100%', mt: '100px', textAlign: 'center' }}>
    <QueryLoaderWrapper {...args}>
      <div>Content Loaded!</div>
    </QueryLoaderWrapper>
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  loaderComponent: <CircularProgress />,
  atLeast: 1000
};
