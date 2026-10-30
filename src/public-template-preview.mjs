// Independent Canadian AI example, not a supported v0 templates API.
const allowed=/^[A-Za-z0-9_-]{5,80}$/;
const decode=(s)=>String(s).replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'");
export function safeDeploymentUrl(raw){
  if(typeof raw!=="string"||!raw)return null;
  try{const u=new URL(decode(raw),"https://v0.app");
    if(u.protocol!=="https:"||u.username||u.password||u.port||u.hostname==="vercel.app"||!u.hostname.endsWith(".vercel.app"))return null;
    return u.href;}catch{return null;}
}
export function deploymentFromPublicHtml(html){
  for(const m of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)){
    const label=decode(m[2].replace(/<[^>]+>/g," ")).replace(/\s+/g," ").trim().toLowerCase();
    if(label!=="open original"&&label!=="template deployment preview")continue;
    const found=safeDeploymentUrl(m[1].match(/\bhref\s*=\s*(["'])(.*?)\1/i)?.[2]);if(found)return found;
  }
  for(const m of html.matchAll(/<iframe\b([^>]*)>/gi)){
    const found=safeDeploymentUrl(m[1].match(/\bsrc\s*=\s*(["'])(.*?)\1/i)?.[2]);if(found)return found;
  }
  return null;
}
export function permitsEmbedding(headers,origin){
  if(/\b(deny|sameorigin)\b/i.test(headers.get("x-frame-options")||""))return false;
  const csp=headers.get("content-security-policy")||"";
  for(const m of csp.matchAll(/(?:^|;)\s*frame-ancestors\s+([^;]*)/gi)){
    if(!m[1].trim().split(/\s+/).some(s=>s==="*"||(s==="https:"&&origin.startsWith("https:"))||s===origin))return false;
  }
  return true;
}
async function get(url,fetcher,timeoutMs){return fetcher(url,{headers:{Accept:"text/html"},redirect:"manual",cache:"no-store",signal:AbortSignal.timeout(timeoutMs)});}
export async function resolvePublicTemplatePreview(id,{fetcher=fetch,embeddingOrigin="https://example.com",timeoutMs=5000,screenshotUrl=null}={}){
  if(!allowed.test(id))throw new TypeError("Invalid template ID");
  const pageUrl="https://v0.app/templates/"+encodeURIComponent(id);
  const fallback=reason=>({status:screenshotUrl?"screenshot":"unavailable",templateId:id,templateUrl:pageUrl,previewUrl:null,screenshotUrl,reason});
  let page;try{page=await get(pageUrl,fetcher,timeoutMs);}catch{return fallback("template_page_request_failed");}
  if(!page.ok||!(page.headers.get("content-type")||"").includes("text/html"))return fallback("template_page_unavailable");
  let html;try{html=await page.text();}catch{return fallback("template_page_request_failed");}
  const deployment=deploymentFromPublicHtml(html);
  if(!deployment)return fallback("no_public_deployment_or_supported_template_preview_api");
  let response;try{response=await get(deployment,fetcher,timeoutMs);}catch{return fallback("deployment_request_failed");}
  const ok=response.ok&&(response.headers.get("content-type")||"").includes("text/html");
  const embeddable=permitsEmbedding(response.headers,new URL(embeddingOrigin).origin);
  await response.body?.cancel();
  if(!ok)return fallback("deployment_unavailable");
  if(!embeddable)return fallback("deployment_not_embeddable");
  return {status:"ready",templateId:id,templateUrl:pageUrl,previewUrl:deployment,screenshotUrl,reason:null};
}
