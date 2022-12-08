import { Fragment, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import TypeProduct from '../../components/TypeProduct';
import clsx from 'clsx';
import { useEffect } from 'react';

//import moment from 'moment';
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
                                value={product.name}
                                className="text-input form-control select-none py-[5px]"
                            />
                        </div>
                        <div className="form-group flex flex-col">
                            <label
                                className="mb-1 font-semibold"
                                htmlFor="type"
                            >
                                Loại cây
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={product?.type?.name}
                                className="text-input form-control  select-none py-[5px]"
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
                                value={product.quantity}
                                className="text-input form-control py-[5px]"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group w-1/2 flex-col items-center justify-items-center ">
                        <label
                            className="mb-1 font-semibold"
                            htmlFor="quantity"
                        >
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
                        <label
                            className="mb-1 text-xl font-semibold"
                            htmlFor="date"
                        >
                            Ngày nhập cây
                        </label>
                        {/* <div>
                            {moment(product.createdAt).format(
                                'HH:mm:ss DD/MM/YYYY '
                            )}
                        </div> */}
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
                                value={product.price}
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

                <div className="ml-4px float-right mt-8 flex  flex-row pl-4">
                    <div className="float-right mr-[3%] flex basis-1 flex-col pl-[5%]">
                        <Link
                            to={'/product'}
                            className="btn btn-md w-full bg-blue-400"
                        >
                            <span className="pr-2">
                                <i className="fa-solid fa-circle-xmark"></i>
                            </span>
                            <span>Quay lại</span>
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
