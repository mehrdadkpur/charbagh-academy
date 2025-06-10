import { IUser } from "./types";


const apiDomain = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000' ;

export async function fetchInstruments() {
    
        const res = await fetch(`${apiDomain}/api/public/instruments`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            }});
        if (!res.ok) {
            throw new Error('Failed to Fetch Instruments');
        }
        const instrumentsData = await res.json();
        return {instruments:instrumentsData}
}

export async function fetchFullInstruments() {
    
    const res = await fetch(`${apiDomain}/api/admin/instruments`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        }});
    if (!res.ok) {
        throw new Error('Failed to Fetch Instruments');
    }
    const instrumentsData = await res.json();
    return {instruments:instrumentsData}
}

export async function fetchAllBlogs() {
    
    const res = await fetch(`${apiDomain}/api/admin/blogs`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        }});
    if (!res.ok) {
        throw new Error('Failed to Fetch Blogs');
    }
    const blogsData = await res.json();
    return {blogs:blogsData}
}

export async function fetchActiveBlogs() {
    
    const res = await fetch(`${apiDomain}/api/public/blogs/active`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        }});
    if (!res.ok) {
        throw new Error('Failed to Fetch Blogs');
    }
    const blogsData = await res.json();
    return {blogs:blogsData}
}

export async function fetchPendingBlogs() {
    
    const res = await fetch(`${apiDomain}/api/admin/blogs/pending`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        }});
    if (!res.ok) {
        throw new Error('Failed to Fetch Blogs');
    }
    const blogsData = await res.json();
    return {blogs:blogsData}
}

export const fetchStudents = async (): Promise<IUser[]> => {
    try {
      const response = await fetch("/api/admin/students");
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      const data = await response.json();
      return data.students;
    } catch (error) {
      console.error("Error fetching students:", error);
      return [];
    }
  };

export const fetchAdmins = async (): Promise<IUser[]> => {
    try {
      const response = await fetch("/api/admin/admins");
      if (!response.ok) {
        throw new Error("Failed to fetch Admind");
      }
      const data = await response.json();
      return data.admins;
    } catch (error) {
      console.error("Error fetching Admind:", error);
      return [];
    }
  };

