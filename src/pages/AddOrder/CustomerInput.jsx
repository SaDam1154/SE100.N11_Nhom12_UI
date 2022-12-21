import clsx from 'clsx';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string()
        .required('Trường này bắt buộc')
        .min(2, 'Tên phải có độ dài hơn 2 kí tự')
        .max(30, 'Tên dài tối đa 30 kí tự'),
    address: Yup.string().required('Trường này bắt buộc'),
    phone: Yup.string()
        .required('Trường này bắt buộc')
        .matches(/^[\+|0]([0-9]{10,14})\b/, 'Số điện thoại không hợp lệ'),
});

function CustomerInput() {
    const [customer, setCustomer] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            address: '',
        },
        validationSchema,
    });

    useEffect(() => {
        fetch('http://localhost:5000/api/customer?' + `filters={"phone": "${formik.values.phone}"}`)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success && resJson.customers?.length !== 0) {
                    setCustomer(resJson.customers[0]);
                } else {
                    setCustomer(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setCustomer(false);
            });
    }, [formik.values.phone]);

    useEffect(() => {
        if (!customer) {
            return;
        }
        formik.setFieldValue('name', customer.name);
        formik.setFieldValue('address', customer.address);
    }, [customer]);

    return (
        <form className="flex space-x-4 rounded-md border px-2 pt-2 shadow">
            <div className="flex w-56 flex-col">
                <label className="mb-1 font-semibold" htmlFor="phone">
                    Số điện thoại
                </label>
                <input
                    type="text"
                    id="phone"
                    className={clsx('text-input py-1', {
                        invalid: formik.touched.phone && formik.errors.phone,
                    })}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    name="phone"
                    placeholder="Số điện thoại"
                />
                <span
                    className={clsx('text-xs text-red-500 opacity-0', {
                        'opacity-100': formik.touched.phone && formik.errors.phone,
                    })}
                >
                    {formik.errors.phone || 'No message'}
                </span>
            </div>
            <div className="flex w-64 flex-col">
                <label className="mb-1 font-semibold" htmlFor="name">
                    Tên khách hàng
                </label>
                <input
                    type="text"
                    id="name"
                    className={clsx('text-input py-1', {
                        invalid: formik.touched.name && formik.errors.name,
                        disabled: customer,
                    })}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    name="name"
                    placeholder="Tên khách hàng"
                />
                <span
                    className={clsx('text-xs text-red-500 opacity-0', {
                        'opacity-100': formik.touched.name && formik.errors.name,
                    })}
                >
                    {formik.errors.name || 'No message'}
                </span>
            </div>
            <div className="flex grow flex-col">
                <label className="mb-1 font-semibold" htmlFor="address">
                    Địa chỉ
                </label>
                <input
                    type="text"
                    id="address"
                    className={clsx('text-input py-1', {
                        invalid: formik.touched.address && formik.errors.address,
                        disabled: customer,
                    })}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    name="address"
                    placeholder="Địa chỉ"
                />
                <span
                    className={clsx('text-xs text-red-500 opacity-0', {
                        'opacity-100': formik.touched.address && formik.errors.address,
                    })}
                >
                    {formik.errors.address || 'No message'}
                </span>
            </div>
        </form>
    );
}

export default CustomerInput;
