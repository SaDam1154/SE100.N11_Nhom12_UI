import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TypeProduct from '../../components/TypeProduct';
import clsx from 'clsx';
import { useEffect } from 'react';
import TimeNow from '../../components/TimeNow';
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

        var fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onloadend= function(e) {
            const imageFile = e.target.result;
            setFormdata({...formdata, image: imageFile});
        }  
        file.preview = URL.createObjectURL(file);
        setImg(file);
    };

    const [formdata, setFormdata] = useState({
        name: '',
        price: '',
        type: '',
        quantity: '',
        image: '',
        date: '',
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormdata({ ...formdata, [name]: value });
    };
    const posturl = 'http://localhost:5173/product';
    const handleFormsubmit = (e) => {
        e.preventDefault();

        //test POST api
        fetch('http://localhost:5000/api/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formdata),
        });
        window.location.href = posturl;
    };


    return (
        <div className="container">
            <div className="w-full">
                <form method="POST" onSubmit={handleFormsubmit} action="">
                    <div className="mt-4 flex flex-row">
                        <div className="mr-8 mt-3 flex w-1/2 flex-col space-y-4 text-lg">
                            <div className="form-group flex flex-col ">
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
                                    className="text-input form-control invalid py-[5px]"
                                    required
                                />
                            </div>
                            <div className="form-group flex flex-col">
                                <label
                                    className="mb-1 font-semibold"
                                    htmlFor="type"
                                >
                                    Loại cây
                                </label>
                                <TypeProduct
                                    onChange={(selectedProductType) => {
                                        setFormdata({
                                            ...formdata,
                                            type: selectedProductType._id,
                                        });
                                    }}
                                    required
                                />
                            </div>

                          

                            <div className="form-group flex flex-col">
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

                        <div className="form-group w-1/2 flex-col items-center justify-items-center ">
                            <div className="h-60 w-full rounded-xl border-2 border-dashed border-cyan-300 bg-gray-100">
                                {img && (
                                    <img
                                        src={img.preview}
                                        alt=""
                                        className="h-full w-full rounded-xl object-contain py-[1.5px]"
                                    />
                                )}
                            </div>
                            <div className="btn btn-green btn-md relative inset-x-1/4 mt-4 h-10 w-1/2 text-center hover:bg-green-400">
                                <p className="tezt w-full">Chọn ảnh</p>
                                <input
                                    type="file"
                                    id="imageFile"
                                    // name="imageFile"
                                    // value={formdata.imageFile}
                                    accept="image/gif, image/ipeg, image/png"
                                    className="form-control absolute top-0 left-0 w-full cursor-pointer opacity-0"
                                    onChange={handleInput}
                                    onChangeCapture={chooseFile}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-row">
                        <div className="form-group mr-4 mt-3 flex basis-1/2 flex-col">
                            <label
                                className="mb-1 text-xl font-semibold"
                                htmlFor="date"
                            >
                                Ngày thêm
                            </label>
                            <div className="rounded border border-slate-300 px-2 outline-none bg-slate-50">
                                <TimeNow/>
                            </div>
                
                        </div>

                        <div className="ml-4 mt-3 flex basis-1/2 flex-col">
                            <label
                                className="mb-1 text-xl font-semibold"
                                htmlFor="price"
                            >
                                Giá
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="Nhập giá mỗi cây"
                                    id="price"
                                    name="price"
                                    value={formdata.price}
                                    onChange={handleInput}
                                    className="text-input form-control w-full py-[5px]"
                                    required
                                />
                                <label
                                    htmlFor="price"
                                    className="lb-value absolute top-0 right-0 select-none px-[6%] py-1 text-lg text-gray-600"
                                >
                                    VNĐ
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="ml-4px float-right mt-8 flex w-1/2 flex-row pl-4">
                        <div className="mr-[3%] flex basis-1/2 flex-col pl-[5%]">
                            <Link
                                to={'/product'}
                                className="btn btn-red btn-md w-full"
                            >
                                <span className="pr-2">
                                    <i className="fa-solid fa-circle-xmark"></i>
                                </span>
                                <span>Hủy</span>
                            </Link>
                        </div>
                        <div className="ml-[3%] flex basis-1/2 flex-col pr-[5%]">
                            <button
                                type="submit"
                                className="btn btn-blue btn-md w-full"
                            >
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
