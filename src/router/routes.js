
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
    path: '/furniture/:cat',
    component: () => import('pages/product.vue'),
    name: 'Furniture'

  },
  {
    path: '/homedecor/:cat',
    component: () => import('pages/product2.vue'),
    name: 'Homedecor'

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
        path: "/category/:page",
        component: () => import("pages/category.vue"),
        name: "categoryList"
      },
      {
        path: "/category/add/:page",
        component: () => import("pages/categoryAdd.vue"),
        name: "categoryAdd"
      },
      {
        path: "/category/edit/:id",
        component: () => import("pages/categoryEdit.vue"),
        name: "categoryEdit"
      },
      {
        path: "/setting",
        component: () => import("pages/setting.vue"),
        name: "setting"
      },
      {
        path: "/member",
        component: () => import("pages/member.vue"),
        name: "member"
      },
      {
        path: "/product/:page",
        component: () => import("pages/productMain.vue"),
        name: "productList"
      },
      {
        path: "/product/add/:page",
        component: () => import("pages/productAdd.vue"),
        name: "productAdd"
      },
      {
        path: "/product/edit/:id",
        component: () => import("pages/productEdit.vue"),
        name: "productEdit"
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
