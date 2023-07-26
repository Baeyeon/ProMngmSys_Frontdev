import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
// 注意import后面的名称不能 用数字开头！！


const routes = [
    {
        path: '/',
        redirect: "/Login",
    },
    //登录界面
    {
        path: '/Login',
        name: 'Login',
        component: () => import("@/view/LoginPage.vue"),
    },

    //主页、个人门户
    {
        path: "/PersonalPortal",
        name: "show",
        component: () => import("@/view/Layout.vue"),
        children: [
            //个人门户
            {
                path: '/PersonalPortal',
                name: 'PersonalPortal',
                component: () => import("@/view/tables/PersonalPortal.vue"),
            },
            //项目列表看板
            {
                path: '/projectDisplayBoard',
                name: 'ProjectDisplayBoard',
                component: () => import("@/view/projectDisplayBoard/index.vue"),
            },
            //项目列表看板详情
            {
                path: '/projectDisplayBoardDetail',
                name: 'ProjectDisplayBoardDetail',
                component: () => import("@/view/projectDisplayBoard/detail.vue"),
            },
            //项目系列看板
            {
                path: '/projectSeriesDisplayBoard',
                name: 'ProjectSeriesDisplayBoard',
                component: () => import("@/view/projectSeriesDisplayBoard/index.vue"),
            },
            //客户管理
            {
                path: '/Customer_Management',
                name: 'Customer_Management',
                component: () => import("@/view/tables/Customer_Management.vue"),
            },
            //供应商分类管理
            {
                path: '/Supplier_Classification_Management',
                name: 'Supplier_Classification_Management',
                component: () => import("@/view/tables/Supplier_Classification_Management.vue"),
            },
            //供应商管理
            {
                path: '/Supplier_Management',
                name: 'Supplier_Management',
                component: () => import("@/view/tables/Supplier_Management.vue"),
            },
            //人员管理
            {
                path: '/Personnel_Management',
                name: 'Personnel_Management',
                component: () => import("@/view/tables/Personnel_Management.vue"),
            },
            //部门管理
            {
                path: '/departmentManagement',
                name: 'departmentManagement',
                component: () => import("@/view/tables/departmentManagement.vue"),
            },
            //支付方式管理
            {
                path: '/Payment_method_management',
                name: 'Payment_method_management',
                component: () => import("@/view/tables/Payment_method_management.vue"),
            },
            //项目管理员配置
            {
                path: '/Project_Administrator_Configuration',
                name: 'Project_Administrator_Configuration',
                component: () => import("@/view/tables/Project_Administrator_Configuration.vue"),
            },
            //项目类型管理
            {
                path: '/Project_type_management',
                name: 'Project_type_management',
                component: () => import("@/view/tables/Project_type_management.vue"),
            },
            //项目列表
            {
                path: '/project_list',
                name: 'project_list',
                component: () => import("@/view/tables/project_list.vue"),
            },
            //系列列表
            {
                path: '/sequence_list',
                name: 'sequence_list',
                component: () => import("@/view/tables/sequence_list.vue"),
            },
            {
                path: '/Undo',
                name: 'Undo',
                component: () => import("@/view/Undo.vue"),
            },
            {
                path: '/vue1',
                name: 'vue1',
                component: import("@/components/Vue1.vue"),
            },
        ]
    },



    //流程图
    {
        path: '/routinesBoard',
        name: 'routinesBoard',
        component: () => import("@/view/routinesBoard.vue"),
    },

    //404界面
    {
        path: '/:catchAll(.*)', //404正则表达式，不能用*了
        name: '404',
        component: () => import("@/view/404.vue"),
    },
    {
        path: "/vue1",
        name: "vue1",
        component: () => import("@/components/Vue1.vue"),
    },


    // {
    //     path: "/undo",
    //     name: "undo",
    //     component: () => import("@/view/Undo.vue"),
    // },

];

const router = createRouter({
    // history: createWebHashHistory(),
    history: createWebHistory(),    //去掉＃
    routes,
});

// // 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//     if (to.path === '/login') return next()
//     // 从sessionStorage中获取保存到的token值
//     const tokenStr = window.sessionStorage.getItem('token')
//     if (!(tokenStr === 'true')) return next('/login')
//     next()
//   })

export default router;
