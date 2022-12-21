function CustomerInput() {
    return (
        <div className="flex space-x-4 rounded-md border py-2 px-2 shadow">
            <div className="flex w-56 flex-col">
                <label className="mb-1 font-semibold" htmlFor="phone">
                    Số điện thoại
                </label>
                <input type="text" className="text-input py-1" id="phone" placeholder="Số điện thoại" />
            </div>
            <div className="flex w-64 flex-col">
                <label className="mb-1 font-semibold" htmlFor="name">
                    Tên khách hàng
                </label>
                <input type="text" className="text-input py-1" id="name" placeholder="Tên khách hàng" />
            </div>
            <div className="flex grow flex-col">
                <label className="mb-1 font-semibold" htmlFor="address">
                    Địa chỉ
                </label>
                <input type="text" className="text-input py-1" id="address" placeholder="Địa chỉ" />
            </div>
        </div>
    );
}

export default CustomerInput;
