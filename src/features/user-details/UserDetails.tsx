import { Box } from '@mui/material'
import { useParams } from 'react-router'
import { useGetPostsQuery } from '@/features/user-details/data/api.ts'
import DetailsCard from '@/features/user-details/DetailsCard.tsx'
import Posts from '@/features/user-details/Posts.tsx'
import { useGetUsersQuery } from '@/features/users/data/api.ts'

export default function UserDetails() {
  const params = useParams()
  const users = useGetUsersQuery({ id: params.userId })
  const posts = useGetPostsQuery(
    { userId: String(users.data?.[0].id || 0) }, // 0 will never happen
    { skip: !users.data || users.data.length === 0 },
  )

  return (
    <Box px={{ xs: 1, md: 2 }} py={2}>
      <DetailsCard user={users.data?.[0]} />
      <Posts
        mt={2}
        posts={posts.data}
        isLoading={users.isLoading || posts.isLoading}
      />
    </Box>
  )
}
