"use client"
import AddBookForm from './AddBookForm';

export default function AddBookPage() {

  return (
    <section className="flex mt-2 font-DanaMedium">
      <div className="container flex justify-center items-center flex-col gap-y-4">
        <div className="w-full p-2 text-center">
          <p>افزودن کتاب جدید</p>
        </div>
        <div className="w-1/2 flex justify-center items-center px-20 py-5">
          <AddBookForm />
        </div>
      </div>
    </section>
  );
}
