import * as React from 'react';
import { setLocalStorage } from '../../../setLocalStorage';

export async function getTime(continent_name: string, city: string, update: (any) => any): Promise<any> {

    const api_time = await fetch(`http://worldtimeapi.org/api/timezone/${continent_name}/${city}`);
    const data_time = await api_time.json();

    update({
        timeData: data_time
    });

    setLocalStorage(data_time, 'timeData');
}