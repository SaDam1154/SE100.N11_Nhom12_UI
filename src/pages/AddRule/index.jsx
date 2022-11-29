const rules = [
    {
        id:"1",
        rule: "Bán hàng",
    },
    {
        id:"2",
        rule: "Thống kê doanh thu",
    },
    {
        id:"3",
        rule: "Thống kê hàng hóa",
    },
    {
        id:"4",
        rule: "QUản lý nhân viên",
    },    
    {
        id:"5",
        rule: "QUản lý hàng hóa",
    },
    {
        id:"6",
        rule: "Bán hàng",
    },
    {
        id:"7",
        rule: "Thống kê doanh thu",
    },
    {
        id:"8",
        rule: "Thống kê hàng hóa",
    },
];

function AddRule () {
    return (
        <div className="container text-lg">
            <div className="flex flex-row">
                <div className="title m-auto">
                    <label className="text-4xl">
                        Thêm chức vụ
                    </label>
                </div>
            </div>
            
            <div className="flex flex-row mt-10 justify-center">
                <div className="flex-col">
                    <label htmlFor="" className="text-2xl pr-5">Chức vụ:</label>
                </div>
                <div className="flex-col border-solib border-b-[1px] border-stone-900">
                    <input type="text" className="text-input text-xl border-none text-blue-400 " placeholder="Tên chức vụ"/>
                </div>
            </div>

            <div className="table-content flex flex-row mt-10 text-xl">
                <table className="w-[80%] m-auto">                
                <tbody>
                    {rules.map((rules) => (
                        <tr key={rules.id} className="cursor-pointer border-b border-slate-200 hover:bg-slate-100">
                            <td className="py-2 text-center">
                                <input type="checkbox" className="check border-dashed-black appearance-none checked:bg-blue-500 " id={rules.id}/>
                            </td>
                            <td className="py-2 text-left">
                                <label className="" htmlFor={rules.id}>{rules.rule}</label>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>  
            <div className="form-check mt-6">
                <input className="form-check-input" type="checkbox" id="checkbox-all"/>
                <label htmlFor="checkbox-all">Chọn tất cả</label>
            </div>
        </div>
    )
}
export default AddRule;