import GroupMenu from './GroupMenu';

const groupMenus = [
    {
        main: {
            iconClassname: 'fa-solid fa-house',
            text: 'Trang chủ',
            link: '/',
        },
    },

    {
        main: {
            iconClassname: 'fa-solid fa-box-open',
            text: 'Sản phẩm',
            link: '/product',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
                functionName: 'product/read',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
                functionName: 'product/create',
            },
        ],
    },

    {
        main: {
            iconClassname: 'fa-solid fa-boxes-stacked',
            text: 'Loại sản phẩm',
            link: '/product-type',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
                functionName: 'product-type/read',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
                functionName: 'product-type/create',
            },
        ],
    },
    {
        main: {
            iconClassname: 'fa-solid fa-users',
            text: 'Khách hàng',
            link: '/customer',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
                functionName: 'customer/read',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
                functionName: 'customer/create',
            },
        ],
    },
    {
        main: {
            iconClassname: 'fa-solid fa-clipboard',
            text: 'Hoá đơn',
            link: '/order',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
                functionName: 'order/read',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
                functionName: 'order/create',
            },
        ],
    },
    {
        main: {
            iconClassname: ' fa-solid fa-user',
            text: 'Tài khoản',
            link: '/account',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
                functionName: 'account/read',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
                functionName: 'account/create',
            },
        ],
    },
    // {
    //     main: {
    //         iconClassname: 'fa-solid fa-users',
    //         text: 'Báo cáo',
    //         link: '/dashboard',
    //     },
    // },
    {
        main: {
            iconClassname: 'fa-solid fa-clipboard',
            text: 'Chức vụ',
            link: '/role',
        },
        children: [
            {
                iconClassname: 'fa-solid fa-list',
                text: 'Danh sách',
                link: '/',
                functionName: 'role/read',
            },
            {
                iconClassname: 'fa-solid fa-circle-plus',
                text: 'Thêm',
                link: '/add',
                functionName: 'role/create',
            },
        ],
    },
];

function Sidebar() {
    return (
        <div className="flex h-full min-w-[240px] flex-col bg-blue-500">
            <header className="mb-8 flex h-16 w-full select-none flex-col items-center justify-center text-white">
                <div className="text-lg font-extrabold">QUẢN LÝ</div>
                <div className="font-bold">CỬA HÀNG CÂY XANH</div>
            </header>

            <ul className="flex select-none flex-col space-y-0.5 overflow-y-auto p-2 ">
                {groupMenus.map((groupMenu, index) => (
                    <GroupMenu key={index} groupMenu={groupMenu} />
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
