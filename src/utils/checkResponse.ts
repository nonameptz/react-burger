export default function checkResponse (res:Response):Promise<object> {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}
