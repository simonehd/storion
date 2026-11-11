import { db } from '@/lib/supabase'
export async function GET(_request:Request,{params}:{params:Promise<{id:string}>}){
 const {id}=await params;const headers={'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}
 if(process.env.DOCUMENT_STORAGE_READY!=='true')return new Response('Document sharing is awaiting storage-policy verification',{status:503,headers})
 if(!/^[0-9a-f-]{36}$/i.test(id))return new Response('Not found',{status:404,headers})
 const client=await db();const {data:{user}}=await client.auth.getUser();if(!user)return new Response('Please sign in',{status:401,headers})
 const {data:doc}=await client.from('documents').select('storage_path').eq('id',id).maybeSingle();if(!doc)return new Response('Not found or access revoked',{status:404,headers})
 const {data,error}=await client.storage.from('project-documents').download(doc.storage_path);if(error||!data)return new Response('Document unavailable',{status:404,headers})
 return new Response(data,{headers:{...headers,'Content-Type':'application/pdf','Content-Disposition':`attachment; filename="storion-${id}.pdf"`,'Content-Security-Policy':"sandbox"}})
}
