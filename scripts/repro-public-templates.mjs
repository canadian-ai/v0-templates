import {resolvePublicTemplatePreview} from "../src/public-template-preview.mjs";
for(const id of ["XQxxv76lK5w","QcwhuXpYQUm","3hZwaLtyRbc","Tpxvlz16QiJ"]){
  const result=await resolvePublicTemplatePreview(id,{embeddingOrigin:"https://example.com"});
  console.log(id,result.status,result.reason||"public_deployment_available");
}