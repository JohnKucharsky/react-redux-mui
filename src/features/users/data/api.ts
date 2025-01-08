import { z } from 'zod'
import { PartialUser, User, UserSchema } from '@/features/users/data/types.ts'
import { baseApi } from '@/redux/utils.ts'
import { apiRoutesV2 } from '@/utils/constants.ts'
import { getQueryString } from '@/utils/helpers.ts'

const usersApiSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<
      User[],
      {
        id?: string
      }
    >({
      query: (params) => `${apiRoutesV2['users']}${getQueryString(params)}`,
      transformResponse: (res) => z.array(UserSchema).parse(res),
    }),
    addUser: build.mutation<User, Omit<PartialUser, 'id'>>({
      query: (data) => ({
        url: apiRoutesV2['users'],
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: user } = await queryFulfilled
          dispatch(
            usersApiSlice.util.updateQueryData('getUsers', {}, (draft) => {
              draft.unshift(user)
            }),
          )
        } catch (e) {
          console.error(e)
        }
      },
    }),
    editUser: build.mutation<User, PartialUser>({
      query: (data) => ({
        url: `${apiRoutesV2['users']}/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedUser } = await queryFulfilled

          dispatch(
            usersApiSlice.util.updateQueryData('getUsers', {}, (draft) => {
              const index = draft.findIndex(
                (user) => user.id === updatedUser.id,
              )
              if (index !== -1) draft[index] = updatedUser
            }),
          )
        } catch (e) {
          console.error(e)
        }
      },
    }),
    removeUser: build.mutation<unknown, number>({
      query: (id) => ({
        url: `${apiRoutesV2['users']}/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            usersApiSlice.util.updateQueryData('getUsers', {}, (draft) => {
              const index = draft.findIndex((item) => item.id === id)
              draft.splice(index, 1)
            }),
          )
        } catch (e) {
          console.error(e)
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useEditUserMutation,
  useRemoveUserMutation,
} = usersApiSlice
