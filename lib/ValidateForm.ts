import toast from "react-hot-toast";

export const validateForm = ( nationality_number: string, mobile: string, email: string) => {

  if (!nationality_number || nationality_number.toString().length !== 10) {
    toast.error('شماره ملی باید 10 رقم باشد');
    return false;
  }
  
  if (!mobile || mobile.length !== 11) {
    toast.error('شماره موبایل باید 11 رقم باشد');
    return false;
  }

  if (!email || !email.includes('@')) {
    toast.error('لطفا یک ایمیل معتبر وارد کنید');
    return false;
  }
  
  return true;
};
