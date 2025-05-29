import { Origin, InsType } from "@prisma/client";


export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  nationality_number: string;
  identity_number: string;
  registry_date: string;
  mobile: string;
  email: string;
  address: string;
  skill:Instrument | string | null;
  skillId: number | null;
  password: string;
  status: 'ACTIVE' | 'DEACTIVE' | 'SUSPEND' | 'PENDING';
  user_img: string;
  resume: string;
  role: string;
  isAdmin: number;
}


  export interface IBlog {
    id:number;
    authorId: number;
    blog_title: string;
    blog_text: string;
    blog_img: string;
    author: IUser
    status:'ACTIVE' | 'DEACTIVE' | 'SUSPEND' | 'PENDING';
    createdAt:string;
    updatedAt:string;
  }


  export interface ICourse {
    id: number;
    course_name: string;
    course_status: string;
    course_img: string;
    course_description: string;
    instrument:Instrument;
    instrumentId: number;
    teacherId: number;
    teacher: {  
        id: number;
        firstname: string;
        lastname: string;
    };
  }
  

  

  export interface ICategory {
    id: number
    category_name: string
  }

  export interface IPhoto {
    id: number
    title: string
    url: string
    photoDate?: string
    description: string
    category: ICategory  
    createdAt: string
    updatedAt: string
  }

  export interface IVideo {
    id: number
    url: string
    title: string
    category: ICategory
    videoDate?: string
    description:string
    createdAt: string
    updatedAt: string
}


export interface Instrument {
  id: number;
  instrument_name: string;
  instrument_img: string;
  instrument_description: string;
  instrument_origin: Origin;
  instrument_type: InsType;
  createdAt: string;
  updatedAt: string;
  books: IBook[];
  instrument_teachers: IUser[];
}


  export interface IBook {
    id:number
    book_name:string
    createdAt:string;
    updatedAt:string;
  }

  export interface ISong {
    id:number
    song_title:string
    song_artist:string
    song_url:string
    createdAt:string;
    updatedAt:string;
  }
  
export interface IGuidance {
  id: number;
  fullname: string;
  mobile: string;
  createdAt: string;
  status: "ACTIVE" | "DEACTIVE" | "PENDING";
}