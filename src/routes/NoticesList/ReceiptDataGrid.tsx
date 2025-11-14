import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import {
  DebtorReceiptDTO,
  PagedDebtorReceiptsDTO
} from '../../../generated/arpu-be/data-contracts';
import { useTranslation } from 'react-i18next';
import { generatePath, Link } from 'react-router-dom';
import { ArcRoutes } from 'routes/routes';
import IconButton from '@mui/material/IconButton';
import { CustomDataGrid } from 'components/DataGrid/CustomDataGrid';
import { ChevronRight } from '@mui/icons-material';
import { formatDateOrMissingValue, fromTaxCodeToSrcImage } from 'utils/converters';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material/styles';
import { PayeeIcon } from 'components/PayeeIcon';
import Stack from '@mui/material/Stack';

export type DataGridProps = {
  data: PagedDebtorReceiptsDTO;
};

export const ReceiptDataGrid = ({ data }: DataGridProps) => {
  const { t } = useTranslation();
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  const columns: Array<GridColDef<DebtorReceiptDTO>> = [
    {
      field: 'orgName',
      headerName: t('Nome'),
      flex: smUp ? 5 : 2,
      renderCell: ({ row }) => (
        <Stack direction="row" gap={2}>
          <PayeeIcon
            src={fromTaxCodeToSrcImage(row.orgFiscalCode)}
            alt={row.orgName}
            visible={smUp}
          />
          {row.orgName}
        </Stack>
      )
    },
    {
      field: 'paymentDateTime',
      headerName: t('Data'),
      flex: 1,
      type: 'string',
      valueFormatter: (value) => formatDateOrMissingValue(value)
    },
    {
      field: 'action',
      headerName: '',
      flex: 0.5,
      sortable: false,
      align: 'right',
      headerAlign: 'right',
      renderCell: ({ id }) => (
        <Link to={generatePath(ArcRoutes.TRANSACTION, { id })} aria-label={t('commons.detail')}>
          <IconButton size="small">
            <ChevronRight />
          </IconButton>
        </Link>
      )
    }
  ];

  return (
    <CustomDataGrid
      rows={data?.content ?? []}
      getRowId={(row) => row.receiptId}
      columns={columns}
      disableColumnMenu
      disableColumnResize
      totalPages={data?.totalPages}
    />
  );
};
