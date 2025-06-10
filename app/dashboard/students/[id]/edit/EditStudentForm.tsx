'use client';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { validateForm } from '@/lib/ValidateForm';
import Loading from '@/app/loading';
import toast from 'react-hot-toast';
import { Instrument, IUser } from '@/lib/types';
import UserForm from '@/app/ui/components/UserForm';

const EditStudentForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const [fields, setFields] = useState<IUser>({
    id: 0,
    firstname: '',
    lastname: '',
    birthdate: '',
    gender: 'MALE',
    nationality_number: "",
    identity_number: "",
    registry_date: "",
    mobile: '',
    email: '',
    address: '',
    skillId: null,
    password: '',
    status: 'ACTIVE',
    user_img: '/images/avatar.png',
    resume: '',
    role: "STUDENT",
    isAdmin: 0,
    skill: ""
  });
  
  const [initialDates, setInitialDates] = useState({
    birthdate: new Date(),
    registry_date: new Date()
  });
  
  const [loading, setLoading] = useState(true);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [fetchingInstruments, setFetchingInstruments] = useState(true);
  
  useEffect(() => {
    const getInstruments = async () => {
      try {
        const response = await fetch("/api/public/instruments");
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
    const fetchStudent = async () => {
      try {
        const response = await fetch(`/api/admin/students/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Student data');
        }
        
        const data = await response.json();
        
        const formattedData = {
          ...data,
          birthdate: data.birthdate ? new Date(data.birthdate).toISOString().split('T')[0] : '',
          registry_date: data.registry_date ? new Date(data.registry_date).toISOString().split('T')[0] : '',
          password: '' 
        };
        
        setFields(formattedData);
        
        // Set initial dates for the date pickers
        setInitialDates({
          birthdate: new Date(data.birthdate || new Date()),
          registry_date: new Date(data.registry_date || new Date())
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Student:', error);
        toast.error('خطا در دریافت اطلاعات مدرس');
        setLoading(false);
      }
    };
    
    if (id) {
      fetchStudent();
    }
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
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
  };

  const handleBirthDateChange = (gregorianDate: string) => {
    setFields(prev => ({ ...prev, birthdate: gregorianDate }));
  };
  
  const handleRegistryDateChange = (gregorianDate: string) => {
    setFields(prev => ({ ...prev, registry_date: gregorianDate }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm(fields.nationality_number, fields.mobile, fields.email)) {
      return;
    }
    
    setLoading(true);
    
    try {
      const submitData = { ...fields };
      const response = await fetch(`/api/admin/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });
      
      if (response.status === 409) {
        toast.error('این شماره ملی، موبایل یا ایمیل قبلا ثبت شده است');
        setLoading(false);
        return;
      }
      
      if (response.ok) {
        toast.success('مشخصات هنرآموز با موفقیت ویرایش شد');
        router.push('/dashboard/students');
        return;
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'خطا در ویرایش اطلاعات');
      }
    } catch (error) {
      console.error('Error updating Student:', error);
      toast.error('خطا در ویرایش اطلاعات');
    } finally {
      setLoading(false);
    }
  };

  if (loading || fetchingInstruments) {
    return <Loading/>;
  }

  return (
    <UserForm 
      handleBirthDateChange={handleBirthDateChange} 
      handleRegistryDateChange={handleRegistryDateChange} 
      handleChange={handleChange} 
      handleSubmit={handleSubmit} 
      fields={fields} 
      initialDates={initialDates} 
      instruments={instruments} 
      loading={loading}
    />
  );
};

export default EditStudentForm;
