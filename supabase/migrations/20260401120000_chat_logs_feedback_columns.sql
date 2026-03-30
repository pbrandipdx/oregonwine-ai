-- Widget feedback + optional text (used by supabase/functions/feedback)
alter table public.chat_logs
  add column if not exists feedback_rating smallint;

alter table public.chat_logs
  add column if not exists feedback_text text;

comment on column public.chat_logs.feedback_rating is '1 = thumbs up, -1 = thumbs down';
comment on column public.chat_logs.feedback_text is 'Optional visitor comment with feedback';
