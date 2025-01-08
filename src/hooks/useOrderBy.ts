import { useCallback, useState } from 'react'
import { Order, SortKeys } from '@/features/users/data/types.ts'

export const useOrderBy = () => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<SortKeys>('name')

  const handleSort = useCallback(
    (property: SortKeys) => {
      setOrder((prev) => {
        const isAsc = orderBy === property && prev === 'asc'
        return isAsc ? 'desc' : 'asc'
      })
      setOrderBy(property)
    },
    [orderBy],
  )

  return { handleSort, orderBy, order }
}
