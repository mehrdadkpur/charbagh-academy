import Image from "next/image";

const MusicRotation = () => {
    return ( 
        <div className="hidden xl:inline-block md:absolute md:left-0 md:-top-20 group-hover:translate-x-4 group-hover:-translate-y-4 duration-[3000ms] group-hover:object-cover delay-150">
            <Image width={390} height={536} src="/images/Music2.png" alt="Music" />
        </div>
     );
}
 
export default MusicRotation;