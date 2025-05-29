
import EditSongForm from "./EditSongForm";

const EditSong = () => {

    return ( 
        <section className="flex mt-2">
        <div className=" container flex justify-center items-center flex-col gap-y-4 ">
          <div className="w-full p-2 text-center">
              <p> ویرایش موسیقی </p>
          </div>
          <div className="w-1/2 flex justify-center items-center px-20 py-5">
              <EditSongForm/> 
          </div>
        </div>
      </section>
     );
}
 
export default EditSong;