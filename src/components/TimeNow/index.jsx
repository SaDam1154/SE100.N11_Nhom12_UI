import { useEffect, useState } from 'react';

import moment from 'moment';
function TimeNow() {
    //SaDam Time.Now
    const [dt, setDt] = useState(new Date().toLocaleString());

    useEffect(() => {
        let secTimer = setInterval(() => {
            setDt(new Date().toLocaleString());
        }, 1000);

        return () => clearInterval(secTimer);
    }, []);
    ///end time
    return <div>{moment(dt).format('HH:mm:ss DD/MM/YYYY ')}</div>;
}
export default TimeNow;
