function Addroduct() {
    return (
        <div className="flex flex-row">
            <div className="basis-3/4    flex flex-col">
                <label class="unit font-bold" for="name">
                    Tên cây
                </label>
                <input
                    type="text"
                    id="name"
                    class="border cursor-pointer border-slate-200 hover:bg-slate-100"
                    required
                />

                <label class="unit font-bold" for="type">
                    Loại cây
                </label>
                <input
                    type="text"
                    class="border cursor-pointer border-slate-200 hover:bg-slate-100"
                    id="type"
                />

                <label class="unit font-bold" for="quantity">
                    Số lượng
                </label>
                <input
                    type="number"
                    value="1"
                    class="border cursor-pointer border-slate-200 hover:bg-slate-100"
                    id="quantity"
                    required
                />
            </div>
            <div className="basis-1/4 flex flex-col">
                <div class="grow text-center bg-zinc-900 text-white">
                    <h1>HÌNH</h1>
                </div>
            </div>
        </div>
    );
}
//
//
export default Addroduct;
