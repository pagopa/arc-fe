import { Box, Select, MenuItem, Pagination, SelectChangeEvent } from '@mui/material';
import { theme } from '@pagopa/mui-italia';
import React from 'react';

type CustomPaginationProps = {
  sizePageOptions?: Array<number>;
  defaultPageOption?: number;
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
};

const CustomPagination = ({
  sizePageOptions,
  defaultPageOption,
  totalPages = 1,
  currentPage = 1,
  onPageChange,
  onPageSizeChange
}: CustomPaginationProps) => {
  const hidePreviousButton = currentPage === 1;
  const hideNextButton = currentPage === totalPages;

  const handlePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange?.(value);
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    const newSize = Number(event.target.value);
    if (!isNaN(newSize)) {
      onPageSizeChange?.(newSize);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      bgcolor={theme.palette.grey[200]}
      py={2}
      px={2}>
      <Select
        value={defaultPageOption}
        onChange={handlePageSizeChange}
        size="small"
        data-testid="result-set-select"
        sx={{
          fontSize: 12
        }}>
        {sizePageOptions?.map((size) => (
          <MenuItem key={size} value={size} data-testid={`select-size-${size}`}>
            {size}
          </MenuItem>
        ))}
      </Select>

      <Pagination
        variant="text"
        page={currentPage}
        siblingCount={1}
        boundaryCount={0}
        count={totalPages}
        hidePrevButton={hidePreviousButton}
        hideNextButton={hideNextButton}
        onChange={handlePage}
      />
    </Box>
  );
};

export default CustomPagination;
