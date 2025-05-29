import Link from "next/link";
import ShamsiDatePicker from "./ShamsiDatePicker";
import { Instrument } from "@/lib/types";

const UserForm = ({handleBirthDateChange,handleRegistryDateChange,handleChange,handleSubmit,fields,initialDates,instruments,loading}:any) => {
    return ( 
         <form onSubmit={handleSubmit} className="w-full flex justify-center items-center flex-col gap-y-5 font-Dana text-nowrap">
            <div className="w-full grid grid-cols-2 gap-y-5 gap-x-10">
                <div className="w-full flex justify-center items-center gap-x-2">
                    <label className="w-1/3" htmlFor="firstname">نام:</label>
                    <input
                        name="firstname"
                        type="text"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        placeholder="نام"
                        required
                        value={fields.firstname}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full flex justify-center items-center gap-x-2">
                    <label className="w-1/3" htmlFor="lastname"> نام خانوادگی:</label>
                    <input
                        name="lastname"
                        type="text"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        placeholder="نام خانوادگی"
                        required
                        value={fields.lastname}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full flex justify-center items-center gap-x-2 ">
                    <label className="w-1/3">تاریخ تولد:</label>
                    <div className="w-2/3">
                    <ShamsiDatePicker
                        onChange={handleBirthDateChange}
                        initialDate={fields.videoDate ? new Date(fields.videoDate) : new Date()}
                    />
                    </div>
                </div>                             
                <div className="w-full flex justify-center items-center gap-x-2 ">
                    <label className="w-1/3">تاریخ ثبت نام:</label>
                    <div className="w-2/3">
                        <ShamsiDatePicker
                            initialDate={initialDates.registry_date}
                            onChange={handleRegistryDateChange}
                            
                        />
                    </div>
                </div>
                <div className="w-full flex justify-center items-center gap-x-2">
                    <label className="w-1/3" htmlFor="gender">جنسیت:</label>
                    <select
                        name="gender"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        required
                        value={fields.gender}
                        onChange={handleChange}
                    >
                        <option value="">جنسیت</option>
                        <option value="MALE">آقا</option>
                        <option value="FEMALE">خانم</option>
                        <option value="OTHER">سایر</option>
                    </select>
                </div>
                <div className="w-full flex justify-center items-center gap-x-2">
                    <label className="w-1/3" htmlFor="nationality_number">شماره ملی:</label>
                    <input
                        name="nationality_number"
                        type="string"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        placeholder=" شماره ملی"
                        required
                        value={fields.nationality_number}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full flex justify-center items-center gap-x-2">
                    <label className="w-1/3" htmlFor="identity_number">شماره شناسایی:</label>
                    <input
                        name="identity_number"
                        type="string"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        placeholder=" شماره شناسایی"
                        required
                        value={fields.identity_number}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full flex justify-center items-center gap-x-2">
                    <label className="w-1/3" htmlFor="mobile">شماره موبایل:</label>
                    <input
                        name="mobile"
                        type="text"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        required
                        placeholder="شماره موبایل"
                        value={fields.mobile}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full flex justify-center items-center gap-x-2">
                    <label className="w-1/3" htmlFor="email">ایمیل:</label>
                    <input
                        type="email"
                        name="email"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        required
                        placeholder="آدرس ایمیل"
                        value={fields.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full flex justify-center items-center gap-x-2">
                    <label className="w-1/3" htmlFor="address">آدرس:</label>
                    <input
                        type="text"
                        name="address"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        required
                        placeholder="آدرس منزل"
                        value={fields.address}
                        onChange={handleChange}
                    />
                </div>
                {fields.isAdmin === 0 && (
                    <div className="w-full flex justify-center items-center gap-x-2">
                        <label className="w-1/3" htmlFor="skillId">ساز تخصصی:</label>
                        <select
                            name="skillId"
                            className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                            required={fields.isAdmin === 0}
                            value={fields.skillId || ""}
                            onChange={handleChange}
                        >
                            <option value="">انتخاب ساز</option>
                            {instruments.map((instrument:Instrument ) => (
                                <option key={instrument.id} value={instrument.id}>
                                    {instrument.instrument_name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="w-full flex justify-center items-center gap-x-2">
                    <label className="w-1/3" htmlFor="status">وضعیت:</label>
                    <select
                        name="status"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        required
                        value={fields.status}
                        onChange={handleChange}
                    >
                        <option value="">وضعیت</option>
                        <option value="ACTIVE">فعال</option>
                        <option value="DEACTIVE">غیرفعال</option>
                        <option value="SUSPEND">معلق</option>
                        <option value="PENDING">در انتظار تایید</option>
                    </select>
                </div>
                <div className="w-full flex justify-center items-center gap-x-2">
                    <label className="w-1/3" htmlFor="isAdmin">مدیر سیستم:</label>
                    <select
                        name="isAdmin"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        value={fields.isAdmin === 1 ? "true" : "false"}
                        onChange={handleChange}
                    >
                        <option value="false">خیر</option>
                        <option value="true">بله</option>
                    </select>
                </div>
            </div>
            <div className="w-1/4 flex justify-center items-center flex-col gap-y-3 ">
                <button 
                    type="submit" 
                    className="w-full p-3 bg-green-600 rounded-lg text-center text-white"
                    disabled={loading}
                >
                    {loading ? 'در حال ثبت...' : 'ثبت'}
                </button>
                <Link
                    href="/dashboard"
                    className="w-full p-3 bg-red-600 rounded-lg text-center text-white"
                >
                    انصراف
                </Link>
            </div>
        </form>
     );
}
 
export default UserForm
