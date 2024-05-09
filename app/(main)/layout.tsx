import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
const MainLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    return(


        <div className=" w-full h-full">
            {/* <div className="w-[72px] h-full hidden flex-col fixed bg-sky-200">hi</div> */}
            <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
                <NavigationSidebar />
            </div>
            {/* <div className=" flex md:flex w-full h-[72px] z-40 flex-row inset-x-0">
                <NavigationSidebar/>
            </div> */}
            {/* <main className="w-full">{children}</main> */}
            
            <main className="md:pl-[72px] h-full">{children}</main>
        </div>
    )
}

export default MainLayout; 