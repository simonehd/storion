// Only explicitly selected application settings are sent to Vercel via stdin.
// Test credentials and local files are never uploaded by this script.
import {spawn} from 'node:child_process'
const selected=['NEXT_PUBLIC_SUPABASE_URL','NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY','GEMINI_API_KEY','GEMINI_MODEL']
for(const name of selected){if(!process.env[name])throw new Error(`Missing ${name}`)}
for(const name of [...selected,'DOCUMENT_STORAGE_READY','REGISTRATION_MODE']){
 const value=name==='DOCUMENT_STORAGE_READY'?'false':name==='REGISTRATION_MODE'?(process.env.REGISTRATION_MODE||'demo'):process.env[name]
 const secret=name==='GEMINI_API_KEY'
 const args=`npm exec --yes --package=vercel -- vercel env add ${name} --environment production --scope simone-s-team2 --yes ${secret?'--sensitive':'--no-sensitive'}`
 const result=await new Promise((resolve,reject)=>{const child=spawn(process.env.ComSpec||'cmd.exe',['/d','/s','/c',args],{stdio:['pipe','pipe','pipe'],windowsHide:true});let output='';child.stdout.on('data',chunk=>output+=chunk);child.stderr.on('data',chunk=>output+=chunk);child.on('error',reject);child.on('close',code=>resolve({code,output}));child.stdin.end(value)})
 if(result.code!==0){console.error(`Vercel environment setup failed for ${name}. Exit ${result.code}. Inspect configuration without printing values.`);process.exit(1)}
 console.log(`${name}: configured${secret?' as server secret':''}`)
}
