export default [
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile')
  },
  {
    path: '/profile/:id',
    name: 'ProfileId',
    component: () => import('@/views/Profile'),
    props: true
  }
]
