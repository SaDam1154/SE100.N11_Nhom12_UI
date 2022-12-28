import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

function AccountRule({ ...props }) {
    const [accountRules, setAccountRules] = useState([]);
    const selectElem = useRef(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setAccountRules(resJson.accountRules);
                } else {
                    setAccountRules([]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <select {...props} ref={selectElem}>
            <option value="" disabled>
                -- Chọn chức vụ --
            </option>
            {accountRules.map((accountRule) => (
                <option key={accountRule._id} value={accountRule._id}>
                    {accountRule.name}
                </option>
            ))}
        </select>
    );
}
export default AccountRule;
