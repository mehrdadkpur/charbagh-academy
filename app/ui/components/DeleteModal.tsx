"use client"

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

interface DeleteModalProps {
  onDelete: () => Promise<void> 
}

const DeleteModal = ({ onDelete }: DeleteModalProps) => {
  const MySwal = withReactContent(Swal)

  const showConfirmation = () => {
    MySwal.fire({
      title: 'آیا مطمئنی؟',
      text: 'مطمئن هستی می‌خوای این مورد حذف بشه؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'بله، حذف کن',
      cancelButtonText: 'نه، لغو کن',
      customClass: {
        confirmButton: 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded',
        cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded',
      },
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await onDelete()
          MySwal.fire({
            title: 'حذف شد!',
            text: 'آیتم با موفقیت حذف شد.',
            icon: 'success',
            confirmButtonText: 'باشه',
          })
        } catch (error) {
          MySwal.fire({
            title: 'خطا!',
            text: 'مشکلی در حذف آیتم به وجود آمد. لطفاً دوباره تلاش کن.',
            icon: 'error',
            confirmButtonText: 'باشه',
          })
        }
      }
    })
  }

  return (
    <button
      onClick={showConfirmation}
      className="text-red-600 hover:text-red-700 font-DanaDemiBold"
    >
      حذف
    </button>
  )
}

export default DeleteModal
