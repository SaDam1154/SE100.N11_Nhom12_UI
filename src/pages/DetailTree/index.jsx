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
            <div className="wrapper text-lg">
                <div className="flex flex-row">
                    <div className="basis-1/2 flex flex-col mr-12 mt-[4%]" >
                        <label className="font-semibold mb-1">Mã số</label>
                        <div className="border h-10 border-gray-300 bg-gray-400 px-2 py-1 opacity-70 rounded-lg"/>
                    </div>

                    <div className="basis-1/2 flex-col items-center justify-items-center ">
                        <div className="w-full h-60 rounded-xl bg-gray-100 border-dashed border-2 border-cyan-300" >
                            {img && (
                                    <img src={img.preview} alt="" className="w-full h-full py-[1.5px] object-contain"/>
                                )}
                        </div>
                        <button className="relative mt-4 w-1/2 inset-x-1/4 h-10 btn btn-green btn-md hover:bg-green-400">
                            <p className="w-full text-lg">Chọn ảnh</p>
                            <input type="file" name="file" id="imageFile" accept="image/gif, image/ipeg, image/png"
                                className="absolute opacity-0 top-0 left-0 w-full cursor-pointer"
                                onChange={chooseFile}/>
                        </button>
                    </div>
                </div>

                <div className="flex flex-row">
                    <div className="basis-1/2 flex flex-col mr-12 mt-2" >
                        <label className="font-semibold mb-1" htmlFor="type">Loại cây</label>
                        <input type="text" id="type" className="text-input py-[5px]" required/>
                    </div>

                    <div className="basis-1/2 flex flex-col mt-2" >
                    <label className="font-semibold mb-1" htmlFor="name">Tên cây</label>
                        <input type="text" id="name" className="text-input py-[5px]" required/>
                    </div>
                </div>

                <div className="flex flex-row mt-2">
                    <div className="basis-1/2 flex flex-col mr-12 mt-2" >
                        <label className="font-semibold mb-1" htmlFor="quantity">Số lượng</label>
                        <div className="relative">
                            <input type="number" defaultValue={1} className="w-full text-input py-[5px]" id="quantity" required/>
                            <label htmlFor="quanlity" className="lb-value absolute top-0 right-0 px-[6%] py-1 text-gray-600 text-lg select-none">Cây</label>
                        </div>
                    </div>

                    <div className="basis-1/2 flex flex-col mt-2" >
                        <label className="font-semibold mb-1" htmlFor="value" defaultValue={0}>Giá mỗi cây</label>
                        <div className="relative">
                            <input type="number" id="value" defaultValue={0} className="w-full text-input py-[5px]" 
                            required/>
                            <label htmlFor="value" className="lb-value absolute top-0 right-0 px-[6%] py-1 text-gray-600 text-lg select-none">VNĐ</label>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row mt-2">
                    <div className="basis-1/2 flex flex-col mr-12 mt-2" >
                        <label className="font-semibold mb-1" htmlFor="date">Ngày nhập cây</label>
                        <input type="date" id="date" className="text-input px-2 py-1" required/>
                    </div>

                    <div className="basis-1/2 flex flex-col mt-2" >
                        <label className="font-semibold mb-1" htmlFor="value-all" defaultValue={0}>Giá tổng</label>
                        <div className="relative">
                            <input type="number" id="value-all" defaultValue={0} className="w-full text-input py-[5px]" required/>
                            <label htmlFor="value-all" className="lb-value absolute top-0 right-0 px-[6%] py-1 text-gray-600 text-lg select-none">VNĐ</label>
                        </div>
                    </div>
                </div>

                <div className="w-1/2 flex float-right flex-row mt-5 ml-4 pl-4">
                    <div className="basis-1/2 flex flex-col pl-[5%] mr-[3%]">                
                        <button className="btn btn-blue btn-md">
                            <span className="pr-1">
                                    <i className="fa-solid fa-circle-xmark"></i>
                            </span>
                            <span className="text-lg">Quay lại</span>
                        </button>
                    </div>
                    <div className="basis-1/2 flex flex-col pr-[5%] ml-[3%]">
                    <button className="btn btn-green btn-md">
                            <span className="pr-1">
                                <i className="fa-solid fa-circle-plus"></i>
                            </span>
                            <span className="text-lg">Cập nhật</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailTree;