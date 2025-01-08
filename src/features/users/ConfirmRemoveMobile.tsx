import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import ConfirmDelete from '@/components/ConfirmDeleteUI.tsx'
import { useRemoveUserMutation } from '@/features/users/data/api.ts'

export default function ConfirmRemoveMobile({
  confirmDeleteOpened,
  handleCloseConfirmDelete,
  idToRemove,
}: {
  confirmDeleteOpened: boolean
  handleCloseConfirmDelete: () => void
  idToRemove: number
}) {
  const [deleteItem, removeMutation] = useRemoveUserMutation()

  const { t } = useTranslation()

  const deleteCompleted = useCallback(async () => {
    try {
      await deleteItem(idToRemove)
    } catch (e) {
      console.error(e)
    } finally {
      handleCloseConfirmDelete()
    }
  }, [deleteItem, handleCloseConfirmDelete, idToRemove])

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
