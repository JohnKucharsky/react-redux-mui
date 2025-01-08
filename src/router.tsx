import { Route, Routes } from 'react-router'
import UserDetails from '@/features/user-details/UserDetails.tsx'
import Users from '@/features/users/Users.tsx'
import Layout from '@/layout/Layout.tsx'

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Users />} />
        <Route path={'/user/:userId'} element={<UserDetails />} />
      </Route>
    </Routes>
  )
}
