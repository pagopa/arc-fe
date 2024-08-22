import React from 'react';
import { Skeleton, Stack } from '@mui/material';

const UserInfo = () => (
  <Stack gap={2}>
    <Stack borderRadius={1} p={3} spacing={2} gap={{ xs: 2, md: 0 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }} gap={{ md: 14 }}>
        <Skeleton variant="rounded" height={12} width={60} />

        <Skeleton variant="rounded" height={12} width={100} />
      </Stack>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ md: 'center' }}
        gap={{ md: 11.5 }}>
        <Skeleton variant="rounded" height={12} width={80} />

        <Skeleton variant="rounded" height={12} width={100} />
      </Stack>
      <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }} gap={{ md: 9 }}>
        <Skeleton variant="rounded" height={12} width={100} />

        <Skeleton variant="rounded" height={12} width={150} />
      </Stack>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ md: 'center' }}
        gap={{ md: 10.5 }}>
        <Skeleton variant="rounded" height={12} width={90} />

        <Skeleton variant="rounded" height={12} width={140} />
      </Stack>
      <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }} gap={{ md: 9 }}>
        <Skeleton variant="rounded" height={12} width={100} />

        <Skeleton variant="rounded" height={12} width={150} />
      </Stack>
    </Stack>
  </Stack>
);

export default UserInfo;
