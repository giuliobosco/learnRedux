export function linksGetApi() {
    return fetch('https://giuliobosco.github.io/mock/link.json').then(response => {
        if (!response.ok) {
            throw Error(response.statusText)
        }

        return response.json();
    }).then(json => json);
}
