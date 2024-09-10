import axios from 'axios';

interface UserInfo {
    name: string;
    email: string;
    password: string;
}
export async function createUser(user: UserInfo) {
    try {
        const res = await axios.post('http://localhost:3001', user);
        console.log("User created successfully", res.data);
        return res;
    } catch (e: any) {
        if (e.response && e.response.status === 404) {
            alert(`Error: ${e.response.data}`);
        } else {
            console.error('Error creating user:', e);
            alert('An unexpected error occurred. Please try again.');
        }
        throw e;
    }
}

export async function loginUser(userEmail: string) {
    try {
        const res = await axios.post('http://localhost:3001/login', { email: userEmail });
        return res;
    } catch (e) {
        console.error('Error fetching user:', e);
        throw e;
    }
} 
