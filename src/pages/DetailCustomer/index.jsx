import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

function DetailCustomer () {
    const { id } = useParams();
    const [customer, setCustomer] = useState({});
    useEffect(() => {
        callApi();
    }, []);

    function callApi() {
        fetch('http://localhost:5000/api/customer' + '/' + id)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setCustomer(resJson.customer);
                } else {
                    setCustomer({});
                }
            });
    }
    return (
    <div className="container">
        <div className="wrapper text-lg">
            <div className="flex flex-row mt-4">
                <div className="basis-1/2 flex flex-col mt-[4%]" >
                    <label className="mb-1 text-lg font-semibold cursor-default">Mã khách hàng</label>
                    <div className="text-input disabled select-none py-[5px]">
                        {customer._id}
                    </div>
                </div>
            </div>

            <div className="flex flex-row mt-2">
                <div className="basis-1/2 flex flex-col mt-2" >
                    <label className="mb-1 font-semibold text-lg cursor-default" htmlFor="phone" defaultValue={0}>Số điện thoại</label>
                    <div className="text-input disabled select-none py-[5px]">
                        {customer.phone}
                    </div>
                </div>
            </div>

            <div className="flex flex-row mt-2">
                <div className="basis-1/2 flex flex-col mt-2" >
                    <label className="mb-1 font-semibold text-lg cursor-default" htmlFor="name">Tên khách hàng</label>
                    <div className="text-input disabled select-none py-[5px]">
                        {customer.name}
                    </div>
                </div>
            </div>

            <div className="flex flex-row mt-4">
                <div className="basis-1/2 flex flex-col mr-2 mt-2" >
                    <label className="mb-1 font-semibold text-lg cursor-default" htmlFor="date">Ngày thêm</label>
                    <div className="text-input disabled select-none py-[5px]">
                        {moment(customer.createdAt).format(
                            '(HH:mm:ss)     DD/MM/YYYY'
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-row mt-4">
                <div className="w-full flex flex-col mr-2 mt-2" >
                    <label className="mb-1 font-semibold text-lg cursor-default" htmlFor="address">Địa chỉ</label>
                    <div className="text-input disabled select-none py-[5px]">
                        {customer.address}
                    </div>
                </div>
            </div>

            <div className="w-1/2 flex float-right flex-row mt-5 px-2">
                    <div className="w-full  ">                
                        <Link to={'/customers'} className="!float-right btn btn-blue btn-md w-[70%]">
                            <span className="pr-1">
                                    <i className="fa-solid fa-circle-xmark"></i>
                            </span>
                            <span>Quay lại</span>
                        </Link >
                    </div>
                </div>
        </div>
    </div>
    );
}
//
//
export default DetailCustomer;