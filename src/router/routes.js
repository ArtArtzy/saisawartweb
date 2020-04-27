
const routes = [
  {
    path: '/',
    component: () => import('pages/main.vue'),
    name: 'main'

  },
  {
    path: '/info',
    component: () => import('pages/info.vue'),
    name: 'info'

  },
  {
    path: '/furniture',
    component: () => import('pages/furniture.vue'),
    name: 'furniture'

  },
  {
    path: '/detail/:cat/:id',
    component: () => import('pages/productdetail.vue'),
    name: 'detail'

  },
  {
    path: '/login',
    component: () => import('pages/login.vue'),
    name: 'login'

  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/category",
        component: () => import("pages/category.vue"),
        name: "categoryList"
      },
    ]
  }

]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
