
import AddStudentForm from "../AddStudentForm";

const AddStudent = () => {

    return ( 
        <section className="flex mt-2">
        <div className=" container flex justify-center items-center flex-col gap-y-2 ">
          <div className="w-full p-2 rounded-lg font-DanaDemiBold">
              <p> افزودن هنرجوی  جدید </p>
          </div>
          <div className="w-full px-20 py-10 rounded-lg">
              <AddStudentForm/> 
          </div>
        </div>
      </section>
     );
}
 
export default AddStudent;