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
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/views/Orders'),
  },
  {
    path: '/order/:id',
    name: 'OrderId',
    component: () => import('@/views/Orders'),
    props: true
  },
  {
    path: '/offers',
    name: 'Offers',
    component: () => import('@/views/Offers'),
  },
  {
    path: '/offer/:id',
    name: 'OfferId',
    component: () => import('@/views/Offers'),
    props: true
  }
]
