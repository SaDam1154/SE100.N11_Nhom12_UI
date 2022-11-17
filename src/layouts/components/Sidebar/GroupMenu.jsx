import { useState } from 'react';
import clsx from 'clsx';

const groupMenu = {
    main: {
        iconClassname: 'fa-solid fa-box-open',
        text: 'Sản phẩm',
    },
    children: [
        {
            iconClassname: 'fa-solid fa-list',
            text: 'Danh sách',
            link: '/products',
        },
        {
            iconClassname: 'fa-solid fa-circle-plus',
            text: 'Thêm',
            link: '/products-add',
        },
    ],
};

function GroupMenu() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <li>
            <div
                className={clsx(
                    'group peer flex cursor-pointer items-center justify-between rounded-md px-4 py-3 text-white hover:bg-blue-400 [&.active]:bg-blue-400',
                    {
                        open: isOpen,
                    }
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center">
                    <span className="pr-2">
                        <i className={groupMenu.main.iconClassname}></i>
                    </span>
                    <span className="font-medium">{groupMenu.main.text}</span>
                </div>
                <span className="transition group-[&.open]:rotate-90">
                    <i className="fa-solid fa-chevron-right"></i>
                </span>
            </div>
            {isOpen && (
                <ul className=" space-y-2 ">
                    {groupMenu.children.map((item, index) => (
                        <li className="flex cursor-pointer items-center pl-10 pr-3 text-white hover:underline [&.active]:underline">
                            <span className="pr-2">
                                <i className={item.iconClassname}></i>
                            </span>
                            <span>{item.text}</span>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}

export default GroupMenu;
