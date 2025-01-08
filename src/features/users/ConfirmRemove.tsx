import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import ConfirmDelete from '@/components/ConfirmDeleteUI.tsx'
import { useRemoveUserMutation } from '@/features/users/data/api.ts'

export default function ConfirmRemove({
  confirmDeleteOpened,
  handleCloseConfirmDelete,
  selectedItems,
  resetSelected,
}: {
  confirmDeleteOpened: boolean
  handleCloseConfirmDelete: () => void
  selectedItems: number[]
  resetSelected: () => void
}) {
  const { t } = useTranslation()

  const [deleteItem, removeMutation] = useRemoveUserMutation()

  const deleteCompleted = useCallback(async () => {
    try {
      for (const id of selectedItems) {
        await deleteItem(id)
      }
      resetSelected()
    } catch (e) {
      console.error(e)
    } finally {
      handleCloseConfirmDelete()
    }
  }, [deleteItem, handleCloseConfirmDelete, resetSelected, selectedItems])

  return (
    <ConfirmDelete
      loading={removeMutation.isLoading}
      confirmDeleteOpened={confirmDeleteOpened}
      handleCloseConfirmDelete={handleCloseConfirmDelete}
      handleDeleteCompleted={deleteCompleted}
      deleteWarningText={t('deleteWarningUsers')}
    />
  )
}
