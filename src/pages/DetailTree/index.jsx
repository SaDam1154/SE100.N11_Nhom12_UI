import { Fragment, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import TypeProduct from '../../components/TypeProduct';
import clsx from 'clsx';
import { useEffect } from 'react';

import moment from 'moment';
import TimeNow from '../../components/TimeNow';

function DetailTree() {
    const [img, setImg] = useState();

    useEffect(() => {
        //cleanup
        return () => {
            img && URL.revokeObjectURL(img.preview);
        };
    }, [img]);

    const [product, setProduct] = useState({});
    useEffect(() => {
        //cleanup
        return () => {
            img && URL.revokeObjectURL(img.preview);
        };
    }, [img]);
    const { id } = useParams();
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

    return (
        <div className="container">
            <div className="w-full">
                <div className=" flex flex-row mt-4">
                    <div className="mr-8 mt-3 flex w-1/2 flex-col space-y-4 text-lg">
                        <div className="form-group flex flex-col mt-10">
                            <label className="mb-1 font-semibold cursor-default " htmlFor="name">
                                Mã sản phẩm
                            </label>
                            <div id="name" className="text-input disabled select-none py-[5px]">
                                {product.id}
                            </div>
                        </div>
                        <div className="form-group flex flex-col ">
                            <label className="mb-1 font-semibold cursor-default " htmlFor="name">
                                Tên cây
                            </label>
                            <div id="name" className="text-input disabled select-none py-[5px]">
                                {product.name}
                            </div>
                        </div>
                    </div>

                    <div className="form-group w-1/2 flex-col items-center justify-items-center ">
                        <label className="mb-1 font-semibold cursor-default text-lg" htmlFor="quantity">
                            Hình ảnh
                        </label>
                        <div className="h-60 w-full rounded-xl border-2 border-dashed border-cyan-300 bg-gray-100">
                            {
                                <img
                                    src={product.image}
                                    alt=""
                                    className="h-full w-full rounded-xl object-contain py-[1.5px]"
                                />
                            }
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex flex-row">
                    <div className="form-group mr-4 mt-3 flex basis-1/2 flex-col">
                        <label className="mb-1 font-semibold cursor-default text-lg" htmlFor="type">
                            Loại cây
                        </label>
                        <div id="name" className="text-input disabled  select-none py-[5px]">
                            {product?.type?.name}
                        </div>
                    </div>

                    <div className="form-group ml-4 mt-3 flex basis-1/2 flex-col">
                        <label className="font-semibold cursor-default text-lg" htmlFor="quantity">
                            Số lượng
                        </label>
                        <div id="quantity" className="ml-lg text-input disabled py-[5px]">
                            {product.quantity}
                        </div>
                    </div>
                </div>

                <div className="mt-2 flex flex-row">
                    <div className="form-group mr-4 mt-3 flex basis-1/2 flex-col">
                        <label className="mb-1 text-lg font-semibold cursor-default" htmlFor="date">
                            Ngày nhập cây
                        </label>
                        <div className="text-input py-[5px] text-xl disabled">
                            {moment(product.createdAt).format('HH:mm:ss DD/MM/YYYY ')}
                        </div>
                    </div>

                    <div className="ml-4 mt-3 flex basis-1/2 flex-col">
                        <label className="mb-1 text-lg font-semibold cursor-default" htmlFor="price">
                            Giá
                        </label>
                        <div className="relative">
                            <div id="price" className="text-input disabled select-none w-full py-[5px]">
                                {product.price}
                            </div>
                            <label
                                htmlFor="price"
                                className="lb-value absolute top-0 right-0 select-none px-[6%] py-1 text-lg text-gray-600"
                            >
                                VNĐ
                            </label>
                        </div>
                    </div>
                </div>

                <div className="float-right mt-8 flex  flex-row">
                    <div className="float-left flex basis-1 flex-col">
                        <Link to={'/product'} className="btn btn-blue btn-md w-ful mr-10">
                            <span className="pr-2">
                                <i className="fa-solid fa-circle-xmark"></i>
                            </span>
                            <span>Quay lại</span>
                        </Link>
                    </div>
                    <div className="float-right flex basis-1 flex-col">
                        <Link to={'/product/update/' + product.id} className="btn btn-md btn-green">
                            <span className="pr-2">
                                <i className="fa fa-share" aria-hidden="true"></i>
                            </span>
                            <span>Chỉnh sửa</span>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}
//
//
export default DetailTree;
