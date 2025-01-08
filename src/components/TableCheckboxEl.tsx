import { memo } from 'react'
import { Checkbox, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default memo(TableCheckboxEl)
function TableCheckboxEl({
  selectedSome,
  selectedAll,
  handleSelectAll,
}: {
  selectedSome: boolean
  selectedAll: boolean
  handleSelectAll: (param: boolean) => void
}) {
  const { t } = useTranslation()

  return (
    <Tooltip arrow placement="top" title={t('selectAll')}>
      <Checkbox
        size={'small'}
        checked={Boolean(selectedAll)}
        indeterminate={Boolean(selectedSome)}
        onChange={(e) => handleSelectAll(e.target.checked)}
      />
    </Tooltip>
  )
}
