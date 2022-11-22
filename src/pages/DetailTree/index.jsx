import { useEffect, useState } from "react";

function DetailTree() {
    const [img, setImg] = useState();

    useEffect(() => {
        //cleanup
        return () => {
            img && URL.revokeObjectURL(img.preview);
        }
    }, [img])  
    const chooseFile = (e) => {
        const file = e.target.files[0]
        
        file.preview = URL.createObjectURL(file);

        setImg(file)
    }
    return ( 
        <div className="wrapper mx-[8%]">
            <div className="flex flex-row mt-4 italic text-lg">
                <div className="basis-1/2 flex flex-col mr-2 mt-[4%]" >
                    <label className="font-bold mb-1 text-xl">Mã số</label>
                    <div className="border h-10 text-lg border-gray-300 bg-gray-400 px-2 py-1 opacity-70 rounded-lg"/>
                </div>

                <div className="basis-2/3 flex-col ml-4 items-center justify-items-center ">
                    <div className="w-full h-60 rounded-xl bg-gray-100 border-dashed border-2 border-cyan-300" >
                        {img && (
                                <img src={img.preview} alt="" className="w-full h-full rounded-xl"/>
                            )}
                    </div>
                    <button className="relative mt-4 w-1/2 inset-x-1/4 h-10 rounded-xl flex items-center justify-items-center bg-green-600 text-white hover:bg-green-400 hover:text-black">
                        <p className="w-full text-xl">Chọn ảnh</p>
                        <input type="file" name="file" id="imageFile" accept="image/gif, image/ipeg, image/png"
                            className="absolute opacity-0 top-0 left-0 w-full cursor-pointer"
                            onChange={chooseFile}/>
                    </button>
                </div>
            </div>

            <div className="flex flex-row mt-2 italic text-lg">
                <div className="basis-1/2 flex flex-col mr-4 mt-3" >
                    <label className="font-bold mb-1 mt-2 text-xl" htmlFor="type">Loại cây</label>
                    <input type="text" id="type" className="border cursor-pointer border-gray-300 px-2 py-1 opacity-80 rounded-lg" required/>
                </div>

                <div className="basis-1/2 flex flex-col ml-4 mt-3" >
                <label className="font-bold mb-1 mt-2 text-xl" htmlFor="name">Tên cây</label>
                    <input type="text" id="name" className="border cursor-pointer border-gray-300 px-2 py-1 opacity-80 rounded-lg" required/>
                </div>
            </div>

            <div className="flex flex-row mt-2 italic text-lg">
                <div className="basis-1/2 flex flex-col mr-4 mt-3" >
                    <label className="font-bold mb-1 mt-2 text-xl" htmlFor="quantity">Số lượng</label>
                    <div className="relative">
                        <input type="number" defaultValue={1} className="border cursor-pointer w-full border-gray-300 px-2 py-1 opacity-70 rounded-lg" id="quantity" required/>
                        <label htmlFor="quanlity" className="lb-value absolute top-0 right-0 px-[10%] py-1 text-gray-600 text-lg select-none">Cây</label>
                    </div>
                </div>

                <div className="basis-1/2 flex flex-col ml-4 mt-3" >
                    <label className="font-bold mb-1 mt-2 text-xl" htmlFor="value" defaultValue={0}>Giá mỗi cây</label>
                    <div className="relative">
                        <input type="text" id="value" defaultValue={0} className="border cursor-pointer w-full border-gray-300 px-2 py-1 opacity-80 rounded-lg focus:text-black" 
                        required/>
                        <label htmlFor="value" className="lb-value absolute top-0 right-0 px-[6%] py-1 text-gray-600 text-lg select-none">VNĐ</label>
                    </div>
                </div>
            </div>

            <div className="flex flex-row mt-2 italic text-lg">
                <div className="basis-1/2 flex flex-col mr-4 mt-3" >
                    <label className="font-bold mb-1 mt-2 text-xl" htmlFor="date">Ngày nhập cây</label>
                    <input type="date" id="date" className="border cursor-pointer border-gray-300 px-2 py-1 opacity-80 rounded-lg" required/>
                </div>

                <div className="basis-1/2 flex flex-col ml-4 mt-3" >
                    <label className="font-bold mb-1 mt-2 text-xl" htmlFor="value" defaultValue={0}>Giá tổng</label>
                    <div className="relative">
                        <input type="text" id="value" defaultValue={0} className="border cursor-pointer w-full border-gray-300 px-2 py-1 opacity-80 rounded-lg focus:text-black" required/>
                        <label htmlFor="value" className="lb-value absolute top-0 right-0 px-[6%] py-1 text-gray-600 text-lg select-none">VNĐ</label>
                    </div>
                </div>
            </div>

            <div className="flex flex-row-reverse w-full mt-5 italic text-lg">
                <div className="basis-1/2 flex">                
                    <button className="flex-col-reverse w-1/2 ml-4 mr-[10%] items-center justify-center rounded bg-blue-500 px-4 py-1.5 text-white hover:bg-blue-300 hover:text-black">
                        <span className="pr-1">
                                <i className="fa-solid fa-circle-xmark"></i>
                        </span>
                        <span>Quay lại</span>
                    </button>

                    <button className="flex-col w-1/2 ml-[10%] items-center justify-center rounded px-4 py-1.5 bg-green-600 text-white hover:bg-green-400 hover:text-black">
                        <span className="pr-1">
                            <i className="fa-solid fa-circle-plus"></i>
                        </span>
                        <span>Cập nhật</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DetailTree;