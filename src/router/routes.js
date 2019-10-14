
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { name: 'Inicio', path: 'inicio', component: () => import('pages/Inicio.vue') },
      { name: 'Carrinho', path: 'carrinho', component: () => import('pages/Carrinho.vue')}
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue'), meta: { title: 'Login' } },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Index.vue')
  })
}

export default routes
