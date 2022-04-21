// const routes = [
//   {
//     path: '/',
//     component: () => import('layouts/MainLayout.vue'),
//     children: [
//       {
//         path: '/',
//         component: () => import('pages/Home.vue'),
//         name: 'home'
//       },
//       {
//         path: '/follow',
//         component: () => import('pages/SearchFollow.vue'),
//         name: 'follow'
//       },
//       {
//         path: '/settings',
//         component: () => import('pages/Settings.vue'),
//         name: 'settings'
//       },
//       {
//         path: '/messages',
//         component: () => import('pages/Chats.vue'),
//         name: 'messages'
//       },
//       {
//         path: '/messages/:pubkey',
//         component: () => import('pages/Messages.vue'),
//         name: 'chat'
//       },
//       {
//         path: '/event/:eventId',
//         component: () => import('pages/Event.vue'),
//         name: 'event'
//       },
//       {
//         path: '/notifications',
//         component: () => import('pages/Notifications.vue'),
//         name: 'notifications'
//       },
//       {
//         path: '/:pubkey',
//         component: () => import('pages/Profile.vue'),
//         name: 'profile'
//       }
//     ]
//   },
//   {
//     path: '/:catchAll(.*)*',
//     component: () => import('pages/Error404.vue')
//   }
// ]

// export default routes

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/Home.vue'),
        name: 'home'
      },
      {
        path: '/write',
        component: () => import('pages/Writer/Writer.vue'),
        name: 'write'
      },
      {
        path: '/settings',
        component: () => import('src/pages/Settings/Settings.vue'),
        name: 'settings'
      },
      {
        path: '/post/:userId/:eventId',
        component: () => import('pages/ArticleView/ArticleView.vue'),
        name: 'post',
        props: true
      },
      {
        path: '/:pubkey',
        component: () => import('pages/Profile/Profile.vue'),
        name: 'profile'
      },
      {
        path: '/myposts/:pubkey',
        component: () => import('pages/UserPosts/UserPosts.vue'),
        name: 'userPosts'
      },
      {
        path: '/notifications',
        component: () => import('pages/Notifications/Notifications.vue'),
        name: 'notifications'
      },
      {
        path: '/settings',
        component: () => import('pages/Settings/Settings.vue'),
        name: 'settings'
      },
      {
        path: '/messages/:pubkey',
        component: () => import('src/pages/Messages/Messages.vue'),
        name: 'chat'
      },
      {
        path: '/messages',
        component: () => import('pages/Chats/Chats.vue'),
        name: 'messages'
      },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
