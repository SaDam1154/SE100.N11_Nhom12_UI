import GroupMenu from './GroupMenu';

function Sidebar() {
    return (
        <div className="min-w-[240px] flex h-full flex-col bg-blue-500">
            <header className="mb-8 h-16 w-full bg-slate-400"></header>

            <ul className="flex flex-col space-y-1 overflow-y-auto p-2">
                <li>
                    <div className="active group flex cursor-pointer items-center justify-between rounded-md px-4 py-3 text-white hover:bg-blue-400 [&.active]:bg-blue-400">
                        <div className="flex items-center">
                            <span className="pr-2">
                                <i className="fa-solid fa-house"></i>
                            </span>
                            <span className="font-medium">Trang chủ</span>
                        </div>
                        <span className="hidden transition group-[&.open]:rotate-90">
                            <i className="fa-solid fa-chevron-right"></i>
                        </span>
                    </div>
                </li>

                <GroupMenu></GroupMenu>
                <GroupMenu></GroupMenu>
            </ul>
        </div>
    );
}

export default Sidebar;
