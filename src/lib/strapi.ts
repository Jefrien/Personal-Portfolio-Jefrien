import type { Image } from "../types";
import qs from 'qs';

interface Props {
    endpoint: string;
    query?: Record<string, string>;
    queryQs?: any;
    wrappedByKey?: string;
    wrappedByList?: boolean;
  }
  
  /**
   * Fetches data from the Strapi API
   * @param endpoint - The endpoint to fetch from
   * @param query - The query parameters to add to the url
   * @param wrappedByKey - The key to unwrap the response from
   * @param wrappedByList - If the response is a list, unwrap it
   * @returns
   */
  /**
   * Fetches data from the Strapi API
   * @param endpoint - The endpoint to fetch from
   * @param query - The query parameters to add to the url
   * @param wrappedByKey - The key to unwrap the response from
   * @param wrappedByList - If the response is a list, unwrap it
   * @returns The unwrapped data
   */
  export default async function fetchApi<T>({
    endpoint,
    query,
    wrappedByKey,
    wrappedByList,
  }: Props): Promise<T> {
    if (endpoint.startsWith('/')) {
      endpoint = endpoint.slice(1);
    }
  
    const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}`);
  

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${import.meta.env.STRAPI_TOKEN}`,
      },
    });
    let data = await res.json();
  
    if (wrappedByKey) {
      data = data[wrappedByKey];
    }
  
    if (wrappedByList) {
      data = data[0];
    }
  
    return data as T;
  }

  export async function fetchApiQs<T>({
    endpoint,
    queryQs,
    wrappedByKey,
    wrappedByList,
  }: Props): Promise<T> {
    if (endpoint.startsWith('/')) {
      endpoint = endpoint.slice(1);
    }
  
    const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}`);
  

    if (queryQs) {
      let _query = qs.stringify(queryQs);      
      url.search = _query;      
    }

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${import.meta.env.STRAPI_TOKEN}`,
      },
    });
    let data = await res.json();

    if (wrappedByKey) {
      data = data[wrappedByKey];
    }

    if (wrappedByList) {
      data = data[0];
    }

    return data as T;
  }

  export const getImageByName = async (name: string, size = 'original') => {
    // http://localhost:1337/api/upload/files?filters[name][$contains]=photo
    const data : any = await fetchApi({
      endpoint: 'upload/files',
      query: {
        'filters[name][$contains]': name,
      },
    });

    // if no data, return null
    if (!data || !data.length) {
      return null;
    }

    const image : Image = data[0] as Image;

    if(size === 'original') {
      return import.meta.env.STRAPI_URL + image.url;
    }

    if(size === 'thumbnail') {
      return import.meta.env.STRAPI_URL + image.formats.thumbnail.url;
    }

    if(size === 'small') {
      return import.meta.env.STRAPI_URL + image.formats.small.url;
    }

  }