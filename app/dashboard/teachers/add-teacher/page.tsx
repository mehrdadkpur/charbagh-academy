
import AddTeacherForm from "../AddTeacherForm";

const AddTeacher = () => {

    return ( 
        <section className="flex mt-2">
        <div className=" container flex justify-center items-center flex-col gap-y-2 ">
          <div className="w-full p-2 text-center rounded-lg font-DanaDemiBold">
              <p> افزودن استاد  جدید </p>
          </div>
          <div className="w-full px-20 py-10 rounded-lg">
              <AddTeacherForm/> 
          </div>
        </div>
      </section>
     );
}
 
export default AddTeacher;