// Layouts
import FullLayout from '../layouts/FullLayout';

// Pages
import Home from '../pages/Home';
import Order from '../pages/Order';
import AddOrder from '../pages/AddOrder';
import Products from '../pages/Products';
import AddProduct from '../pages/AddProduct';
import ProductType from '../pages/ProductType';
import ProductsView from '../pages/ProductsView';
import Customers from '../pages/Customers';
import Dashboard from '../pages/Dashboard';
import Rules from '../pages/Rules';
import DetailTree from '../pages/DetailTree';
import DetailCustomer from '../pages/DetailCustomer';
import Login from '../pages/Login';
import AddRule from '../pages/AddRule';
import UpdateRule from '../pages/UpdateRule';
import UpdateProduct from '../pages/UpdateProduct';
import AddCustomer from '../pages/AddCustomer';
import UpdateCustomer from '../pages/UpdateCustomer';
import AddProductType from '../pages/AddProductType';
import DetailTypeProduct from '../pages/DetailTypeProduct';
import UpdateProductType from '../pages/UpdateProductType';

// Public routes
const publicRoutes = [
    {
        path: '/',
        component: Home,
        props: {
            heading: 'Trang chủ',
        },
    },
    {
        path: '/order',
        component: Order,
        props: {
            heading: 'Order',
        },
    },

    {
        path: '/order/add',
        component: AddOrder,
        props: {
            heading: 'Đặt thêm sản phẩm',
        },
    },
    {
        path: '/product',
        component: Products,
        props: {
            heading: 'Danh sách sản phẩm',
        },
    },
    {
        path: '/product/detail/:id',
        component: DetailTree,
        props: {
            heading: 'Chi tiết sản phẩm',
        },
    },
    {
        path: '/product/add',
        component: AddProduct,
        props: {
            heading: 'Thêm sản phẩm',
        },
    },
    {
        path: '/product-type',
        component: ProductType,
        props: {
            heading: 'Danh sách loại cây',
        },
    },
    {
        path: '/product-type/add',
        component: AddProductType,
        props: {
            heading: 'Thêm mới loại sản phẩm',
        },
    },
    {
        path: '/product-type/detail/:id',
        component: DetailTypeProduct,
        props: {
            heading: 'Chi tiết loại sản phẩm',
        },
    },
    {
        path: '/product-type/update/:id',
        component: UpdateProductType,
        props: {
            heading: 'Chỉnh sửa loại sản phẩm',
        },
    },
    {
        path: '/product/update/:id',
        component: UpdateProduct,
        props: {
            heading: 'Chỉnh sửa sản phẩm',
        },
    },
    {
        path: '/product/views',
        component: ProductsView,
        props: {
            heading: 'Thêm sản phẩm',
        },
    },
    {
        path: '/customers',
        component: Customers,
        props: {
            heading: 'Khách hàng',
        },
    },
    {
        path: '/customers/detail/:id',
        component: DetailCustomer,
        props: {
            heading: 'Chi tiết khách hàng',
        },
    },
    {
        path: '/customers/addcustomer',
        component: AddCustomer,
        props: {
            heading: 'Thêm khách hàng',
        },
    },
    {
        path: '/customers/updatecustomer/:id',
        component: UpdateCustomer,
        props: {
            heading: 'Chỉnh sửa khách hàng',
        },
    },
    ,
    {
        path: '/dashboard',
        component: Dashboard,
        props: {
            heading: 'Báo cáo',
        },
    },
    {
        path: '/rules',
        component: Rules,
        props: {
            heading: 'Quy định',
        },
    },
    {
        path: '/rules/addrule',
        component: AddRule,
        props: {
            heading: 'Thêm chức vụ',
        },
    },
    {
        path: '/rules/updaterule',
        component: UpdateRule,
        props: {
            heading: 'Sửa chức vụ',
        },
    },
    {
        path: '/login',
        layout: FullLayout,
        component: Login,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
