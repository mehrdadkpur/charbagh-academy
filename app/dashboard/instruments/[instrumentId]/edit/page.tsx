
import EditInstrumentForm from "./EditInstrumentForm";

const EditInstrument = () => {

    return ( 
        <section className="flex mt-2 font-DanaMedium">
        <div className=" container flex justify-center items-center flex-col gap-y-4 border">
          <div className="w-full text-center p-2">
              <p> ویرایش ساز </p>
          </div>
          <div className="w-1/2 flex justify-center items-center px-20 py-5">
              <EditInstrumentForm/> 
          </div>
        </div>
      </section>
     );
}
 
export default EditInstrument;