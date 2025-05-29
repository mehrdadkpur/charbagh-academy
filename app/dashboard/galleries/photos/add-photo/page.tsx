
import AddPhotoForm from "../AddPhotoForm";

const AddPhoto = () => {

    return ( 
        <section className="flex mt-2">
        <div className=" container flex justify-center items-center flex-col gap-y-4 ">
          <div className="w-full p-2 text-center">
              <p> افزودن عکس  جدید </p>
          </div>
          <div className="w-2/3 flex justify-center items-center px-20 py-5">
              <AddPhotoForm/> 
          </div>
        </div>
      </section>
     );
}
 
export default AddPhoto;