import { useCallback, useState } from 'react'

export const useRemove = () => {
  const [confirmDeleteOpened, setConfirmDeleteOpened] = useState<boolean>(false)
  const [idToRemove, setIdToRemove] = useState<number>(0)

  const handleCloseConfirmDelete = useCallback(
    () => setConfirmDeleteOpened(false),
    [],
  )
  const handleOpenConfirmDelete = useCallback((id?: number) => {
    if (id) setIdToRemove(id)
    setConfirmDeleteOpened(true)
  }, [])

  return {
    confirmDeleteOpened,
    handleCloseConfirmDelete,
    handleOpenConfirmDelete,
    idToRemove,
  }
}
