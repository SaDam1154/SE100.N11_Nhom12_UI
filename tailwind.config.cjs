/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            boxShadow: {
                test: '0 0 1px 1px red',
            },
        },
    },
    plugins: [],
};
