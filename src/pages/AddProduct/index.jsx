import { useEffect, useState } from "react";

function Addroduct() {
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
            <div className="w-full">
                <div className="flex flex-row mt-4">
                    <div className="w-1/2 flex flex-col text-xl mr-8 mt-3 space-y-4" >
                        <div className="flex flex-col">
                            <label className="font-semibold mb-1" htmlFor="name">Tên cây </label>
                            <input type="text" id="name" className="text-input py-[5px]" required/>
                        </div>
    
                        <div className="flex flex-col">
                            <label className="font-semibold mb-1" htmlFor="type">Loại cây</label>
                            <input type="text" className="text-input py-[5px]" id="type"/>
                        </div>
    
                        <div className="flex flex-col">
                            <label className="font-semibold mb-1" htmlFor="quantity">Số lượng</label>
                            <input type="number" defaultValue={1} className="text-input py-[5px]" id="quantity" required/>
                        </div>
                    </div>
    
                    <div className="w-1/2 flex-col items-center justify-items-center ">
                        <div className="w-full h-60 rounded-xl bg-gray-100 border-dashed border-2 border-cyan-300" >
                            {img && (
                                    <img src={img.preview} alt="" className="w-full h-full rounded-xl object-contain"/>
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
    
                <div className="flex flex-row mt-4">
                    <div className="basis-1/2 flex flex-col mr-4 mt-3" >
                        <label className="font-semibold mb-1 text-xl" htmlFor="date">Ngày thêm</label>
                        <input type="date" id="date" className="text-input py-[4px]" required/>
                    </div>
    
                    <div className="basis-1/2 flex flex-col ml-4 mt-3" >
                        <label className="font-semibold mb-1 text-xl" htmlFor="value" defaultValue={0}>Giá</label>
                        <div className="relative">
                            <input type="text" id="value" defaultValue={0} className="text-input py-[5px] w-full" required/>
                            <label htmlFor="value" className="w-full lb-value absolute top-0 right-0 px-[6%] py-1 text-gray-600 text-lg select-none">VNĐ</label>
                        </div>
                    </div>
                </div>
    
                <div className="w-1/2 flex float-right flex-row mt-8 ml-4px pl-4">
                    <div className="basis-1/2 flex flex-col pl-[5%] mr-[3%]">
                            <button className="btn btn-red btn-md w-full">
                                <span className="pr-2">
                                    <i className="fa-solid fa-circle-xmark"></i>
                                </span>
                                <span>Hủy</span>
                            </button>
                    </div>
                    <div className="basis-1/2 flex flex-col pr-[5%] ml-[3%]">
                        <button className="btn btn-blue btn-md w-full">
                            <span className="pr-2">
                                <i className="fa-solid fa-circle-plus"></i>
                            </span>
                            <span>Thêm</span>
                        </button>
                    </div>
                </div>
            </div> 
        </div>     
    );
}
//
//
export default Addroduct;
