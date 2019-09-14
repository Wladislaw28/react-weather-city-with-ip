import * as React from 'react';
import { API_KEY_IP } from '../../constants/constants';
import { setLocalStorage } from '../../setLocalStorage';

export async function getIpUsers(update: (any) => any): Promise<any> {

    const api_ip = await fetch(`http://api.ipstack.com/check?access_key=${API_KEY_IP}`);
    const data_ip = await api_ip.json();

    update({
        ipDate: data_ip
    });
    
    setLocalStorage(data_ip, 'ipData');
}