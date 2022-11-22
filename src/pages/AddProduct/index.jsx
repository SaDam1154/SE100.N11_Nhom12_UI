function Addroduct() {
    return (
        <div className="flex flex-row">
            <div className="flex    basis-3/4 flex-col">
                <label className="unit font-bold" htmlFor="name">
                    Tên cây
                </label>
                <input type="text" id="name" className="text-input py-2" required />

                <label className="unit font-bold" htmlFor="type">
                    Loại cây
                </label>
                <input type="text" className="text-input py-2" id="type" />

                <label className="unit font-bold" htmlFor="quantity">
                    Số lượng
                </label>
                <input type="number" value="1" className="text-input py-2" id="quantity" required />
            </div>
            <div className="flex basis-1/4 flex-col">
                <div className="grow bg-zinc-900 text-center text-white">
                    <h1>HÌNH</h1>
                </div>
            </div>
        </div>
    );
}
//
//
export default Addroduct;
