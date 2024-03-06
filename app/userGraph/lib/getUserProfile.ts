
import { cookies } from 'next/headers';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
}

export default async function getUserProfile() {

    const url = 'https://graph.microsoft.com/v1.0/me/';
    const user: User[] = []
    const accessTokenCookie = cookies().get('accessToken');
    const accessToken = accessTokenCookie?.value;
    
    console.log('url >>>> ', url);
    //console.log('accessToken cookie >>>> ', accessToken);
    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        ConsistencyLevel: 'eventual',
    
        Authorization: `Bearer ${accessToken}`,
        },
    });

    if (response.ok) {
        const data = await response.json();
        return {
            firstName: data.givenName,
            lastName: data.surname,
            email: data.mail,
            id: data.id
        }
    } else {
        return response.status;
        
    }
    
    
    
    
}