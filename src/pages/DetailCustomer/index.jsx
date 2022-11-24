function DetailCustomer () {
    return (
    <div className="container">
        <div className="wrapper">
            <div className="flex flex-row mt-4 italic text-lg">
                <div className="basis-1/2 flex flex-col mt-[4%]" >
                    <label className="font-semibold mb-1 text-xl">Mã khách hàng</label>
                    <div className="border h-10 text-lg border-gray-300 bg-gray-400 px-2 py-1 opacity-70 rounded-lg"/>
                </div>
            </div>

            <div className="flex flex-row mt-2 italic text-lg">
                <div className="basis-1/2 flex flex-col mt-2" >
                    <label className="font-semibold mb-1 text-xl" htmlFor="phone" defaultValue={0}>Số điện thoại</label>
                    <input type="number" id="phone" className="text-input px-2 py-1" required/>
                </div>
            </div>

            <div className="flex flex-row mt-2 italic text-lg">
                <div className="basis-1/2 flex flex-col mt-2" >
                    <label className="font-semibold mb-1 text-xl" htmlFor="name">Tên khách hàng</label>
                    <input type="text" id="name" className="text-input px-2 py-1" required/>
                </div>
            </div>

            <div className="flex flex-row mt-4 italic text-lg">
                <div className="w-full flex flex-col mr-2 mt-2" >
                    <label className="font-semibold mb-1 text-xl" htmlFor="address">Địa chỉ</label>
                    <input type="text" id="address" className="text-input px-2 py-1" required/>
                </div>
            </div>

            <div className="w-1/2 flex float-right flex-row mt-5 text-lg px-2">
                    <div className="basis-1/2 flex flex-col">                
                        <button className="btn btn-blue btn-md mr-[5%]">
                            <span className="pr-1">
                                    <i className="fa-solid fa-circle-xmark"></i>
                            </span>
                            <span>Quay lại</span>
                        </button>
                    </div>
                    <div className="basis-1/2 flex flex-col">
                    <button className="btn btn-green btn-md ml-[5%]">
                            <span className="pr-1">
                                <i className="fa-solid fa-circle-plus"></i>
                            </span>
                            <span>Cập nhật</span>
                        </button>
                    </div>
                </div>
        </div>
    </div>
    );
}
//
//
export default DetailCustomer;