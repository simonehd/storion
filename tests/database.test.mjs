import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { PGlite } from '@electric-sql/pglite'

test('foundation migration enforces ownership, private listings and interest status access', async () => {
  const db = new PGlite()
  try {
    await db.exec(`
      create role anon; create role authenticated;
      create schema auth;
      create table auth.users(id uuid primary key);
      create function auth.uid() returns uuid language sql stable as
      $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
      grant usage on schema auth to anon, authenticated;
      grant execute on function auth.uid() to anon, authenticated;
      create schema storage;
      create table storage.buckets(id text primary key, name text, public boolean, file_size_limit bigint, allowed_mime_types text[]);
      create table storage.objects(id uuid primary key default gen_random_uuid(), bucket_id text, name text);
      alter table storage.objects enable row level security;
      grant usage on schema storage to authenticated;
      grant select, insert, delete on storage.objects to authenticated;
      create function storage.foldername(name text) returns text[] language sql immutable as $$ select string_to_array(name, '/') $$;
    `)
    await db.exec(await readFile(new URL('../supabase/migrations/202611100001_foundation.sql', import.meta.url), 'utf8'))
    await db.exec(await readFile(new URL('../supabase/migrations/202611110001_document_read_policy.sql', import.meta.url), 'utf8'))
    const owner = '00000000-0000-0000-0000-000000000001'
    const visitor = '00000000-0000-0000-0000-000000000002'
    const publicProject = '10000000-0000-0000-0000-000000000001'
    const privateProject = '10000000-0000-0000-0000-000000000002'
    await db.exec(`insert into auth.users values('${owner}'),('${visitor}');
      insert into public.profiles(id,display_name,role) values('${owner}','Creator','creator'),('${visitor}','Partner','industry');
      insert into public.projects(id,owner_id,title,synopsis,format,stage,visibility,ownership_declared) values
      ('${publicProject}','${owner}','Public story','Synopsis','film','idea','public',true),
      ('${privateProject}','${owner}','Private story','Synopsis','book','completed','private',false);`)
    async function asUser(id, sql) {
      await db.exec('begin; set local role authenticated;')
      try {
        await db.query("select set_config('request.jwt.claim.sub', $1, true)", [id])
        const result = await db.query(sql)
        await db.exec('commit')
        return result
      } catch (error) { await db.exec('rollback'); throw error }
    }
    assert.equal((await asUser(visitor, 'select * from public.projects')).rows.length, 1)
    await assert.rejects(asUser(visitor, 'truncate public.projects cascade'))
    assert.equal((await asUser(owner, 'select * from public.projects')).rows.length, 2)
    await asUser(visitor, `update public.projects set title='Hijacked' where id='${publicProject}'`)
    assert.equal((await db.query(`select title from public.projects where id='${publicProject}'`)).rows[0].title, 'Public story')
    await assert.rejects(asUser(visitor, `insert into public.interests(sender_id,project_id,message,categories) values('${visitor}','${privateProject}','Hello',array['Producing'])`))
    const interest = (await asUser(visitor, `insert into public.interests(sender_id,project_id,message,categories) values('${visitor}','${publicProject}','Hello',array['Producing']) returning id`)).rows[0].id
    await assert.rejects(asUser(visitor, `insert into public.interests(sender_id,project_id,message,categories) values('${visitor}','${publicProject}','Duplicate',array['Producing'])`))
    await assert.rejects(asUser(owner, `insert into public.interests(sender_id,project_id,message,categories) values('${owner}','${publicProject}','Self interest',array['Producing'])`))
    await assert.rejects(asUser(owner, `update public.projects set visibility='public' where id='${privateProject}'`))
    await assert.rejects(asUser(visitor, `select public.set_interest_status('${interest}','Viewed')`))
    await asUser(owner, `select public.set_interest_status('${interest}','Viewed')`)
    assert.equal((await asUser(visitor, `select status from public.interests where id='${interest}'`)).rows[0].status, 'Viewed')
    assert.equal((await asUser(visitor, 'select * from public.activity')).rows.length, 2)
    await assert.rejects(asUser(visitor, `update public.interests set status='Received' where id='${interest}'`))
    const document = (await asUser(owner, `insert into public.documents(project_id,name,storage_path) values('${publicProject}','Script','${owner}/${publicProject}/script.pdf') returning id`)).rows[0].id
    await asUser(owner, `insert into storage.objects(bucket_id,name) values('project-documents','${owner}/${publicProject}/script.pdf')`)
    assert.equal((await asUser(owner, 'select * from storage.objects')).rows.length, 1)
    assert.equal((await asUser(visitor, 'select * from storage.objects')).rows.length, 0)
    await assert.rejects(asUser(visitor, `insert into storage.objects(bucket_id,name) values('project-documents','${visitor}/${publicProject}/intruder.pdf')`))
    // A document whose display name equals its path must not authorize other objects.
    const visitorProject='10000000-0000-0000-0000-000000000003'
    await asUser(visitor, `insert into public.projects(id,owner_id,title,synopsis,format,stage) values('${visitorProject}','${visitor}','Visitor draft','Draft','film','idea')`)
    await asUser(visitor, `insert into public.documents(project_id,name,storage_path) values('${visitorProject}','${visitor}/${visitorProject}/crafted.pdf','${visitor}/${visitorProject}/crafted.pdf')`)
    assert.equal((await asUser(visitor, 'select * from storage.objects')).rows.length, 0)
    assert.equal((await asUser(visitor, `select * from public.documents where project_id='${publicProject}'`)).rows.length, 0)
    await asUser(owner, `insert into public.document_permissions values('${document}','${visitor}')`)
    assert.equal((await asUser(visitor, `select * from public.documents where project_id='${publicProject}'`)).rows.length, 1)
    assert.equal((await asUser(visitor, 'select * from storage.objects')).rows.length, 1)
    await asUser(owner, `delete from public.document_permissions where document_id='${document}'`)
    assert.equal((await asUser(visitor, `select * from public.documents where project_id='${publicProject}'`)).rows.length, 0)
    assert.equal((await asUser(visitor, 'select * from storage.objects')).rows.length, 0)
    await assert.rejects(db.exec(await readFile(new URL('../supabase/migrations/202611100001_foundation.sql', import.meta.url), 'utf8')))
    await db.exec('rollback')
    assert.equal((await db.query('select count(*)::int as count from public.projects')).rows[0].count, 3)
  } finally { await db.close() }
})
