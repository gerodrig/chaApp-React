import { IFetchAuthResponse, UserData } from "../types/interfaces";

const baseURL = process.env.REACT_APP_API_URL;


export const fetchNoToken= async (endpoint: string, data: UserData, method = 'GET'): Promise<IFetchAuthResponse>  =>  {

    const url = `${baseURL}/${endpoint}`;

    if( method === 'GET' ) {
        const resp = await fetch(url);
        return await resp.json();
    }

    const resp = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return await resp.json();
}

export const fetchWithToken= async (endpoint: string, method = 'GET'): Promise<IFetchAuthResponse>  =>  {

    const url = `${baseURL}/${endpoint}`;

    const token = localStorage.getItem('token') || '';

    if( method === 'GET' ) {
        const resp = await fetch(url, {
            headers: {
                'x-token': token
            }
        });
        return await resp.json();
    }

    const resp = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        },
    });

    return await resp.json();
}