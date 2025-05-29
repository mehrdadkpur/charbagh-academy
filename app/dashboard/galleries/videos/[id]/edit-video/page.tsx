
import EditVideoForm from "./EditVideoForm";

const EditVideo = () => {

    return ( 
        <section className="flex mt-2">
        <div className=" container flex justify-center items-center flex-col gap-y-4 ">
          <div className="w-full p-2 text-center">
              <p> ویرایش مشخصات فیلم </p>
          </div>
          <div className="w-1/2 flex justify-center items-center px-20 py-5">
              <EditVideoForm/> 
          </div>
        </div>
      </section>
     );
}
 
export default EditVideo;