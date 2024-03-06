import { cookies } from 'next/headers';
import { graphConfig } from '@/authN/authConfig';

export default async function getUserByLastName(input:string) {

    const url = 'https://graph.microsoft.com/v1.0/users/' + input;
    
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
        return await response.json();
    } else {
        return 
        { statusCode: response.status};
    }
    
}