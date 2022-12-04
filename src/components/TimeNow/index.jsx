import { useEffect, useState } from 'react';
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
    return <div className="text-3xl">{dt}</div>;
}
export default TimeNow;
