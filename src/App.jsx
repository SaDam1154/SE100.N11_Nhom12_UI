import Header from "./layouts/components/Header";
import Sidebar from "./layouts/components/Sidebar";


function App() {
    return (
        <div className="flex h-screen">
            <Sidebar></Sidebar>

            <div className="flex h-screen flex-1 flex-col">
                <Header>Trang chủ</Header>
                <main className="flex-1 p-5">
                    Nội dung gì đó ở đây
                </main>
            </div>
        </div>
    );
}

export default App;
