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
        <div className="container">
            <div className="wrapper">
                <div className="flex flex-row mt-4 italic text-lg">
                    <div className="basis-1/2 flex flex-col mr-2 mt-[4%]" >
                        <label className="font-semibold mb-1 text-xl">Mã số</label>
                        <div className="border h-10 text-lg border-gray-300 bg-gray-400 px-2 py-1 opacity-70 rounded-lg"/>
                    </div>

                    <div className="basis-2/3 flex-col ml-4 items-center justify-items-center ">
                        <div className="w-full h-60 rounded-xl bg-gray-100 border-dashed border-2 border-cyan-300" >
                            {img && (
                                    <img src={img.preview} alt="" className="w-full h-full py-[1.5px] object-contain"/>
                                )}
                        </div>
                        <button className="relative mt-4 w-1/2 inset-x-1/4 h-10 btn btn-green btn-md hover:bg-green-400">
                            <p className="w-full text-xl">Chọn ảnh</p>
                            <input type="file" name="file" id="imageFile" accept="image/gif, image/ipeg, image/png"
                                className="absolute opacity-0 top-0 left-0 w-full cursor-pointer"
                                onChange={chooseFile}/>
                        </button>
                    </div>
                </div>

                <div className="flex flex-row italic text-lg">
                    <div className="basis-1/2 flex flex-col mr-4 mt-3" >
                        <label className="font-semibold mb-1 text-xl" htmlFor="type">Loại cây</label>
                        <input type="text" id="type" className="text-input px-2 py-1" required/>
                    </div>

                    <div className="basis-1/2 flex flex-col ml-4 mt-3" >
                    <label className="font-semibold mb-1 text-xl" htmlFor="name">Tên cây</label>
                        <input type="text" id="name" className="text-input px-2 py-1" required/>
                    </div>
                </div>

                <div className="flex flex-row mt-2 italic text-lg">
                    <div className="basis-1/2 flex flex-col mr-4 mt-3" >
                        <label className="font-semibold mb-1 text-xl" htmlFor="quantity">Số lượng</label>
                        <div className="relative">
                            <input type="number" defaultValue={1} className="w-full text-input px-2 py-1" id="quantity" required/>
                            <label htmlFor="quanlity" className="lb-value absolute top-0 right-0 px-[10%] py-1 text-gray-600 text-lg select-none">Cây</label>
                        </div>
                    </div>

                    <div className="basis-1/2 flex flex-col ml-4 mt-3" >
                        <label className="font-semibold mb-1 text-xl" htmlFor="value" defaultValue={0}>Giá mỗi cây</label>
                        <div className="relative">
                            <input type="number" id="value" defaultValue={0} className="w-full text-input px-2 py-1" 
                            required/>
                            <label htmlFor="value" className="lb-value absolute top-0 right-0 px-[6%] py-1 text-gray-600 text-lg select-none">VNĐ</label>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row mt-2 italic text-lg">
                    <div className="basis-1/2 flex flex-col mr-4 mt-3" >
                        <label className="font-semibold mb-1 text-xl" htmlFor="date">Ngày nhập cây</label>
                        <input type="date" id="date" className="text-input px-2 py-[3px]" required/>
                    </div>

                    <div className="basis-1/2 flex flex-col ml-4 mt-3" >
                        <label className="font-semibold mb-1 text-xl" htmlFor="value-all" defaultValue={0}>Giá tổng</label>
                        <div className="relative">
                            <input type="number" id="value-all" defaultValue={0} className="w-full text-input px-2 py-1" required/>
                            <label htmlFor="value-all" className="lb-value absolute top-0 right-0 px-[6%] py-1 text-gray-600 text-lg select-none">VNĐ</label>
                        </div>
                    </div>
                </div>

                <div className="w-1/2 flex float-right flex-row mt-6 ml-4px pl-4 text-lg">
                    <div className="basis-1/2 flex flex-col pl-[5%] mr-[3%]">                
                        <button className="btn btn-blue btn-md">
                            <span className="pr-1">
                                    <i className="fa-solid fa-circle-xmark"></i>
                            </span>
                            <span>Quay lại</span>
                        </button>
                    </div>
                    <div className="basis-1/2 flex flex-col pr-[5%] ml-[3%]">
                    <button className="btn btn-green btn-md">
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

export default DetailTree;