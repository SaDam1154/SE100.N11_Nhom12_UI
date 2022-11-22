function Addroduct() {
    return (
        <div className="flex flex-row">
            <div className="basis-3/4    flex flex-col">
                <label className="unit font-bold" for="name">
                    Tên cây
                </label>
                <input
                    type="text"
                    id="name"
                    className="border cursor-pointer border-slate-200 hover:bg-slate-100"
                    required
                />

                <label className="unit font-bold" for="type">
                    Loại cây
                </label>
                <input
                    type="text"
                    className="border cursor-pointer border-slate-200 hover:bg-slate-100"
                    id="type"
                />

                <label className="unit font-bold" for="quantity">
                    Số lượng
                </label>
                <input
                    type="number"
                    value="1"
                    className="border cursor-pointer border-slate-200 hover:bg-slate-100"
                    id="quantity"
                    required
                />
            </div>
            <div className="basis-1/4 flex flex-col">
                <div className="grow text-center bg-zinc-900 text-white">
                    <h1>HÌNH</h1>
                </div>
            </div>
        </div>
    );
}
//
//
export default Addroduct;
