import { z } from 'zod'
import {
  CommentSchema,
  CommentType,
  Post,
  PostSchema,
} from '@/features/user-details/data/types.ts'
import { baseApi } from '@/redux/utils.ts'
import { apiRoutesV2 } from '@/utils/constants.ts'
import { getQueryString } from '@/utils/helpers.ts'

const userDetailsApiSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<
      Post[],
      {
        userId: string
      }
    >({
      query: (params) => `${apiRoutesV2['posts']}${getQueryString(params)}`,
      transformResponse: (res) => z.array(PostSchema).parse(res),
    }),
    getComments: build.query<
      CommentType[],
      {
        postId: string
      }
    >({
      query: (params) => `${apiRoutesV2['comments']}${getQueryString(params)}`,
      transformResponse: (res: CommentType[]) =>
        z.array(CommentSchema).parse(res),
    }),
  }),
  overrideExisting: false,
})

export const { useGetPostsQuery, useGetCommentsQuery } = userDetailsApiSlice
