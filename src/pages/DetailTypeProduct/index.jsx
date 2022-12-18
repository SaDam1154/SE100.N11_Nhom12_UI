import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

function DetailTypeProduct () {
    const { id } = useParams();
    const [productType, setProductType] = useState({});
    useEffect(() => {
        callApi();
    }, []);

    function callApi() {
        fetch('http://localhost:5000/api/product-type' + '/' + id)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setProductType(resJson.productType);
                } else {
                    setProductType({});
                }
            });
    }
    return (
    <div className="container">
        <div className="wrapper text-lg mx-[10%]  rounded-xl border border-slate-300 p-5">
            <div className="flex flex-row mt-4">
                <div className="w-full flex flex-col mt-[4%]" >
                    <label className="mb-1 text-lg font-semibold cursor-default">Mã loại sản phẩm</label>
                    <div className="text-input disabled select-none py-[5px]">
                        {productType.id}
                    </div>
                </div>
            </div>

            <div className="flex flex-row mt-4">
                <div className="w-full flex flex-col mt-2" >
                    <label className="mb-1 font-semibold text-lg cursor-default" htmlFor="name">Tên loại sản phẩm</label>
                    <div className="text-input disabled select-none py-[5px]">
                        {productType.name}
                    </div>
                </div>
            </div>

            <div className="flex flex-row mt-4 mb-4">
                <div className="w-full flex flex-col mt-2" >
                    <label className="mb-1 font-semibold text-lg cursor-default" htmlFor="date">Ngày thêm</label>
                    <div className="text-input disabled select-none py-[5px]">
                        {moment(productType.createdAt).format(
                            '(HH:mm:ss)     DD/MM/YYYY'
                        )}
                    </div>
                </div>
            </div>

            <div className="float-right mt-8 flex flex-row mr-2">
                <div className="float-left flex basis-1 flex-col mr-5">                
                    <Link to={'/product-type'} className="btn btn-blue btn-md">
                        <span className="pr-1">
                                <i className="fa-solid fa-circle-xmark"></i>
                        </span>
                        <span>Quay lại</span>
                    </Link >
                </div>

                <div className="float-right flex basis-1 flex-col">
                    <Link to={'/product-type/update/' + productType.id} className="btn btn-md btn-green">
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
export default DetailTypeProduct;