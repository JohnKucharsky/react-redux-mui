import { memo, useState } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import {
  Checkbox,
  Dialog,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useNavigate } from 'react-router'
import { formatAddress } from '@/features/users/data/service.tsx'
import { User } from '@/features/users/data/types.ts'
import Edit from '@/features/users/Edit.tsx'
import { addTestKey } from '@/utils/test-keys.ts'

export default memo(TableRowEl)
function TableRowEl({
  user,
  isSelected,
  handleSelectOne,
}: {
  user: User
  isSelected: boolean
  handleSelectOne: (param: number) => void
}) {
  const [editOpen, setEditOpen] = useState(false)

  const theme = useTheme()
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'))

  const navigate = useNavigate()

  return (
    <>
      <Dialog
        fullScreen={isDownSm}
        fullWidth
        maxWidth="xs"
        open={editOpen}
        onClose={() => setEditOpen(false)}
      >
        <Edit handleEditClose={() => setEditOpen(false)} initialValues={user} />
      </Dialog>
      <TableRow hover selected={isSelected}>
        <TableCell padding="checkbox">
          <Checkbox
            {...addTestKey('row-checkbox')}
            size={'small'}
            checked={isSelected}
            onChange={() => {
              handleSelectOne(user.id)
            }}
            value={isSelected}
          />
        </TableCell>

        <TableCell>
          <Typography {...addTestKey('name-cell')} variant="h6">
            {user.name}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="h6">{user.username}</Typography>
        </TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.phone}</TableCell>
        <TableCell>{user.website}</TableCell>
        <TableCell>{formatAddress(user.address)}</TableCell>
        <TableCell>{user.company.name}</TableCell>
        <TableCell>
          <Stack direction={'row'} alignItems={'center'}>
            <IconButton
              {...addTestKey('link-button')}
              color={'primary'}
              onClick={() => {
                navigate(`/user/${user.id}`)
              }}
            >
              <OpenInNewIcon />
            </IconButton>
            <IconButton
              onClick={() => setEditOpen(true)}
              {...addTestKey('edit-pencil')}
              color={'primary'}
            >
              <EditOutlinedIcon />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
    </>
  )
}
