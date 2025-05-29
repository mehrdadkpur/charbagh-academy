import { IPhoto, IUser } from "./types";


const apiDomain = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000' ;

export async function fetchInstruments() {
    
        const res = await fetch(`${apiDomain}/api/instruments`, {
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
    
    const res = await fetch(`${apiDomain}/api/blogs`, {
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
    
    const res = await fetch(`${apiDomain}/api/blogs/active`, {
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
    
    const res = await fetch(`${apiDomain}/api/blogs/pending`, {
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
      const response = await fetch("/api/students");
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
      const response = await fetch("/api/admins");
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
        const res = await fetch(`${apiDomain}/api/instruments/${id}`);
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
    
    const res = await fetch(`${apiDomain}/api/comments` , {
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
    const res = await fetch(`${apiDomain}/api/courses`, {
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
    const res = await fetch(`${apiDomain}/api/galleries`, {
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
    const res = await fetch(`${apiDomain}/api/teachers/${id}`, {
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
        const res = await fetch(`${apiDomain}/api/courses/${id}`);
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
        const res = await fetch(`${apiDomain}/api/students/${id}`);
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
        const res = await fetch(`${apiDomain}/api/admins/${id}`);
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
        const res = await fetch(`${apiDomain}/api/blogs/${id}`);
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
    const res = await fetch(`${apiDomain}/api/teachers`, {
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
        const res = await fetch(`${apiDomain}/api/instruments/${id}`, {
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
  
      const res = await fetch(`${apiDomain}/api/instruments/${instrumentId}/books/${bookId}`, {
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
    const res = await fetch('/api/galleries/photos', {
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

async function fetchVideos(){
    const res = await fetch(`${apiDomain}/api/gallery/videos`);
    if (!res.ok) {
      throw new Error('Failed to fetch Videos');
    }
    return res.json();
}
export async function fetchGuidances() {
    const res = await fetch(`${apiDomain}/api/guidances`, {
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

export { fetchBlog  , fetchVideos  };
