const Pagination = () => {
    return ( 
        <div className="w-full flex justify-between p-2.5 font-Dana">
            <button disabled className="p-2 rounded-xl cursor-pointer disabled:cursor-not-allowed bg-white ">صفحه قبل</button>
            <button className="p-2 rounded-xl cursor-pointer disabled:cursor-not-allowed bg-white ">صفحه بعد</button>
        </div>
     );
}
 
export default Pagination;