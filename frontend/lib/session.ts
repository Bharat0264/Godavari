export type AppUser={id:string;fullName:string;mobile:string;role:string;onboardingComplete:boolean};
const KEY='godavari-session';
export const api=()=>process.env.NEXT_PUBLIC_API_URL||'';
export function getSession():{token:string;user:AppUser}|null{try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch{return null}}
export function setSession(value:{token:string;user:AppUser}){localStorage.setItem(KEY,JSON.stringify(value));}
export function clearSession(){localStorage.removeItem(KEY);}
export function authHeaders():Record<string,string>{const session=getSession();return session?{Authorization:`Bearer ${session.token}`}:{}}
