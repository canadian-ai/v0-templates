import {resolvePublicTemplatePreview} from "../src/public-template-preview.mjs";
const examples=new Set(["XQxxv76lK5w","QcwhuXpYQUm","3hZwaLtyRbc","Tpxvlz16QiJ"]);
export default async function handler(req,res){
  res.setHeader("X-Content-Type-Options","nosniff");
  res.setHeader("Cache-Control","public, s-maxage=300, stale-while-revalidate=600");
  if(req.method!=="GET")return res.status(405).json({error:"method_not_allowed"});
  const id=new URL(req.url,"https://example.invalid").searchParams.get("templateId");
  if(!examples.has(id))return res.status(400).json({error:"unknown_example"});
  try{
    const host=req.headers["x-forwarded-host"]||req.headers.host;
    const origin=typeof host==="string"&&/^[a-z0-9.-]+(?::\d+)?$/i.test(host)?"https://"+host:"https://example.com";
    return res.status(200).json(await resolvePublicTemplatePreview(id,{embeddingOrigin:origin,timeoutMs:4000}));
  }catch{return res.status(502).json({error:"check_failed"});}
}
