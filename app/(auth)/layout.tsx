import Image from "next/image";
import clubhub from "/public/clubHub.png"

//import FullParticles from "@/app/full-particles";
const AuthLayout = ({children} :{children: React.ReactNode}) => {
    return (
        <div className=" h-full flex items-center justify-center gap-20">
            {/* <Image
                src="https://wallpapers.com/images/hd/animated-background-gc99nntouppc4inj.jpg"
                width={1000}
                height={1000}
                alt=""/> */}
            <div className="flex-col flex ">
                <Image src={clubhub} width={600} height={600} alt=""/>
            {/* <div className="text-9xl text-slate-300 pr-5">club<text className="text-indigo-500">Hub</text></div> */}
            {/* <div className="justify-center items-center pl-6 pt-5 text-2xl text-gray-500 ">Connect with your friends</div> */}
            </div>
            {children}
            {/* <FullParticles/> */}
        </div>
    );
}
export default AuthLayout;
// dark:bg-[#313338]