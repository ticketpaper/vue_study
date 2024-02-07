import { createRouter,createWebHistory } from "vue-router";
import HomeComponent from '@/components/HomeComponent.vue'
import LoginComponent from '@/views/LoginComponent.vue'
// export default인 경우 {} 필요없고, 요소가 있을경우 {} 필요
import { memberRoutes } from "./memberRouter";
import { orderRoutes } from "./oredrRouter";

const routes = [
    {
        // url 경로 지정
        path: '/',
        // router의 이름 지정
        name: 'HOME',
        component: HomeComponent,
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginComponent,
    },
    // ...은 스프레드 연산자로 불리고, 주로, 배열 요소를 다른 배열 요소에 합할때 사용
    ...memberRoutes,
    ...orderRoutes
];



const router = createRouter({
    // vue router는 내부적으로 두가지 방식의 히스토리 관리를 제공
    // 1. createWebHistory 2. createHashHistory
    history: createWebHistory(),
    routes

});

export default router;