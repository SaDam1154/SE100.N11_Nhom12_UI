// Layouts

// Pages
import Home from '../pages/Home';
import Products from '../pages/Products';
import AddProduct from '../pages/AddProduct';

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
        path: '/product',
        component: Products,
        props: {
            heading: 'Danh sách sản phẩm',
        },
    },
    {
        path: '/product/add',
        component: AddProduct,
        props: {
            heading: 'Thêm sản phẩm',
        },
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
