import { useCallback, useState } from 'react'

export const useSelection = <T>({
  data,
}: {
  data?: Array<T & { id: number }>
}) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      setSelectedItems(() => {
        if (checked && data) {
          return data.map((item) => item.id)
        }
        return []
      })
    },
    [data],
  )

  const handleSelectOne = useCallback((id: number) => {
    setSelectedItems((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter((selectedId) => selectedId !== id)
      } else {
        return [...prevState, id]
      }
    })
  }, [])

  const resetSelected = useCallback(() => setSelectedItems([]), [])

  const selectedSome =
    data && selectedItems.length > 0 && selectedItems.length < data.length

  const hasSelectedItems = selectedItems.length > 0

  const selectedAll =
    data && selectedItems.length === data.length && hasSelectedItems

  const checkSelection = useCallback(
    (id: number) => selectedItems.includes(id),
    [selectedItems],
  )

  return {
    handleSelectAll,
    handleSelectOne,
    resetSelected,
    selectedSome,
    selectedAll,
    hasSelectedItems,
    checkSelection,
    selectedItems,
  }
}
