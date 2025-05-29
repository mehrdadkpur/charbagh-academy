import Link from "next/link";

const AddButton = ({route}:{route:string}) => {
    return ( 
        <div className="flex justify-center items-center p-2 bg-elf rounded-xl text-white">
        <Link href={route}  >
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </Link>
    </div>
     );
}
 
export default AddButton;