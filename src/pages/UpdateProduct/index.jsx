import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import TypeProduct from '../../components/TypeProduct';
import clsx from 'clsx';
import { useEffect } from 'react';
import TimeNow from '../../components/TimeNow';
import PriceInput from '../../components/PriceInput';
function UpdateProduct() {

    const posturl = 'http://localhost:5173/product';

    const { id } = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        callApi();
    }, []);

    function callApi() {
        fetch('http://localhost:5000/api/product' + '/' + id)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setProduct(resJson.product);
                } else {
                    setProduct({});
                }
            });
    }
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
        
            setProduct({...product, image: imageFile});
            formdata.image = imageFile;
            //console.log(formdata)
        }  
        file.preview = URL.createObjectURL(file);
        setImg(file);
    };
    const [formdata, setFormdata] = useState({
    });
    const handleInput = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });      
    };
    const handleSubmitForm = (e) => { 
        e.preventDefault(); 
        const link = 'http://localhost:5000/api/product'+'/'+ id;
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(
                //product
               {
                // "name": product.name, 
                // "quantity": product.quantity,
                // "image": product.image,
                // "price": product.price,
               }
            ),
        });
        console.log(product)
    };
    return (
        <div className="container">      
            <div className="wrapper text-lg">
                <form onSubmit={handleSubmitForm} action="">
                    <div className="flex flex-row">
                        <div className="mr-12 mt-[4%] flex basis-1/2 flex-col">
                            <label className="mb-1 font-semibold">Mã số</label>
                            <div className="h-10 rounded-lg border border-gray-300 bg-gray-400 px-2 py-1 opacity-70">
                                {product.id}
                            </div>
                        </div>

                        <div className="basis-1/2 flex-col items-center justify-items-center ">
                            <div className="h-60 w-full rounded-xl border-2 border-dashed border-cyan-300 bg-gray-100">
                                {img && ( 
                                    <img
                                        src={img.preview}
                                        alt=""
                                        className="h-full w-full rounded-xl object-contain py-[1.5px]"
                                    />
                                )} 
                                {/* {img *&& (  <img
                                    src={product.image}
                                    alt=""
                                    className="h-full w-full rounded-xl object-contain py-[1.5px]"
                                 />
                                 )} */}
                                   

                            </div>
                            <div className="btn btn-green btn-md relative inset-x-1/4 mt-4 h-10 w-1/2 text-center hover:bg-green-400">
                                    <p className="tezt w-full">Chọn ảnh</p>
                                    <input
                                        type="file"
                                        id="imageFile"
                                        name="image"
                                        //value={product.image}
                                        accept="image/gif, image/ipeg, image/png"
                                        className="form-control absolute top-0 left-0 w-full cursor-pointer opacity-0"
                                        //onChange={handleInput}
                                        onChange={chooseFile}
                                        //required
                                    />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row">
                        <div className="mr-12 mt-2 flex basis-1/2 flex-col">
                            <label className="mb-1 font-semibold" htmlFor="type">
                                Loại cây
                            </label>
                            <TypeProduct
                                //value = {product.type.name}
                                onChange={(selectedProductType) => {
                                    setFormdata({
                                        ...formdata,
                                        type: selectedProductType._id,
                                    });
                                    }}
                                required
                            />
                        </div>

                        <div className="mt-2 flex basis-1/2 flex-col">
                            <label className="mb-1 font-semibold" htmlFor="name">
                                Tên cây
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={product.name}
                                onChange={handleInput}
                                className="text-input py-[5px]"
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-2 flex flex-row">
                        <div className="mr-12 mt-2 flex basis-1/2 flex-col">
                            <label
                                className="mb-1 font-semibold"
                                htmlFor="quantity"
                            >
                                Số lượng
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="quantity"
                                    value={product.quantity}
                                    onChange={handleInput}
                                    className="text-input w-full py-[5px]"
                                    id="quantity"
                                    required
                                />
                                <label
                                    htmlFor="quanlity"
                                    className="lb-value absolute top-0 right-0 select-none px-[6%] py-1 text-lg text-gray-600"
                                >
                                    Cây
                                </label>
                            </div>
                        </div>

                        <div className="mt-2 flex basis-1/2 flex-col">
                            <label
                                className="mb-1 font-semibold"
                                htmlFor="value"
                            >
                                Giá mỗi cây
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    id="value"
                                    name="price"
                                    value={product.price}
                                    onChange={handleInput}
                                    
                                    className="text-input w-full py-[5px]"
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

                    <div className="mt-4 flex flex-row">
                            <div className="form-group mr-12 mt-3 flex basis-1/2 flex-col ">
                                <label
                                    className="mb-1 text-xl font-semibold"
                                    htmlFor="date"
                                >
                                    Ngày cập nhật
                                </label>
                                <div className="rounded border border-slate-300 px-2 outline-none bg-slate-50">
                                    <TimeNow/>
                                </div>
                    
                            </div>

                            <div className="mt-3 flex basis-1/2 flex-col">
                                <label
                                    className="mb-1 text-xl font-semibold"
                                    htmlFor="price"
                                >
                                    Giá tổng
                                </label>
                                <div className="relative">
                                    <PriceInput
                                        id="price_AddProduct_page"
                                        // onChange={bacsicForm.handleChange}
                                        // onBlur={bacsicForm.handleBlur}
                                        value={product.quantity*product.price}
                                        name="price"
                                        placeholder="Nhập giá mỗi sản phẩm"
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
                        <div className="float-right mr-[3%] flex basis-1/2 flex-col pl-[5%]">
                            <Link
                                to={'/product'}
                                className="btn btn-blue btn-md w-full"
                            >
                                <span className="pr-2">
                                    <i className="fa-solid fa-circle-xmark"></i>
                                </span>
                                <span>Quay lại</span>
                            </Link>
                        </div>
                        <div className="ml-[3%] flex basis-1/2 flex-col pr-[5%]">
                            <button
                                type="submit"
                                className="btn btn-green btn-md w-full"
                                >
                                <span className="pr-2">
                                    <i className="fa-solid fa-circle-plus"></i>
                                </span>
                                <span>Cập nhật</span>
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
export default UpdateProduct;