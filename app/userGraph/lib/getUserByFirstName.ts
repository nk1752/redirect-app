import { cookies } from 'next/headers';
import { graphConfig } from '@/authN/authConfig';

export default async function getUserByFirstName(input:string) {

    const query = `"givenName:${input}"`;
    const url =
      'https://graph.microsoft.com/v1.0/users?$count=true&$search=' +
      `${query}`;
    
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
        console.log(await response.json());
    } else {
        console.log('error >>>> ', response.status);
    }
    
}