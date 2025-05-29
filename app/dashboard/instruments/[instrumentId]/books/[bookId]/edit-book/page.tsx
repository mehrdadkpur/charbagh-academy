
import EditBookForm from "./EditBookForm";

const EditBook = () => {

    return ( 
        <section className="flex mt-2 font-DanaMedium">
        <div className=" container flex justify-center items-center flex-col gap-y-4 ">
          <div className="w-full p-2 text-center">
              <p> ویرایش کتاب </p>
          </div>
          <div className="w-1/2 flex justify-center items-center px-20 py-5">
              <EditBookForm/> 
          </div>
        </div>
      </section>
     );
}
 
export default EditBook;