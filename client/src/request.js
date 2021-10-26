export function request(method,endpoint,body) {
    return fetch(endpoint, {
        method: method,
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        cache: "no-cache",
        body: JSON.stringify(body)})
}