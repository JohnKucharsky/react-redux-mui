import CloseIcon from '@mui/icons-material/Close'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Dialog, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CloseButton from '@/components/StyledComponents/CloseButton.tsx'
import { Transition } from '@/components/StyledComponents/ConfirmDeleteStyles.tsx'
import { addTestKey } from '@/utils/test-keys.ts'

export default function ConfirmDeleteUI({
  confirmDeleteOpened,
  handleCloseConfirmDelete,
  handleDeleteCompleted,
  deleteWarningText,
  loading,
}: {
  confirmDeleteOpened: boolean
  handleCloseConfirmDelete: () => void
  handleDeleteCompleted: () => Promise<void>
  deleteWarningText: string
  loading: boolean
}) {
  const { t } = useTranslation()

  return (
    <Dialog
      open={confirmDeleteOpened}
      maxWidth="xs"
      fullWidth
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseConfirmDelete}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        p={3}
      >
        <CloseButton color={'primary'} onClick={handleCloseConfirmDelete}>
          <CloseIcon />
        </CloseButton>
        <Typography
          sx={{
            mb: 3,
            pr: 4,
          }}
          variant="h5"
          fontWeight={'bold'}
        >
          {deleteWarningText}
        </Typography>

        <Button
          variant="outlined"
          fullWidth
          sx={{ mb: 1 }}
          onClick={handleCloseConfirmDelete}
        >
          {t('Cancel')}
        </Button>
        <LoadingButton
          {...addTestKey('confirm-remove-button')}
          loading={loading}
          color={'error'}
          onClick={handleDeleteCompleted}
          fullWidth
          variant="contained"
        >
          {t('Delete')}
        </LoadingButton>
      </Box>
    </Dialog>
  )
}
