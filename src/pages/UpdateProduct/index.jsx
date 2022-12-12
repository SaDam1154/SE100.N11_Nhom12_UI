import { Fragment, useState } from 'react';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import TypeProduct from '../../components/TypeProduct';
import clsx from 'clsx';
import { useEffect } from 'react';
import TimeNow from '../../components/TimeNow';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import PriceInput from '../../components/PriceInput';

const validationSchema = Yup.object({
    name: Yup.string().required('Trường này bắt buộc'),
    price: Yup.number().required('Trường này bắt buộc').min(1, 'Giá phải lớn hơn 0'),
    quantity: Yup.number().required('Trường này bắt buộc').min(1, 'Số lượng phải lớn hơn 0'),
    type: Yup.string().required('Trường này bắt buộc'),
});

function UpdateProduct() {
    const [img, setImg] = useState();
    const [loading, setLoading] = useState(false);
    const showSuccessNoti = () => toast.info('Chỉnh sửa phẩm thành công!');
    const showErorrNoti = () => toast.error('Có lỗi xảy ra!');
    const { id } = useParams();
    useEffect(() => {
        callApi();
    }, []);


    const [product,setProduct] = useState ({})
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

    useEffect(() => {
        //cleanup
        return () => {
            img && URL.revokeObjectURL(img.preview);
        };
    }, [img]);

    const bacsicForm = useFormik({
        initialValues: {
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            //type: product?.type?.name,
            //image: product?.image,
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: handleFormsubmit,
    });

    function handleChangeProductType(productType) {
        bacsicForm.setFieldValue('type', productType._id || '');
    }
    function handleBlurProductType() {
        bacsicForm.setFieldTouched('type', true);
    }

    const chooseFile = (e) => {
        const file = e.target.files[0];

        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = function (e) {
            const imageFile = e.target.result;
            bacsicForm.setFieldValue('image', imageFile);
            setProduct({...product, image: imageFile});
        };
        file.preview = URL.createObjectURL(file);
        setImg(file);
    };

    function handleFormsubmit(values) {
        setLoading(true);
        console.log(values)
        fetch('http://localhost:5000/api/product' + '/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setLoading(false);
                    showSuccessNoti();
                } else {
                    setLoading(false);
                    showErorrNoti();
                }
            })
            .catch(() => {
                setLoading(false);
                showErorrNoti();
            });
    }

    return (
        <div>
            <div className="container">
                <div className="w-full">
                    <form onSubmit={bacsicForm.handleSubmit}>
                        {/* Id ang image */}
                        <div className="flex flex-row">
                            {/* ID */}
                            <div className="mr-12 mt-[4%] flex basis-1/2 flex-col">
                                <label className="mb-1 font-semibold text-xl">Mã số</label>
                                <div className="h-10 text-xl rounded-lg border border-gray-300 bg-gray-400 px-2 py-1 opacity-70">
                                    {product.id}
                                </div>
                            </div>

                            {/* Image */}
                            <div className="form-group w-1/2 flex-col items-center justify-items-center ">
                                <div className="h-60 w-full rounded-xl border-2 border-dashed border-blue-500 bg-gray-100">
                                    <img
                                        src={product.image}
                                        alt=""
                                        className="h-full w-full rounded-xl object-contain py-[1.5px]"
                                    />
                                </div>

                                <div className="btn btn-green btn-md relative inset-x-1/4 mt-4 h-10 w-1/2 text-center hover:bg-green-400">
                                    <p className="tezt w-full">Chọn ảnh</p>
                                    <input
                                        type="file"
                                        id="imageFile"
                                        accept="image/gif, image/ipeg, image/png, image/*"
                                        className="absolute top-0 left-0 w-full cursor-pointer opacity-0"
                                        onChangeCapture={chooseFile}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* type and name */}
                        <div className="flex flex-row">
                            {/* Type */}
                            <div className="mr-12 mt-2 flex basis-1/2 flex-col">
                            <label className="mb-1 font-semibold" htmlFor="type">
                                Loại cây
                            </label>
                                <div
                                    onMouseDown={(e) => e.preventDefault()}
                                    tabIndex="1"
                                    onBlur={handleBlurProductType}
                                >
                                    <TypeProduct
                                        key="fadsfas"
                                        onChange={handleChangeProductType}
                                        invalid={bacsicForm.touched.type && bacsicForm.errors.type}
                                    />
                                </div>

                                <span
                                    className={clsx('text-sm text-red-500 opacity-0', {
                                        'opacity-100': bacsicForm.touched.type && bacsicForm.errors.type,
                                    })}
                                >
                                    {bacsicForm.errors.type || 'No message'}
                                </span>
                            </div>

                            {/* Name */}
                            <div className="mt-2 flex basis-1/2 flex-col">
                                <label className="mb-1 font-semibold text-xl" htmlFor="name">
                                    Tên cây
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className={clsx('text-input py-[5px]', {
                                        invalid: bacsicForm.touched.name && bacsicForm.errors.name,
                                    })}
                                    onChange={bacsicForm.handleChange}
                                    onBlur={bacsicForm.handleBlur}
                                    value={bacsicForm.values.name}
                                    name="name"
                                />
                                <span
                                    className={clsx('text-sm text-red-500 opacity-0', {
                                        'opacity-100': bacsicForm.touched.name && bacsicForm.errors.name,
                                    })}
                                >
                                    {bacsicForm.errors.name || 'No message'}
                                </span>
                            </div>
                        </div>

                        {/* Quanlity and Price */}
                        <div className="flex flex-row">
                            {/* Quantity */}
                            <div className="mr-12 mt-2 flex basis-1/2 flex-col">
                                <label className="mb-1 font-semibold text-xl" htmlFor="quantity">
                                    Số lượng
                                </label>
                                <input
                                    type="number"
                                    id="quantity"
                                    className={clsx('text-input w-full py-[5px]', {
                                        invalid: bacsicForm.touched.quantity && bacsicForm.errors.quantity,
                                    })}
                                    onChange={bacsicForm.handleChange}
                                    onBlur={bacsicForm.handleBlur}
                                    value={bacsicForm.values.quantity}
                                    name="quantity"
                                    placeholder="Nhập số lượng"
                                />
                                <span
                                    className={clsx('text-sm text-red-500 opacity-0', {
                                        'opacity-100': bacsicForm.touched.quantity && bacsicForm.errors.quantity,
                                    })}
                                >
                                    {bacsicForm.errors.quantity || 'No message'}
                                </span>
                            </div>

                            {/* PRICE */}
                            <div className="mt-2 flex basis-1/2 flex-col">
                                <label className="mb-1 text-xl font-semibold" htmlFor="price">
                                    Giá mỗi cây
                                </label>
                                <PriceInput
                                    id="price_AddProduct_page"
                                    onChange={bacsicForm.handleChange}
                                    onBlur={bacsicForm.handleBlur}
                                    value={bacsicForm.values.price}
                                    error={bacsicForm.errors.price}
                                    touched={bacsicForm.touched.price}
                                    name="price"
                                    placeholder="Nhập giá mỗi sản phẩm"
                                />
                                <span
                                    className={clsx('text-sm text-red-500 opacity-0', {
                                        'opacity-100': bacsicForm.touched.price && bacsicForm.errors.price,
                                    })}
                                >
                                    {bacsicForm.errors.price || 'No message'}
                                </span>
                            </div>
                        </div>

                        {/* Date and Priceall */}
                        <div className="flex flex-row">
                            {/* DATE */}
                            <div className="mr-12 mt-2 flex basis-1/2 flex-col ">
                                <label className="mb-1 cursor-default text-xl font-semibold">Ngày chỉnh sửa</label>
                                <div className="text-input">
                                    <TimeNow />
                                </div>
                            </div>

                            {/* Priceall */}
                            <div className="mt-3 flex basis-1/2 flex-col">
                                <label
                                    className="mb-1 text-xl font-semibold"
                                    htmlFor="priceall"
                                >
                                    Giá tổng
                                </label>
                                <div className="relative">
                                    <div className='text-input py-[5px]'>
                                        {bacsicForm.values.price * bacsicForm.values.quantity}
                                    </div>
                                        
                                    <label
                                        htmlFor="priceall"
                                        className="lb-value absolute top-0 right-0 select-none px-[6%] py-1 text-lg text-gray-600"
                                    >
                                        VNĐ
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between border-t pt-6">
                            <div
                                className={clsx('flex items-center text-blue-500', {
                                    invisible: !loading,
                                })}
                            >
                                <i className="fa-solid fa-spinner animate-spin text-xl"></i>
                                <span className="text-lx pl-3 font-medium">Đang tạo sản phẩm</span>
                            </div>
                            <div className="flex">
                                <Link to={'/product'} className="btn btn-red btn-md">
                                    <span className="pr-2">
                                        <i className="fa-solid fa-circle-xmark"></i>
                                    </span>
                                    <span>Hủy</span>
                                </Link>
                                <button
                                    type="submit"
                                    className="btn btn-blue btn-md"
                                    disabled={!bacsicForm.dirty || loading}
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
            <ToastContainer />
        </div>
    );
}

export default UpdateProduct;