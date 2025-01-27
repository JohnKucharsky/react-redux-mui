import {
  Box,
  Card,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useTranslation } from 'react-i18next'
import { GridSkeletons } from '@/components/GridSkeletons.tsx'
import NoItems from '@/components/NoItems.tsx'
import RefreshButton from '@/components/RefreshButton.tsx'
import FlexWrap from '@/components/StyledComponents/FlexWrap.tsx'
import TableCheckboxEl from '@/components/TableCheckboxEl.tsx'
import TableEmptyText from '@/components/TableEmptyText.tsx'
import TableSkeletons from '@/components/TableSkeletons.tsx'
import CardEl from '@/features/users/CardEl.tsx'
import ConfirmRemove from '@/features/users/ConfirmRemove.tsx'
import ConfirmRemoveMobile from '@/features/users/ConfirmRemoveMobile.tsx'
import Create from '@/features/users/Create.tsx'
import { useGetUsersQuery } from '@/features/users/data/api.ts'
import RemoveEl from '@/features/users/RemoveEl.tsx'
import SortCell from '@/features/users/SortCell.tsx'
import TableRowEl from '@/features/users/TableRowEl.tsx'
import { useOrderBy } from '@/hooks/useOrderBy.ts'
import { useRemove } from '@/hooks/useRemove.ts'
import { useSelection } from '@/hooks/useSelection.ts'
import { orderBy } from '@/utils/helpers.ts'

export default function Users() {
  const theme = useTheme()
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <>
      <Box px={{ xs: 1, sm: 2 }} pt={1} pb={2}>
        {isUpMd ? <TableView /> : <GridView />}
      </Box>
    </>
  )
}

const TableView = () => {
  const { data, isLoading, isFetching, refetch } = useGetUsersQuery({})
  const selection = useSelection({ data })
  const remove = useRemove()
  const order = useOrderBy()

  const { t } = useTranslation()

  return (
    <>
      <ConfirmRemove
        handleCloseConfirmDelete={remove.handleCloseConfirmDelete}
        confirmDeleteOpened={remove.confirmDeleteOpened}
        resetSelected={selection.resetSelected}
        selectedItems={selection.selectedItems}
      />
      <Card elevation={3}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          p={2}
          spacing={1}
          minHeight={'72px'}
        >
          <FlexWrap gap={1} width={'100%'}>
            <Typography variant={'h5'} fontWeight={'bold'}>
              {t('Users')}
            </Typography>
            <RefreshButton onRefresh={refetch} loading={isFetching} />
          </FlexWrap>

          <Stack direction={'row'} alignItems={'center'} gap={1}>
            <RemoveEl
              handleOpenConfirmDelete={remove.handleOpenConfirmDelete}
              hasSelectedItems={selection.hasSelectedItems}
            />
            <Create />
          </Stack>
        </Stack>

        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <TableCheckboxEl
                    selectedSome={Boolean(selection.selectedSome)}
                    selectedAll={Boolean(selection.selectedAll)}
                    handleSelectAll={selection.handleSelectAll}
                  />
                </TableCell>
                <SortCell property={'name'} {...order}>
                  {t('Name')}
                </SortCell>
                <SortCell property={'username'} {...order}>
                  {t('userName')}
                </SortCell>
                <SortCell property={'email'} {...order}>
                  {t('Email')}
                </SortCell>
                <SortCell property={'phone'} {...order}>
                  {t('Phone')}
                </SortCell>
                <SortCell property={'website'} {...order}>
                  {t('Website')}
                </SortCell>
                <TableCell>{t('Address')}</TableCell>
                <TableCell>{t('Company')}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            {!isLoading && data?.length === 0 ? (
              <TableEmptyText
                colSpan={9}
                title={t('couldNotFindSearchedUsers')}
              />
            ) : null}

            {isLoading && !data && (
              <TableBody>
                <TableSkeletons cellsCount={9} skeletonRowsCount={10} />
              </TableBody>
            )}

            {!isLoading && data?.length !== 0 && (
              <TableBody>
                {orderBy(order.orderBy, order.order, data)?.map((user) => (
                  <TableRowEl
                    key={user.id}
                    user={user}
                    isSelected={selection.checkSelection(user.id)}
                    handleSelectOne={selection.handleSelectOne}
                  />
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}

const GridView = () => {
  const { data, isLoading, refetch } = useGetUsersQuery({})
  const remove = useRemove()

  const { t } = useTranslation()

  return (
    <>
      <ConfirmRemoveMobile
        handleCloseConfirmDelete={remove.handleCloseConfirmDelete}
        confirmDeleteOpened={remove.confirmDeleteOpened}
        idToRemove={remove.idToRemove}
      />
      <Card
        elevation={3}
        sx={{
          p: { xs: 1, s: 1.5 },
          mb: 2,
        }}
      >
        <Stack
          direction={'row'}
          alignItems={'flex-start'}
          justifyContent={'space-between'}
          p={2}
          spacing={1}
        >
          <FlexWrap gap={1} width={'100%'}>
            <Typography variant={'h5'} fontWeight={'bold'}>
              {t('Users')}
            </Typography>
            <RefreshButton onRefresh={refetch} loading={isLoading} />
          </FlexWrap>

          <Create />
        </Stack>
      </Card>

      <NoItems
        length={data?.length}
        title={t('couldNotFindSearchedUsers')}
        loading={isLoading}
      />

      {isLoading ? (
        <GridSkeletons skeletonNum={4} />
      ) : (
        <Grid container spacing={1}>
          {data?.map((item) => (
            <CardEl
              key={item.id}
              user={item}
              handleOpenConfirmDelete={(id) =>
                remove.handleOpenConfirmDelete(id)
              }
            />
          ))}
        </Grid>
      )}
    </>
  )
}
