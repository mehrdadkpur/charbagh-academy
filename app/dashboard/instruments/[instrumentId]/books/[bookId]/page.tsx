"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useState, useEffect, ChangeEvent, useCallback } from "react"
import { fetchSongs } from "@/lib/requests"
import Loading from "@/app/loading"
import Search from "@/app/ui/components/Search"
import AddButton from "@/app/ui/components/AddButton"
import toast from "react-hot-toast"
import Image from "next/image"
import Swal from "sweetalert2"
import { Instrument, ISong, IBook } from "@/lib/types"
import AudioPlayerModal from "@/app/ui/components/AudioPlayerModal"


interface QueryState {
  text: string
}

const Songs = () => {
  const params = useParams();
  
  const instrumentId = Number(params.instrumentId)
  const bookId = Number(params.bookId)

  const [instrument, setInstrument] = useState<(Instrument & { currentBook?: IBook }) | null>(null)
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState<QueryState>({ text: "" })
  const [filteredSongs, setFilteredSongs] = useState<ISong[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);



  useEffect(() => {
    const fetchSongData = async () => {
      if (!instrumentId || !bookId) return
  
      try {
        const data = await fetchSongs(instrumentId, bookId);
        if (!data) return;
  
        setInstrument({ ...data.instrument, currentBook: data.book });
        setFilteredSongs(data.songs);
      } catch (error) {
        toast.error("خطا در دریافت اطلاعات")
      } finally {
        setLoading(false)
      }
    }
  
    fetchSongData()
  }, [instrumentId, bookId])
  

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase()
    setQuery({ text: e.target.value })

    if (!instrument?.currentBook) return

    const allSongs = instrument.currentBook.songs.filter((song) => {
      const songNameMatch = song.song_title.toLowerCase().includes(searchText)
      const songArtistNameMatch = song.song_artist.toLowerCase().includes(searchText)
      return songNameMatch || songArtistNameMatch
    })
    setFilteredSongs(allSongs)
  }

  const handleSongClick = useCallback((song) => {
    setSelectedSong(song);
    setModalIsOpen(true);
}, []);

  const handleDeleteSong = async (songId: number) => {
    const result = await Swal.fire({
      title: "آیا مطمئنی؟",
      text: "این عملیات قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، حذفش کن",
      cancelButtonText: "نه، منصرف شدم",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    })

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/admin/instruments/${instrumentId}/books/${bookId}/songs/${songId}`, {
          method: "DELETE",
        })

        if (res.ok) {
          setFilteredSongs((prev) => prev.filter((song) => song.id !== songId))
          Swal.fire("حذف شد!", "موسیقی با موفقیت حذف شد.", "success")
        } else {
          Swal.fire("خطا", "مشکلی در حذف موسیقی رخ داد.", "error")
        }
      } catch (error) {
        Swal.fire("خطا", "مشکلی در حذف موسیقی رخ داد.", "error")
        console.error("Error deleting Song:", error)
      }
    }
  }

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
}, []);

  if (loading) return <Loading />
 

  return (
    <section className="w-full flex justify-center pr-[340px] pl-10 mt-3">
      <div className="w-full p-5 flex justify-center rounded-xl">
        <div className="w-full mt-5">
          <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4">
            موسیقی‌های کتاب{" "}
            <span className="bg-mango p-2 rounded-xl mx-1">{instrument.currentBook.book_name}</span>
            ساز{" "}
            <span className="bg-sky-600 text-white p-2 rounded-xl mx-1">{instrument.instrument_name}</span>
          </span>

          <div className="relative w-full overflow-x-auto sm:rounded-lg">
            <div className="w-full flex justify-center items-center gap-x-5 mb-5">
              <Search query={query} handleSearch={handleSearch} baseSearch={"نام موسیقی یا نوازنده"} />
              <AddButton route={`/dashboard/instruments/${instrumentId}/books/${bookId}/add-song`} />
            </div>

            {filteredSongs.length === 0 ? (
              <div className="w-full h-96 flex justify-center items-center text-xl font-DanaDemiBold">
                <p>هنوز هیچ موسیقی اضافه نکردی. برای اضافه کردن از دکمه + بالا استفاده کن.</p>
              </div>
            ) : (
              <table className="w-full text-sm font-DanaMedium">
                <thead className="text-xs">
                  <tr>
                    <th className="px-6 py-3">نام موسیقی</th>
                    <th className="px-6 py-3">نوازنده</th>
                    <th className="px-6 py-3">پخش موسیقی</th>
                    <th className="px-6 py-3 text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSongs.map((song) => (
                    <tr key={song.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-600">
                      <td className="px-6 py-4 flex items-center gap-2">
                        <Image width={40} height={40} src="/images/songs/cover.png" alt="song" className="rounded-full" />
                        <span>{song.song_title}</span>
                      </td>
                      <td className="px-6 py-4">{song.song_artist}</td>
                      <td className="px-6 py-4">
                      <div key={song.id} onClick={() => handleSongClick(song)} className=" flex justify-center p-3 cursor-pointer md:hover:bg-slate-200 rounded-xl shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                        </svg>
                      </div>
                      <AudioPlayerModal modalIsOpen={modalIsOpen} closeModal={closeModal} selectedSong={selectedSong}/>
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-2">
                        <Link
                          href={`/dashboard/instruments/${instrumentId}/books/${bookId}/songs/${song.id}/edit-song`}
                          className="bg-orange-700 px-3 py-1.5 rounded-lg text-white hover:bg-orange-800"
                        >
                          ویرایش
                        </Link>
                        <button
                          onClick={() => handleDeleteSong(song.id)}
                          className="bg-red-700 px-3 py-1.5 rounded-lg text-white hover:bg-red-800"
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="w-full mt-5 flex justify-center items-center font-DanaDemiBold">
            <Link
              href={`/dashboard/instruments/${instrumentId}`}
              className="w-1/6 flex justify-center items-center bg-red-700 px-3 py-1.5 rounded-lg text-white hover:bg-red-800 transition-colors"
            >
              بازگشت به کتاب ها
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Songs
