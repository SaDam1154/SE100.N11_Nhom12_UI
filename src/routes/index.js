// Layouts

// Pages
import Home from "../pages/Home";
import Products from "../pages/Products";
import AddProduct from "../pages/AddProduct";
import Customers from "../pages/Customers";
import Dashboard from "../pages/Dashboard";
import Rules from "../pages/Rules";
import DetailTree from "../pages/DetailTree";
import DetailCustomer from "../pages/DetailCustomer";

// Public routes
const publicRoutes = [
    {
        path: "/",
        component: Home,
        props: {
            heading: "Trang chủ",
        },
    },
    {
        path: "/product",
        component: Products,
        props: {
            heading: "Danh sách sản phẩm",
        },
    },
    {
        path: "/product/detailtree",
        component: DetailTree,
        props: {
            heading: "Chi tiết sản phẩm",
        },
    },
    {
        path: "/product/detailcus",
        component: DetailCustomer,
        props: {
            heading: "Chi tiết khách hàng",
        },
    },
    {
        path: "/product/add",
        component: AddProduct,
        props: {
            heading: "Thêm sản phẩm",
        },
    },
    {
        path: "/customers",
        component: Customers,
        props: {
            heading: "Khách hàng",
        },
    },
    ,
    {
        path: "/dashboard",
        component: Dashboard,
        props: {
            heading: "Báo cáo",
        },
    },
    {
        path: "/rules",
        component: Rules,
        props: {
            heading: "Quy định",
        },
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
