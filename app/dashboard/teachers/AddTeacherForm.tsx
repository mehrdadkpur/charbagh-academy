"use client"
import { ChangeEvent, FormEvent, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { IUser, Instrument } from "@/lib/types"
import { validateForm } from "@/lib/ValidateForm"
import Loading from "@/app/loading"
import UserForm from "@/app/ui/components/UserForm"

const initialState: IUser = {
    id: 0,
    firstname: '',
    lastname: '',
    birthdate: "",
    gender: 'MALE',
    nationality_number: "",
    identity_number: "",
    registry_date: new Date().toISOString().split('T')[0],
    mobile: '',
    email: '',
    address: '',
    skillId: 0,
    password: '$2a$10$J0O88AIB7n4hTQ66t6UgGuPn2GX/jVYKOUGR/xHPetucVOOWg8Gte',
    status: 'ACTIVE',
    user_img: '/images/avatar.png',
    resume: '',
    role: "TEACHER",
    isAdmin: 0,
    skill:''
}

const AddTeacherForm = () => {
    const router = useRouter()
    
    const [fields, setFields] = useState<IUser>(initialState)
    const [instruments, setInstruments] = useState<Instrument[]>([])
    const [initialDates] = useState({
        birthdate: new Date(),
        registry_date: new Date()
    });
    const [loading, setLoading] = useState(false);
    const [fetchingInstruments, setFetchingInstruments] = useState(true);


    useEffect(() => {
        const getInstruments = async () => {
            try {
                const response = await fetch("/api/admin/instruments");
                if (response.ok) {
                    const data = await response.json();
                    setInstruments(data);
                } else {
                    toast.error("خطا در دریافت لیست سازها");
                }
            } catch (error) {
                console.error("Error fetching instruments:", error);
                toast.error("خطا در دریافت لیست سازها");
            } finally {
                setFetchingInstruments(false);
            }
        };

        getInstruments();
    }, []);

    useEffect(() => {
        if (fields.isAdmin === 1) {
            setFields(prev => ({ ...prev, skillId: null }));
        }
    }, [fields.isAdmin]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
        
      if (!validateForm( fields.nationality_number, fields.mobile, fields.email)) {
        return;
      }
        
      setLoading(true);
        
      try {
        const response = await fetch("/api/admin/teachers", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(fields)
        });
            
        const data = await response.json();
            
        if (response.status === 409) {
          toast.error('این کد ملی قبلا ثبت شده است');
          return;
        }
            
        if (response.ok) {
          toast.success('مدرس جدید با موفقیت اضافه شد');
          router.push('/dashboard/teachers');
        } else {
          toast.error(data.error || data.message || 'خطا در ثبت اطلاعات');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        toast.error('خطا در ثبت اطلاعات');
      } finally {
        setLoading(false);
      }
    };
    
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        
        if (name === "isAdmin") {
            const isAdminValue = value === "true" ? 1 : 0;
            // If setting to admin, also clear the skillId
            if (isAdminValue === 1) {
                setFields(prev => ({ 
                    ...prev, 
                    isAdmin: isAdminValue,
                    skillId: null
                }));
            } else {
                setFields(prev => ({ 
                    ...prev, 
                    isAdmin: isAdminValue
                }));
            }
        } else if (name === "skillId") {
            // Convert skillId to number or null
            setFields(prev => ({ 
                ...prev, 
                [name]: value ? parseInt(value, 10) : null
            }));
        } else {
            setFields(prev => ({ ...prev, [name]: value }));
        }
    }

    const handleBirthDateChange = (gregorianDate: string) => {
        setFields(prev => ({ ...prev, birthdate: gregorianDate }))
    }

    const handleRegistryDateChange = (gregorianDate: string) => {
        setFields(prev => ({ ...prev, registry_date: gregorianDate }))
    }

    if (loading || fetchingInstruments) {
        return <Loading />
    }

    return (
        <UserForm handleBirthDateChange={handleBirthDateChange} handleRegistryDateChange={handleRegistryDateChange} handleChange={handleChange} handleSubmit={handleSubmit} fields={fields} initialDates={initialDates} instruments={instruments} loading={loading}/>
    );
};

export default AddTeacherForm;
