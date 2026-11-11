'use server'
import { revalidatePath } from 'next/cache'
import { db } from './supabase'
import { field,uuid,type FormState } from './validation'
export async function uploadDocument(projectId:string,_state:FormState,form:FormData):Promise<FormState>{
 if(process.env.DOCUMENT_STORAGE_READY!=='true')return {error:'Document sharing is awaiting a storage-policy repair and verification. Uploads are temporarily disabled.'}
 try{
  uuid(projectId);const client=await db();const {data:{user}}=await client.auth.getUser();if(!user)return {error:'Please sign in.'}
  const {data:project}=await client.from('projects').select('id').eq('id',projectId).eq('owner_id',user.id).maybeSingle();if(!project)return {error:'Only the project owner can upload documents.'}
  const file=form.get('file');if(!(file instanceof File)||!file.size||file.size>10485760||file.type!=='application/pdf')return {error:'Choose a PDF up to 10 MB.'}
  const bytes=new Uint8Array(await file.arrayBuffer());if(new TextDecoder().decode(bytes.slice(0,5))!=='%PDF-')return {error:'This file is not a valid PDF.'}
  const name=field(form,'name',200,true),path=`${user.id}/${projectId}/${crypto.randomUUID()}.pdf`
  // Metadata is created first so owner SELECT/DELETE storage policies can clean up a failed upload.
  const {data:document,error:metadataError}=await client.from('documents').insert({project_id:projectId,name,storage_path:path}).select('id').single();if(metadataError||!document)return {error:'Could not register the document.'}
  const {error}=await client.storage.from('project-documents').upload(path,bytes,{contentType:'application/pdf',upsert:false})
  if(error){await client.storage.from('project-documents').remove([path]);await client.from('documents').delete().eq('id',document.id);return {error:'Upload failed. Check that private document storage is available, then try again.'}}
  revalidatePath(`/projects/${projectId}/documents`);return {success:'Private document uploaded. Grant access below to share it.'}
 }catch{return {error:'The document could not be uploaded. Please try again.'}}
}
export async function documentPermission(documentId:string,_state:FormState,form:FormData):Promise<FormState>{
 if(process.env.DOCUMENT_STORAGE_READY!=='true')return {error:'Document sharing is awaiting storage-policy verification.'}
 try{uuid(documentId);const userId=uuid(field(form,'user_id',36,true));const client=await db();const {data:{user}}=await client.auth.getUser();if(!user)return {error:'Please sign in.'};const {data:doc}=await client.from('documents').select('project_id').eq('id',documentId).maybeSingle();if(!doc)return {error:'Document unavailable.'};const {data:project}=await client.from('projects').select('id').eq('id',doc.project_id).eq('owner_id',user.id).maybeSingle();if(!project)return {error:'Only the document owner can change access.'};const revoke=form.get('revoke')==='true';const {error}=await(revoke?client.from('document_permissions').delete().eq('document_id',documentId).eq('user_id',userId):client.from('document_permissions').insert({document_id:documentId,user_id:userId}));if(error&&error.code!=='23505')return {error:'Permission could not be updated.'};revalidatePath(`/projects/${doc.project_id}/documents`);return {success:revoke?'Access revoked. Previously downloaded copies cannot be recalled.':'Access granted. The recipient can open Documents in their dashboard.'}}catch{return {error:'Invalid permission request.'}}
}
