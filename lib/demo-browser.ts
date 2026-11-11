'use client'
import { useMemo, useSyncExternalStore } from 'react'

// Demo state is browser-local and never touches real marketplace tables.
const event = 'storion-demo-state'
const serverSnapshot = () => '[]'
function subscribe(callback:()=>void) { window.addEventListener('storage',callback); window.addEventListener(event,callback); return ()=>{window.removeEventListener('storage',callback);window.removeEventListener(event,callback)} }
function read(key:string) { try { return localStorage.getItem(key)||'[]' } catch { return '[]' } }
function write(key:string,value:unknown) { try { localStorage.setItem(key,JSON.stringify(value));window.dispatchEvent(new Event(event));return true } catch { return false } }
function parse(value:string):unknown[] { try {const data:unknown=JSON.parse(value);return Array.isArray(data)?data:[]} catch{return []} }
export function useDemoSaved() {const value=useSyncExternalStore(subscribe,()=>read('storion-demo-favourites'),serverSnapshot);return useMemo(()=>parse(value).filter((v):v is string=>typeof v==='string'),[value])}
export function toggleDemoSaved(id:string) {const saved=parse(read('storion-demo-favourites')).filter((v):v is string=>typeof v==='string');return write('storion-demo-favourites',saved.includes(id)?saved.filter(v=>v!==id):[...saved,id])}
export type DemoInterest = {id:string;storyId:string;status:'Received';createdAt:string}
export function useDemoInterests() {const value=useSyncExternalStore(subscribe,()=>read('storion-demo-interests'),serverSnapshot);return useMemo(()=>parse(value).filter((v):v is DemoInterest=>!!v&&typeof v==='object'&&'id' in v&&typeof v.id==='string'&&'storyId' in v&&typeof v.storyId==='string'&&'createdAt' in v&&typeof v.createdAt==='string'&&'status' in v&&v.status==='Received'),[value])}
export function saveDemoInterest(storyId:string) {const existing=parse(read('storion-demo-interests'));const entry:DemoInterest={id:crypto.randomUUID(),storyId,status:'Received',createdAt:new Date().toISOString()};return write('storion-demo-interests',[entry,...existing].slice(0,20))}
