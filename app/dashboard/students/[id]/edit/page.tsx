
import EditStudentForm from "./EditStudentForm";

const EditStudent = () => {

    return ( 
        <section className="flex mt-2">
        <div className=" container flex justify-center items-center flex-col gap-y-2 ">
          <div className="w-full p-2 rounded-lg font-DanaDemiBold">
              <p> ویرایش هنرجو </p>
          </div>
          <div className="w-full px-20 py-10 rounded-lg">
              <EditStudentForm/> 
          </div>
        </div>
      </section>
     );
}
 
export default EditStudent;