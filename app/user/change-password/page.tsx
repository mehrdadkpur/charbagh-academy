import ChangePassword from "@/app/ui/components/ChangePasswordPage";

export const metadata = {
  title: 'آموزشگاه چهارباغ | تغییر رمز عبور',
  description: 'این صفحه تغییر رمز عبور کاربران آموزشگاه موسیقی چهارباغ است.',
};


export default function ChangePasswordPage() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative font-Dana" style={{ backgroundImage: "url('/images/login.jpg')" }}>
      <div className="absolute inset-0 bg-black/40" /> 
      <div className="container mx-auto py-40 relative z-10">
        <ChangePassword />
      </div>
    </div>
  )
}
