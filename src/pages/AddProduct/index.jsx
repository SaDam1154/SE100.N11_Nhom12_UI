import { data } from 'autoprefixer';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Addroduct() {
    const [img, setImg] = useState();

    useEffect(() => {
        //cleanup
        return () => {
            img && URL.revokeObjectURL(img.preview);
        };
    }, [img]);
    const chooseFile = (e) => {
        const file = e.target.files[0];

        file.preview = URL.createObjectURL(file);

        setImg(file);
    };

    const [formdata, setFormdata] = useState ({
        name:'',
        type:'',
        quantity: "",
        imageFile:'',
        date:'',
        value:''
    })
    const handleInput = (e) => {
        const {name, value}= e.target;
        setFormdata({...formdata, [name]:value});
        //console.log(formdata);
    }
    const posturl ='http://localhost:5173/product'// link trang listproduct
    const handleFormsubmit = (e) => {
        e.preventDefault();
        console.log(formdata);  
        //test POST api link test api json server
        fetch('http://localhost:9000/treeinfo',{ 
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(formdata) 
        }); 
        window.location.href = posturl;

    }
       
    return (
        <div className="container">
            <div className="w-full">
                <form onSubmit={handleFormsubmit} action="">
                    <div className="mt-4 flex flex-row">
                        <div className="mr-8 mt-3 flex w-1/2 flex-col space-y-4 text-lg">
                            <div className="flex flex-col form-group ">
                                <label
                                    className="mb-1 font-semibold"
                                    htmlFor="name"
                                >
                                    Tên cây{' '}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formdata.name}
                                    onChange={handleInput}
                                    className="text-input form-control py-[5px] invalid"
                                    required
                                />
                                {/* <span className="form-message">Vui lòng nhập tên cây</span> */}
                            </div>

                            <div className="flex flex-col form-group">
                                <label
                                    className="mb-1 font-semibold"
                                    htmlFor="type"
                                >
                                    Loại cây
                                </label>
                                <input
                                    type="text"
                                    onChange={handleInput}
                                    className="text-input form-control py-[5px]"
                                    id="type"
                                    name="type"
                                    value={formdata.type}
                                    required
                                />
                                 {/* <span className="form-message">Vui chọn loại cây</span> */}
                            </div>

                            <div className="flex flex-col form-group">
                                <label
                                    className="mb-1 font-semibold"
                                    htmlFor="quantity"
                                >
                                    Số lượng
                                </label>
                                <input
                                    type="number"
                                    placeholder="Nhập số lượng" 
                                    id="quantity"
                                    name="quantity"
                                    value={formdata.quantity}
                                    onChange={handleInput}
                                    className="text-input form-control py-[5px]"
                                    required
                                />
                            </div>
                        </div>

                        <div className="w-1/2 flex-col form-group items-center justify-items-center ">
                            <div className="h-60 w-full rounded-xl border-2 border-dashed border-cyan-300 bg-gray-100">
                                {img && (
                                    <img
                                        src={img.preview}
                                        alt=""
                                        className="h-full w-full rounded-xl object-contain py-[1.5px]"
                                    />
                                )}
                            </div>
                            <div className="btn btn-green text-center btn-md relative inset-x-1/4 mt-4 h-10 w-1/2 hover:bg-green-400">
                                <p className="tezt w-full">Chọn ảnh</p>
                                <input
                                    type="file"
                                    id="imageFile"
                                    name="imageFile"
                                    value={formdata.imageFile}
                                    accept="image/gif, image/ipeg, image/png"
                                    className="absolute top-0 left-0 w-full cursor-pointer opacity-0 form-control"
                                    onChange={handleInput}
                                    onChangeCapture={chooseFile}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-row">
                        <div className="mr-4 mt-3 flex basis-1/2 flex-col form-group">
                            <label
                                className="mb-1 text-xl font-semibold"
                                htmlFor="date"
                            >
                                Ngày thêm
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formdata.date}
                                onChange={handleInput}
                                className="text-input form-control py-[4px]"
                                required
                            />
                        </div>

                        <div className="ml-4 mt-3 flex basis-1/2 flex-col">
                            <label
                                className="mb-1 text-xl font-semibold"
                                htmlFor="value"
                            >
                                Giá
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="Nhập giá mỗi cây"
                                    id="value"
                                    name="value"
                                    value={formdata.value}
                                    onChange={handleInput}
                                    className="text-input form-control w-full py-[5px]"
                                    required
                                />
                                <label
                                    htmlFor="value"
                                    className="lb-value absolute top-0 right-0 select-none px-[6%] py-1 text-lg text-gray-600"
                                >
                                    VNĐ
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="ml-4px float-right mt-8 flex w-1/2 flex-row pl-4">
                        <div className="mr-[3%] flex basis-1/2 flex-col pl-[5%]">
                            <Link to={"/product"} className="btn btn-red btn-md w-full">
                                <span className="pr-2">
                                    <i className="fa-solid fa-circle-xmark"></i>
                                </span>
                                <span>Hủy</span>
                            </Link>
                        </div>
                        <div className="ml-[3%] flex basis-1/2 flex-col pr-[5%]">
                            <button type="submit" className="btn btn-blue btn-md w-full">
                                <span className="pr-2">
                                    <i className="fa-solid fa-circle-plus"></i>
                                </span>
                                <span>Thêm</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
//
//
export default Addroduct;