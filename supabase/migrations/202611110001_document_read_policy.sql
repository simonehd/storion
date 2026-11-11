-- Correct the outer storage-object reference; preserve all tables, data and grants.
-- Apply once to the existing project after reviewing/approving this policy repair.
begin;
alter policy storion_document_read on storage.objects
using (
  bucket_id = 'project-documents'
  and exists (
    select 1 from public.documents d
    where d.storage_path = storage.objects.name
      and storion_private.can_read_document(d.id)
  )
);
commit;
