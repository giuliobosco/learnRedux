export default function getApi() {
    return fetch('https://api.valentinog.com/api/link').then(response => {
        if (!response.ok) {
            throw Error(response.statusText)
        }

        return response.json();
    }).then(json => json);
}