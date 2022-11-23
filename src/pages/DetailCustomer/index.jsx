function DetailCustomer () {
    return (
    <div className="wrapper mr-[15%] ml-[10%]">
        <div className="flex flex-row mt-4 italic text-lg">
            <div className="basis-1/2 flex flex-col mt-[4%]" >
                <label className="font-bold mb-1 text-xl">Mã khách hàng</label>
                <div className="border h-10 text-lg border-gray-300 bg-gray-400 px-2 py-1 opacity-70 rounded-lg"/>
            </div>
        </div>

        <div className="flex flex-row mt-2 italic text-lg">
            <div className="basis-1/2 flex flex-col mt-2" >
                <label className="font-bold mb-1 mt-2 text-xl" htmlFor="phone" defaultValue={0}>Số điện thoại</label>
                <input type="number" id="phone" className="border cursor-pointer w-full border-gray-300 px-2 py-1 opacity-80 rounded-lg focus:text-black" required/>
            </div>
        </div>

        <div className="flex flex-row mt-2 italic text-lg">
            <div className="basis-1/2 flex flex-col mt-2" >
                <label className="font-bold mb-1 mt-2 text-xl" htmlFor="name">Tên khách hàng</label>
                <input type="text" id="name" className="border cursor-pointer border-gray-300 px-2 py-1 opacity-80 rounded-lg" required/>
            </div>
        </div>

        <div className="flex flex-row mt-5 italic text-lg">
            <div className="w-full flex flex-col mr-2 mt-2" >
                <label className="font-bold mb-1 mt-2 text-xl" htmlFor="address">Địa chỉ</label>
                <input type="text" id="address" className="border cursor-pointer border-gray-300 px-2 py-1 opacity-80 rounded-lg" required/>
            </div>
        </div>

    </div>
    );
}
//
//
export default DetailCustomer;