export const getLocaleText = (locales: any[], key: string) => {
    // if not found, return the key
    if(!locales) return key;
    return locales.find((locale) => locale.key === key)?.value;
};


export const getImageUrl = (url: string) => {
    return import.meta.env.STRAPI_URL + url;
}