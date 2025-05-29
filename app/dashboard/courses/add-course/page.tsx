
import AddCourseForm from "../AddCourseForm";

const AddCourse = () => {

    return ( 
        <section className="flex mt-2">
        <div className=" container flex justify-center items-center flex-col gap-y-4 font-DanaMedium ">
          <div className="w-full p-2 text-center">
              <p> افزودن دوره جدید </p>
          </div>
          <div className="w-1/2 flex justify-center items-center px-20 py-5">
              <AddCourseForm/> 
          </div>
        </div>
      </section>
     );
}
 
export default AddCourse;