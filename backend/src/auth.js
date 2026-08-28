const jwt=require('jsonwebtoken');
const {Profile}=require('./models');
const roles={OWNER:['*'],OPERATIONS:['orders','menu','settings','admins'],CUSTOMER:[]};
const secret=()=>process.env.JWT_SECRET;
function issue(profile){if(!secret())throw new Error('JWT_SECRET is not configured');return jwt.sign({sub:String(profile._id),role:profile.role},secret(),{expiresIn:'30d'});}
async function auth(req,res,next){try{const token=req.headers.authorization?.replace(/^Bearer\s+/i,'');if(!token)return res.status(401).json({error:'Please sign in to continue'});const payload=jwt.verify(token,secret());const profile=await Profile.findById(payload.sub);if(!profile)return res.status(401).json({error:'Account not found'});req.user={id:String(profile._id),role:profile.role,fullName:profile.fullName,mobile:profile.mobile};next();}catch{return res.status(401).json({error:'Your sign-in has expired. Please sign in again.'})}}
function permit(scope){return(req,res,next)=>{const allowed=roles[req.user?.role]||[];return allowed.includes('*')||allowed.includes(scope)?next():res.status(403).json({error:'Restaurant access is required'})}}
module.exports={auth,permit,issue};
