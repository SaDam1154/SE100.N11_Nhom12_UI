function PriceFormat({ children }) {
    return <>{children.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</>;
}

export default PriceFormat;
