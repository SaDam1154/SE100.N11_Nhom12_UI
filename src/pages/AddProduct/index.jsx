import { Fragment, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import TypeProduct from '../../components/TypeProduct';
import clsx from 'clsx';
import { useEffect } from 'react';
import TimeNow from '../../components/TimeNow';

const validationSchema = Yup.object({
    // id: Yup.string().required('Trường này bắt buộc'),
    // moneyDeposit: Yup.number()
    //     .typeError('Tiền gởi phải là số')
    //     .min(minMoney, `Tiền gởi tối thiểu là ${minMoney}`)
    //     .required('Trường này bắt buộc'),
    name: Yup.string().required('Trường này bắt buộc'),
    price: Yup.number()
        .required('Trường này bắt buộc')
        .min(1, 'Giá phải lớn hơn 0'),
    quantity: Yup.number()
        .required('Trường này bắt buộc')
        .min(1, 'Số lượng phải lớn hơn 0'),
});

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

        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = function (e) {
            const imageFile = e.target.result;
            setFormdata({ ...formdata, image: imageFile });
        };
        file.preview = URL.createObjectURL(file);
        setImg(file);
    };

    const [formdata, setFormdata] = useState({
        name: '',
        price: '',
        quantity: '',
        image: '',
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormdata({ ...formdata, [name]: value });
        //console.log(formdata);
    };

    const bacsicForm = useFormik({
        initialValues: {
            name: '',
            price: '',
            quantity: '',
        },
        validationSchema,
        onSubmit: handleFormsubmit,
    });

    function handleFormsubmit(values) {
        const finalReq = { ...formdata, ...values };
        console.log(finalReq);

        fetch('http://localhost:5000/api/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(finalReq),
        });
    }

    return (
        <div className="container">
            <div className="w-full">
                <form onSubmit={bacsicForm.handleSubmit}>
                    <div className="mt-4 flex flex-row">
                        <div className="mr-8 mt-3 flex w-1/2 flex-col space-y-2 text-lg">
                            <div className="form-group flex flex-col ">
                                <label
                                    className="mb-1 font-semibold"
                                    htmlFor="name"
                                >
                                    Tên cây
                                </label>
                                <input
                                    type="text"
                                    className={clsx('text-input py-[5px]', {
                                        invalid:
                                            bacsicForm.touched.name &&
                                            bacsicForm.errors.name,
                                    })}
                                    onChange={bacsicForm.handleChange}
                                    onBlur={bacsicForm.handleBlur}
                                    value={bacsicForm.values.name}
                                    name="name"
                                />
                                <span
                                    className={clsx(
                                        'text-sm text-red-500 opacity-0',
                                        {
                                            'opacity-100':
                                                bacsicForm.touched.name &&
                                                bacsicForm.errors.name,
                                        }
                                    )}
                                >
                                    {bacsicForm.errors.name || 'No message'}
                                </span>
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
                                    className={clsx(
                                        'text-input w-full py-[5px]',
                                        {
                                            invalid:
                                                bacsicForm.touched.quantity &&
                                                bacsicForm.errors.quantity,
                                        }
                                    )}
                                    onChange={bacsicForm.handleChange}
                                    onBlur={bacsicForm.handleBlur}
                                    value={bacsicForm.values.quantity}
                                    name="quantity"
                                    placeholder="Nhập số lượng"
                                />
                                <span
                                    className={clsx(
                                        'text-sm text-red-500 opacity-0',
                                        {
                                            'opacity-100':
                                                bacsicForm.touched.quantity &&
                                                bacsicForm.errors.quantity,
                                        }
                                    )}
                                >
                                    {bacsicForm.errors.quantity || 'No message'}
                                </span>
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
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-row">
                        <div className="form-group mr-4 mt-3 flex basis-1/2 flex-col ">
                            <label
                                className="mb-1 text-xl font-semibold"
                                htmlFor="date"
                            >
                                Ngày thêm
                            </label>
                            <div className="rounded border border-slate-300 bg-slate-50 px-2 outline-none">
                                <TimeNow />
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
                                    className={clsx(
                                        'text-input w-full py-[5px]',
                                        {
                                            invalid:
                                                bacsicForm.touched.price &&
                                                bacsicForm.errors.price,
                                        }
                                    )}
                                    onChange={bacsicForm.handleChange}
                                    onBlur={bacsicForm.handleBlur}
                                    value={bacsicForm.values.price}
                                    name="price"
                                    placeholder="Nhập giá mỗi cây"
                                />
                                <label
                                    htmlFor="price"
                                    className="lb-value absolute top-0 right-0 select-none px-[6%] py-1 text-lg text-gray-600"
                                >
                                    VNĐ
                                </label>
                            </div>
                            <span
                                className={clsx(
                                    'text-sm text-red-500 opacity-0',
                                    {
                                        'opacity-100':
                                            bacsicForm.touched.price &&
                                            bacsicForm.errors.price,
                                    }
                                )}
                            >
                                {bacsicForm.errors.price || 'No message'}
                            </span>
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
