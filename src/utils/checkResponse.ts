import {IIngredient} from "../types/store";

export default function checkResponse (res:Response):Promise<
  {order: {number:number}, data:Array<IIngredient>, refreshToken:string, accessToken:string, error:boolean }
> {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}
