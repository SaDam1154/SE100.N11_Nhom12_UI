import { Fragment, useState } from 'react';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Listbox, Popover } from '@headlessui/react';
import clsx from 'clsx';
import { useEffect } from 'react';
import { Formik, useFormik } from 'formik';
import PriceInput from '../../components/PriceInput';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function removeVietnameseTones(stra) {
    var str = stra;
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ');
    return str;
}

const validationSchema = Yup.object({
    name: Yup.string().required('Trường này bắt buộc'),
    price: Yup.number().required('Trường này bắt buộc').min(1, 'Giá phải lớn hơn 0'),
    quantityStart: Yup.number().required('Trường này bắt buộc').min(1, 'Số lượng phải lớn hơn 0'),
    quantityEnd: Yup.number().required('Trường này bắt buộc').min(0, 'Số lượng phải lớn hơn '),
    type: Yup.string().required('Trường này bắt buộc'),
});
function Products() {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const navigate = useNavigate();
    const showDeleteNoti = () => toast.info('Xóa sản phẩm thành công!');
    const showErorrNoti = () => toast.error('Có lỗi xảy ra!');
    const bacsicForm = useFormik({
        initialValues: {
            name: '',
            priceStart: '',
            priceEnd: '',
            quantityStart: '',
            quantityEnd: '',
        },
        validationSchema,
        onSubmit: handleFormsubmit,
    });

    function deleteProduct(id) {
        fetch('http://localhost:5000/api/product/' + id, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson) {
                    showDeleteNoti();
                    console.log('xóa');
                    callApi();
                } else {
                    showErorrNoti();
                }
            })
            .catch(() => {
                showErorrNoti();
            });
    }
    const [selectedProductTypes, setSelectedProductTypes] = useState([]);
    useEffect(() => {
        callApi();
        callApiPeople();
    }, []);

    function callApi() {
        fetch('http://localhost:5000/api/product')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setProducts(resJson.products);
                } else {
                    setProducts([]);
                }
            });
    }
    function callApiPeople() {
        fetch('http://localhost:5000/api/product-type')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setProductTypes(resJson.productTypes);
                } else {
                    setProductTypes([]);
                }
            });
    }

    function linkToDetail(id) {
        navigate('/product/detail/' + id);
    }
    function linkToUpdate(id) {
        navigate('/product/update/' + id);
    }
    function handleFormsubmit(values) {
        setLoading(true);
        fetch('http://localhost:5000/api/product', {
            method: 'POST',
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
                    setTimeout(() => {
                        navigate('/product');
                    }, 4000);
                    // navigate('/product');
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
        <div className="container">
            <div className="flex space-x-4">
                {/* tite + reload btn */}
                <div className="flex">
                    <label className="text-2xl font-bold text-slate-800">Danh sách cây</label>
                    <button type="button" className="ml-3 text-gray-800 hover:underline" onClick={() => callApi()}>
                        <span className="font-sm pr-1">
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </span>
                        <span className="">Tải lại</span>
                    </button>
                </div>

                {/* Action group */}
                <div className="flex grow">
                    {/* Search */}
                    <div className="mr-2 flex grow">
                        <input
                            type="text"
                            className="text-input grow"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            placeholder="Tìm kiếm sản phẩm"
                        />
                    </div>

                    <Popover className="relative mr-2">
                        <Popover.Button className="btn btn-md h-full !min-w-0 bg-slate-200 !px-3 text-slate-600 outline-none hover:bg-slate-300">
                            <i className="fas fa-filter"></i>
                        </Popover.Button>

                        <Popover.Panel
                            as="div"
                            className="absolute right-0 z-10 min-w-[280px] max-w-[320px] rounded border bg-white px-4 py-3 shadow"
                        >
                            <h2 className="mb-2 text-lg font-semibold">Lọc sản phẩm</h2>

                            <hr />
                            <div className="mt-3 space-x-2">
                                <div>
                                    <label className="mb-1 font-semibold">Loại cây</label>
                                    <Listbox value={selectedProductTypes} onChange={setSelectedProductTypes} multiple>
                                        <Listbox.Button
                                            as="div"
                                            className="text-input flex min-h-[36px] cursor-pointer items-center"
                                        >
                                            <div className="mr-2 flex-[1]">{`Loại cây (${selectedProductTypes.length})`}</div>
                                            <i className="fa-solid fa-chevron-down"></i>
                                        </Listbox.Button>
                                        <Listbox.Options>
                                            {productTypes.map((type) => (
                                                <Listbox.Option
                                                    key={type._id}
                                                    value={type}
                                                    className="cursor-pointer hover:text-blue-500"
                                                >
                                                    {({ selected }) => (
                                                        <div className="flex items-center">
                                                            <i
                                                                className={clsx('fa-solid fa-check pr-2', {
                                                                    'opacity-0': !selected,
                                                                })}
                                                            ></i>
                                                            <span>{type.name}</span>
                                                        </div>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Listbox>
                                </div>
                            </div>
                            <div className="mt-2 ">
                                <div>
                                    <label className=" font-semibold" htmlFor="quantityStart">
                                        Khoảng giá
                                    </label>
                                    <div className="mt-1 ml-1 flex ">
                                        <div className="flex basis-1/2 flex-col px-1">
                                            <label className=" text-sm font-thin" htmlFor="priceStart">
                                                từ
                                            </label>
                                            <PriceInput
                                                id="priceStart"
                                                onChange={bacsicForm.handleChange}
                                                onBlur={bacsicForm.handleBlur}
                                                value={bacsicForm.values.priceStart}
                                                error={bacsicForm.errors.priceStart}
                                                touched={bacsicForm.touched.priceStart}
                                                name="priceStart"
                                                placeholder="Từ"
                                            />
                                        </div>

                                        <div className="flex basis-1/2 flex-col px-1">
                                            <label className=" text-sm font-thin" htmlFor="priceEnd">
                                                đến
                                            </label>
                                            <PriceInput
                                                id="priceEnd"
                                                onChange={bacsicForm.handleChange}
                                                onBlur={bacsicForm.handleBlur}
                                                value={bacsicForm.values.priceEnd}
                                                error={bacsicForm.errors.priceEnd}
                                                touched={bacsicForm.touched.priceEnd}
                                                name="priceEnd"
                                                placeholder="Đến"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 ">
                                <label className=" font-semibold" htmlFor="quantity">
                                    Số lượng
                                </label>
                                <div className="mt-1 ml-1 flex ">
                                    <div className="flex basis-1/2 flex-col px-1">
                                        <label className=" text-sm font-thin" htmlFor="priceStart">
                                            từ
                                        </label>
                                        <input
                                            type="number"
                                            id="quantityStart"
                                            className={clsx('text-input w-full py-[5px]', {
                                                invalid:
                                                    bacsicForm.touched.quantityStart && bacsicForm.errors.quantityStart,
                                            })}
                                            onChange={bacsicForm.handleChange}
                                            onBlur={bacsicForm.handleBlur}
                                            value={bacsicForm.values.quantityStart}
                                            name="quantityStart"
                                            placeholder="từ"
                                        />
                                        <span
                                            className={clsx('text-sm text-red-500 opacity-0', {
                                                'opacity-100':
                                                    bacsicForm.touched.quantityStart && bacsicForm.errors.quantityStart,
                                            })}
                                        >
                                            {bacsicForm.errors.quantityStart || 'No message'}
                                        </span>
                                    </div>
                                    <div className="flex basis-1/2 flex-col px-1">
                                        <label className=" text-sm font-thin" htmlFor="quantityEnd">
                                            đến
                                        </label>
                                        <input
                                            type="number"
                                            id="quantityEnd"
                                            className={clsx('text-input w-full py-[5px]', {
                                                invalid:
                                                    bacsicForm.touched.quantityEnd && bacsicForm.errors.quantityEnd,
                                            })}
                                            onChange={bacsicForm.handleChange}
                                            onBlur={bacsicForm.handleBlur}
                                            value={bacsicForm.values.quantityEnd}
                                            name="quantityEnd"
                                            placeholder="đến"
                                        />
                                        <span
                                            className={clsx('text-sm text-red-500 opacity-0', {
                                                'opacity-100':
                                                    bacsicForm.touched.quantityEnd && bacsicForm.errors.quantityEnd,
                                            })}
                                        >
                                            {bacsicForm.errors.quantityEnd || 'No message'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <Link to={'/product'} className="btn btn-red min-w-[100px]   basis-1/2 py-2">
                                    <span className="pr-2">
                                        <i className="fa-solid fa-circle-xmark"></i>
                                    </span>
                                    <span>Hủy </span>
                                </Link>
                                <button type="submit" className="btn btn-blue   min-w-[100px]  basis-1/2  py-2">
                                    <span className="pr-2">
                                        <i className="fa-solid fa-circle-plus"></i>
                                    </span>
                                    <span>Lọc</span>
                                </button>
                            </div>
                        </Popover.Panel>
                    </Popover>
                    <Link to="/product/views" className="btn btn-md btn-green">
                        <span className="pr-1">
                            <i className="fa-solid fa-circle-plus"></i>
                        </span>
                        <span>Views</span>
                    </Link>
                    <Link to="/product/add" className="btn btn-md btn-green">
                        <span className="pr-1">
                            <i className="fa-solid fa-circle-plus"></i>
                        </span>
                        <span>Thêm cây mới</span>
                    </Link>
                </div>
            </div>

            {/* LIST */}
            <table className="mt-8 w-full">
                <thead className="w-full rounded bg-blue-500 text-white">
                    <tr className="flex h-11 w-full">
                        <th className="flex w-16 items-center justify-end px-2">Mã số</th>
                        <th className="flex w-24 items-center justify-center px-2">Ảnh</th>
                        <th className="flex flex-[2] items-center justify-start px-2">Tên cây</th>
                        <th className="flex flex-[1] items-center justify-start px-2">Loại cây</th>
                        <th className="flex w-28 items-center justify-end px-2">Giá (VND)</th>
                        <th className="flex w-24 items-center justify-end px-2">Số lượng</th>
                        <th className="flex w-[200px] items-center justify-center px-2"></th>
                    </tr>
                </thead>

                <tbody className="flex h-[75vh] w-full flex-col" style={{ overflowY: 'overlay' }}>
                    {products
                        .filter((product) => {
                            if (search === '') {
                                return product;
                            } else {
                                if (
                                    removeVietnameseTones(product.name.toLowerCase()).includes(
                                        removeVietnameseTones(search.toLowerCase())
                                    ) ||
                                    removeVietnameseTones(product?.type.name.toLowerCase()).includes(
                                        removeVietnameseTones(search.toLowerCase())
                                    )
                                ) {
                                    var id = product.id.toString();
                                    return product.id.toString().includes(id);
                                }
                            }
                        })
                        ?.map((product, index) => (
                            <tr
                                key={product.id}
                                className="flex cursor-pointer border-b border-slate-200 hover:bg-slate-100"
                            >
                                <td
                                    className="flex w-16 items-center justify-end px-2 py-2"
                                    onClick={() => linkToDetail(product.id)}
                                >
                                    {product.id}
                                </td>
                                <td
                                    className="flex w-24 items-center justify-center px-2 py-2"
                                    onClick={() => linkToDetail(product.id)}
                                >
                                    <img
                                        src={product.image || '/placeholder.png'}
                                        className="h-10 w-10 rounded-full object-cover object-center"
                                    />
                                </td>
                                <td
                                    className="flex flex-[2] items-center justify-start px-2 py-2"
                                    onClick={() => linkToDetail(product.id)}
                                >
                                    {product.name}
                                </td>
                                <td
                                    className="flex flex-[1] items-center justify-start px-2 py-2"
                                    onClick={() => linkToDetail(product.id)}
                                >
                                    {product.type?.name || '-'}
                                </td>
                                <td
                                    className="flex w-28 items-center justify-end px-2 py-2"
                                    onClick={() => linkToDetail(product.id)}
                                >
                                    {product.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                </td>
                                <td
                                    className="flex w-24 items-center justify-end px-2 py-2"
                                    onClick={() => linkToDetail(product.id)}
                                >
                                    {product.quantity}
                                </td>
                                <td className="flex w-[200px] items-center justify-center px-2 py-2">
                                    <div className="flex justify-end">
                                        <Link to={'/product/update/' + product.id} className="btn btn-sm btn-blue">
                                            <span className="pr-1">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </span>
                                            <span>Sửa</span>
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-red"
                                            onClick={() => deleteProduct(product.id)}
                                        >
                                            <span className="pr-1">
                                                <i className="fa-solid fa-circle-xmark"></i>
                                            </span>
                                            <span>Xoá</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
}

export default Products;
