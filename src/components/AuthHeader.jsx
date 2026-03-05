import ThemeToggle from "./themeToggle";

const AuthHeader = () => {
    return ( 
        <div className="bg-card fixed top-0 px-3 py-2 w-full   shadow shadow-border-color">
            <nav className=" flex   justify-between items-center">
                <div className="flex justify-center items-center">
                    <span><img src="/logo.png" className="w-[40px]" alt="" /></span>
                    <span><h1 className="text-text text-md">Growvia</h1></span>
                </div>
                <div>
                    <ThemeToggle/>
                </div>
            </nav>
        </div>
     );
}
 
export default AuthHeader;