export async function fetchInstrument (id:number){
    try {
        if(!apiDomain){
            return null ;
        }
        const res = await fetch(`${apiDomain}/api/public/instruments/${id}`);
            if(!res.ok){
                throw new Error("Fail To Fetch Data");
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function fetchFullInstrument (id:number){
    try {
        if(!apiDomain){
            return null ;
        }
        const res = await fetch(`${apiDomain}/api/admin/instruments/${id}`);
            if(!res.ok){
                throw new Error("Fail To Fetch Data");
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}


export async function fetchTeachersName(): Promise<IUser[]> {
  try {
    const response = await fetch('/api/users/teachers');
    
    if (!response.ok) {
      console.error('Failed to fetch teachers:', response.status, response.statusText);
      throw new Error(`Failed to fetch teachers: ${response.status}`);
    }
    
    const data = await response.json();
    return data.teachers || [];
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return [];
  }
}


export async function fetchComments() {
    
    const res = await fetch(`${apiDomain}/api/public/comments` , {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        }});
    if (!res.ok) {
        throw new Error('Failed to Fetch Comments');
    }
    const commentsData = await res.json();
    return {comments:commentsData}
} 

export async function fetchCourses() {
    const res = await fetch(`${apiDomain}/api/public/courses`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch Courses');
    }

    const coursesData = await res.json();
    
    return { courses: coursesData };
}

export async function fetchFullCourses() {
    const res = await fetch(`${apiDomain}/api/admin/courses`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch Courses');
    }

    const coursesData = await res.json();
    
    return { courses: coursesData };
}

export async function fetchGalleries() {
    const res = await fetch(`${apiDomain}/api/public/galleries`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch Galleries');
    }

    const galleriesData = await res.json();
    
    return { galleries: galleriesData };
}

export async function fetchTeacher(id: string) {
    const res = await fetch(`${apiDomain}/api/public/teachers/${id}`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.error || `Failed to fetch teacher with ID ${id}`);
    }
    
    return await res.json();
}

export async function fetchFullTeacher(id: string) {
    const res = await fetch(`${apiDomain}/api/admin/teachers/${id}`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.error || `Failed to fetch teacher with ID ${id}`);
    }
    
    return await res.json();
} 

export async function fetchCourse (id:string){
    try {
        if(!apiDomain){
            return null ;
        }
        const res = await fetch(`${apiDomain}/api/public/courses/${id}`);
            if(!res.ok){
                throw new Error("Fail To Fetch Data");
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function fetchFullCourse (id:string){
    try {
        if(!apiDomain){
            return null ;
        }
        const res = await fetch(`${apiDomain}/api/admin/courses/${id}`);
            if(!res.ok){
                throw new Error("Fail To Fetch Data");
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function fetchStudent (id:string){
    try {
        if(!apiDomain){
            return null ;
        }
        const res = await fetch(`${apiDomain}/api/admin/students/${id}`);
            if(!res.ok){
                throw new Error("Fail To Fetch Data");
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function fetchAdmin (id:string){
    try {
        if(!apiDomain){
            return null ;
        }
        const res = await fetch(`${apiDomain}/api/admin/admins/${id}`);
            if(!res.ok){
                throw new Error("Fail To Fetch Admin");
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function fetchBlog (id:string){
    try {
        if(!apiDomain){
            return null;
        }
        const res = await fetch(`${apiDomain}/api/public/blogs/active/${id}`);
        if(!res.ok){
            throw new Error("Fail To Fetch Data");
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function fetchSong(id:number){
    try {
        if(!apiDomain){
            return null;
        }
        const res = await fetch(`${apiDomain}/api/songs/${id}`);
        if(!res.ok){
            throw new Error("Fail To Fetch Data");
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function fetchTeachers() {
    const res = await fetch(`${apiDomain}/api/public/teachers`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!res.ok) {
        throw new Error('Failed to fetch Teachers');
    }
    return await res.json();
}

export async function fetchFullTeachers() {
    const res = await fetch(`${apiDomain}/api/admin/teachers`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!res.ok) {
        throw new Error('Failed to fetch Teachers');
    }
    return await res.json();
}

export async function fetchPhoto(id:number){
    try {
        if(!apiDomain){
            return null;
        }
        const res = await fetch(`${apiDomain}/api/galleries/photos/${id}`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            }});
        if(!res.ok){
            throw new Error("Fail To Fetch Data");
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function fetchFullPhoto(id:number){
    try {
        if(!apiDomain){
            return null;
        }
        const res = await fetch(`${apiDomain}/api/admin/galleries/photos/${id}`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            }});
        if(!res.ok){
            throw new Error("Fail To Fetch Data");
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function fetchVideo(id:number){
    try {
        if(!apiDomain){
            return null;
        }
        const res = await fetch(`${apiDomain}/api/galleries/videos/${id}`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            }});
        if(!res.ok){
            throw new Error("Fail To Fetch Data");
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function fetchBooks(id:number){
    try {
        if(!apiDomain){
            return null;
        }
        const res = await fetch(`${apiDomain}/api/admin/instruments/${id}`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            }});
        if(!res.ok){
            throw new Error("Fail To Fetch Data");
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function fetchSongs(instrumentId: number, bookId: number) {
    try {
      if (!apiDomain) return null;
  
      const res = await fetch(`${apiDomain}/api/admin/instruments/${instrumentId}/books/${bookId}`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.ok) {
        throw new Error("Fail to fetch songs");
      }
  
      const data = await res.json();
      return {
        instrument: data.instrument,
        book: data.book,
        songs: data.book.songs,
      };
    } catch (error) {
      console.error("Error fetching songs:", error);
      return null;
    }
  }
  
export async function fetchPhotos() {
    const res = await fetch('/api/public/galleries/photos', {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch photos');
    }

    return res.json(); 
}

export async function fetchFullPhotos() {
    const res = await fetch('/api/admin/galleries/photos', {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch photos');
    }

    return res.json(); 
}

export async function fetchAllVideos() {
    const res = await fetch('/api/admin/galleries/videos', {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch Videos');
    }

    return res.json(); 
}

export async function fetchFullVideo(id:number){
    try {
        if(!apiDomain){
            return null;
        }
        const res = await fetch(`${apiDomain}/api/admin/galleries/videos/${id}`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            }});
        if(!res.ok){
            throw new Error("Fail To Fetch Data");
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}


export async function fetchGuidances() {
    const res = await fetch(`${apiDomain}/api/admin/guidances`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!res.ok) {
        throw new Error('Failed to fetch Guidances');
    }
    return await res.json();
}


