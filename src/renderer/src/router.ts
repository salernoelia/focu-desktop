import { createRouter, createWebHistory } from 'vue-router'
import DashBoardPage from './pages/DashBoardPage.vue'
import TaskPage from './pages/task/[id].vue'
import CreatePage from './pages/task/CreatePage.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: DashBoardPage },
  { path: '/task/:id', name: 'TaskBoard', component: TaskPage },
  { path: '/:pathMatch(.*)*', redirect: '/' },
  { path: '/task/create', name: 'TaskCreation', component: CreatePage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
