import { useMemo } from 'react'
import { avataaars } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import {
  Avatar,
  ListItemAvatar,
  TypographyProps,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { useTranslation } from 'react-i18next'
import TypographySkeleton from '@/components/TypographySkeleton.tsx'
import CommentsSkeleton from '@/features/user-details/CommentsSkeleton.tsx'
import { useGetCommentsQuery } from '@/features/user-details/data/api.ts'
import {
  generateRandomString,
  typographyPropsObj,
} from '@/features/user-details/data/service.tsx'
import { CommentType } from '@/features/user-details/data/types.ts'
import { addTestKey } from '@/utils/test-keys.ts'

export default function Comments({ postId }: { postId: string }) {
  const { data: comments, isLoading } = useGetCommentsQuery({ postId })

  const { t } = useTranslation()
  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))

  const typographyProps = useMemo(
    (): Record<'title' | 'paragraph' | 'paragraphTitle', TypographyProps> =>
      isDownMd ? typographyPropsObj.mobile : typographyPropsObj.desktop,
    [isDownMd],
  )

  return (
    <>
      <TypographySkeleton
        {...typographyProps.paragraphTitle}
        fontWeight={'bold'}
        mt={3}
        ml={2}
      >
        {t('Comments')}:
      </TypographySkeleton>

      <List sx={{ width: '100%', maxWidth: '60rem' }}>
        {isLoading && !comments && <CommentsSkeleton />}
        {comments?.map((comment, idx, arr) => (
          <Comment
            key={comment.id}
            comment={comment}
            last={idx === arr.length - 1}
          />
        ))}
      </List>
    </>
  )
}

function Comment({ comment, last }: { comment: CommentType; last: boolean }) {
  const avatar = useMemo(() => {
    return createAvatar(avataaars, {
      seed: generateRandomString(),
      size: 128,
    }).toDataUri()
  }, [])

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={comment.email} src={avatar} />
        </ListItemAvatar>
        <ListItemText
          {...addTestKey('comments')}
          primary={comment.name}
          secondary={comment.body}
        />
      </ListItem>
      {!last && <Divider variant={'inset'} component="li" />}
    </>
  )
}
