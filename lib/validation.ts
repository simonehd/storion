export function field(form: FormData, name: string, max=200, required=false) {
  const value=form.get(name)
  const text=typeof value==='string'?(name==='password'?value:value.trim()):''
  if(required&&!text)throw new Error(`${name.replaceAll('_',' ')} is required.`)
  if(text.length>max)throw new Error(`${name.replaceAll('_',' ')} is too long (maximum ${max} characters).`)
  return text
}
export function choice(form:FormData,name:string,allowed:readonly string[]){const value=field(form,name,50,true);if(!allowed.includes(value))throw new Error(`Choose a valid ${name}.`);return value}
export function list(form:FormData,name:string){return [...new Set(field(form,name,1000).split(',').map(s=>s.trim()).filter(Boolean))].slice(0,20)}
export function uuid(value:string){if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value))throw new Error('Invalid record.');return value}
export type FormState={error?:string;success?:string}
