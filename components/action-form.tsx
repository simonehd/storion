'use client'
import { useActionState, type ReactNode } from 'react'
import type { FormState } from '@/lib/validation'
export function ActionForm({action,children,label='Save',className='form'}:{action:(state:FormState,form:FormData)=>Promise<FormState>;children:ReactNode;label?:string;className?:string}){
 const [state,submit,pending]=useActionState(action,{})
 return <form action={submit} className={className}>{children}{state.error&&<p role="alert" className="notice error">{state.error}</p>}{state.success&&<p role="status" className="notice success">{state.success}</p>}<button disabled={pending} className="button" type="submit">{pending?'Working…':label}</button></form>
}
