const {createClient}=require('@supabase/supabase-js');
const {Profile}=require('./models');
const supabase=process.env.SUPABASE_URL&&process.env.SUPABASE_SERVICE_ROLE_KEY?createClient(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY):null;
const roles={OWNER:['*'],OPERATIONS:['orders','menu','riders','settings'],KITCHEN:['orders'],ACCOUNTANT:['financials'],SUPPORT:['orders','customers']};
async function auth(req,res,next){const token=req.headers.authorization?.replace('Bearer ','');if(!token||!supabase)return res.status(401).json({error:'Authentication required'});const {data,error}=await supabase.auth.getUser(token);if(error||!data.user)return res.status(401).json({error:'Invalid session'});const profile=await Profile.findOne({supabaseId:data.user.id});req.user={id:data.user.id,email:data.user.email,role:profile?.role||'CUSTOMER'};next()}
function permit(scope){return(req,res,next)=>{const allowed=roles[req.user?.role]||[];return allowed.includes('*')||allowed.includes(scope)?next():res.status(403).json({error:'Insufficient permissions'})}}
module.exports={auth,permit,roles};
