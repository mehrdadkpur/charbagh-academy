
import AddInstrumentForm from "../AddInstrumentForm";

const AddTeacher = () => {

    return ( 
        <section className="flex mt-2 font-DanaMedium">
        <div className=" container flex justify-center items-center flex-col gap-y-4 ">
          <div className="w-full p-2 text-center ">
              <p> افزودن ساز  جدید </p>
          </div>
          <div className="w-1/2 flex justify-center items-center">
              <AddInstrumentForm/> 
          </div>
        </div>
      </section>
     );
}
 
export default AddTeacher;