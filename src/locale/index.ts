import fetchApi from '../lib/strapi';

export const getLocales = async (locale: string) => {
    const locales = await fetchApi<any[]>({
        endpoint: 'text-locales',
        wrappedByKey: 'data',
        query: {
            locale,
        },
    })
    
    return locales.map((locale) => {
        return {
            key: locale.attributes.lang_key,
            value: locale.attributes.lang_value,
        }
    })
}