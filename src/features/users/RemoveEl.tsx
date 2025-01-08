import { memo } from 'react'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import { IconButton, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { addTestKey } from '@/utils/test-keys.ts'

export default memo(RemoveEl)
function RemoveEl({
  handleOpenConfirmDelete,
  hasSelectedItems,
}: {
  handleOpenConfirmDelete: (param?: number) => void
  hasSelectedItems: boolean
}) {
  const { t } = useTranslation()

  return (
    <>
      {hasSelectedItems && (
        <Tooltip title={t('deleteSelected')}>
          <IconButton
            {...addTestKey('remove-button')}
            color={'error'}
            onClick={() => handleOpenConfirmDelete()}
          >
            <DeleteTwoToneIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  )
}
