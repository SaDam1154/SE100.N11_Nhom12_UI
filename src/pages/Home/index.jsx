import { useEffect, useState } from 'react';

function Home() {
    const [text, setText] = useState('');
    useEffect(() => {
        fetch('http://localhost:3000')
            .then((res) => res.json())
            .then((data) => setText(data));
    }, []);
    return <h1>{text}</h1>;
}

export default Home;
