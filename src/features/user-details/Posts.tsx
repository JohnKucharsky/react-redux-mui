import { SyntheticEvent, useCallback, useMemo, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Box,
  BoxProps,
  Skeleton,
  TypographyProps,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import { useTranslation } from 'react-i18next'
import TypographySkeleton from '@/components/TypographySkeleton.tsx'
import { typographyPropsObj } from '@/features/user-details/data/service.tsx'
import { Post } from '@/features/user-details/data/types.ts'
import AccordionItem from '@/features/users/AccordionItem.tsx'

export default function Posts({
  posts,
  isLoading,
  ...props
}: { posts?: Post[]; isLoading: boolean } & BoxProps) {
  const [expanded, setExpanded] = useState<string | false>(false)

  const { t } = useTranslation()
  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))

  const handleChange = useCallback(
    (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    },
    [],
  )

  const typographyProps = useMemo(
    (): Record<'title' | 'paragraph' | 'paragraphTitle', TypographyProps> =>
      isDownMd ? typographyPropsObj.mobile : typographyPropsObj.desktop,
    [isDownMd],
  )

  return (
    <Box {...props}>
      <TypographySkeleton
        {...typographyProps.title}
        fontWeight={'bold'}
        mb={2}
        mt={3}
      >
        {t('Posts')}
      </TypographySkeleton>
      {isLoading && !posts && <AccordionSkeleton />}
      {posts?.map((post, idx) => (
        <AccordionItem
          key={post.id}
          post={post}
          isExpanded={expanded === `panel${idx}`}
          handleChange={handleChange(`panel${idx}`)}
        />
      ))}
    </Box>
  )
}

const AccordionSkeleton = () => {
  return Array(10)
    .fill(0)
    .map((_, i) => (
      <Accordion elevation={3} key={i}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Skeleton width={'60%'} height={'2.5rem'} />
        </AccordionSummary>
      </Accordion>
    ))
}
