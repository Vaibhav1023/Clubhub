//import FullParticles from "@/app/full-particles";
const AuthLayout = ({children} :{children: React.ReactNode}) => {
    return (
        <div className=" bg-black h-full flex items-center justify-center gap-20">
            <div className="flex-col flex ">
            <div className="text-9xl text-slate-300 overline decoration-indigo-500/40 pr-5">Co<text className="text-indigo-500">llEB</text></div>
            <div className="justify-center items-center pl-3 pt-3 text-2xl text-gray-500 ">Connect with your Teams"</div>
            </div>
            {children}
            {/* <FullParticles/> */}
        </div>
    );
}
export default AuthLayout;