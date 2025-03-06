export interface StrapiFormData {
    token?: string;
    formName?: string;
    formData?: any;
}

export default function submitForm({ token, formName, formData }: StrapiFormData) {
    return fetch(import.meta.env.STRAPI_URL + '/api/ezforms/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
}