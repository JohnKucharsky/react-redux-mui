import { ReactElement } from 'react'
import { Box, TableCell, TableCellProps, TableSortLabel } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { SortKeys } from '@/features/users/data/types.ts'

export default function SortCell({
  handleSort,
  property,
  order,
  orderBy,
  children,
  ...props
}: {
  handleSort: (param: SortKeys) => void
  property: SortKeys
  order: 'asc' | 'desc'
  orderBy: SortKeys
  children: ReactElement | string
} & TableCellProps) {
  const active = property === orderBy

  return (
    <TableCell {...props} sortDirection={active ? order : false}>
      <TableSortLabel
        active={active}
        direction={active ? order : 'asc'}
        onClick={() => handleSort(property)}
      >
        {children}
        {active ? (
          <Box component="span" sx={visuallyHidden}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  )
}
