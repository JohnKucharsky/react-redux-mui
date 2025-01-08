import { memo, SyntheticEvent, useMemo } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { TypographyProps, useMediaQuery, useTheme } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import Comments from '@/features/user-details/Comments.tsx'
import { typographyPropsObj } from '@/features/user-details/data/service.tsx'
import { Post } from '@/features/user-details/data/types.ts'
import { addTestKey } from '@/utils/test-keys.ts'

export default memo(AccordionItem)
function AccordionItem({
  handleChange,
  isExpanded,
  post,
}: {
  handleChange: (_event: SyntheticEvent, isExpanded: boolean) => void
  isExpanded: boolean
  post: Post
}) {
  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))

  const typographyProps = useMemo(
    (): Record<'title' | 'paragraph' | 'paragraphTitle', TypographyProps> =>
      isDownMd ? typographyPropsObj.mobile : typographyPropsObj.desktop,
    [isDownMd],
  )

  return (
    <Accordion
      expanded={isExpanded}
      onChange={handleChange}
      elevation={3}
      key={post.id}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography
          {...addTestKey('posts')}
          {...typographyProps.paragraphTitle}
          fontWeight={'bold'}
        >
          {post.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {post.body}
        {isExpanded && <Comments postId={String(post.id)} />}
      </AccordionDetails>
    </Accordion>
  )
}
