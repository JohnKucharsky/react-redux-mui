import { Fragment } from 'react'
import { Box, ListItemAvatar, Skeleton } from '@mui/material'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { addTestKey } from '@/utils/test-keys.ts'

export default function CommentsSkeleton() {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Fragment key={i}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Skeleton
                  variant={'circular'}
                  width={'2.5rem'}
                  height={'2.5rem'}
                />
              </ListItemAvatar>
              <ListItemText
                {...addTestKey('comments')}
                primary={
                  <Box mb={1}>
                    <Skeleton
                      variant={'rounded'}
                      width={'10rem'}
                      height={'1rem'}
                    />
                  </Box>
                }
                secondary={
                  <Skeleton
                    variant={'rounded'}
                    width={'12rem'}
                    height={'1rem'}
                  />
                }
              />
            </ListItem>
            {i !== 9 && <Divider variant={'inset'} component="li" />}
          </Fragment>
        ))}
    </>
  )
}
