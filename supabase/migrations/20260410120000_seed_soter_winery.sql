-- Soter Vineyards (Mineral Springs Ranch) — partner hub slug `soter`
-- Idempotent: skip if slug already exists.

insert into public.wineries (
  name,
  slug,
  website,
  address,
  city,
  state,
  lat,
  lng,
  ava,
  phone,
  email,
  reservation_required,
  dogs_allowed,
  tasting_fee_min,
  tasting_fee_max,
  description,
  status
)
select
  'Soter Vineyards',
  'soter',
  'https://www.sotervineyards.com',
  '10880 NE Mineral Springs Rd',
  'Carlton',
  'OR',
  45.294,
  -123.178,
  'Yamhill-Carlton',
  '(503) 662-5600',
  'info@sotervineyards.com',
  true,
  null,
  null,
  null,
  'Soter Vineyards farms Mineral Springs Ranch, a biodynamic estate in the Yamhill-Carlton AVA. '
    || 'Pinot Noir, Chardonnay, sparkling, and other estate wines. Visits are by appointment—confirm on sotervineyards.com.',
  'active'
where not exists (select 1 from public.wineries w where w.slug = 'soter');

insert into public.winery_facts (winery_id, fact_type, fact_value, source_url, confidence)
select w.id,
  'varietal',
  '{"varieties":["Pinot Noir","Chardonnay","Pinot Blanc","Sparkling","Rosé"]}'::jsonb,
  'https://www.sotervineyards.com/',
  0.9
from public.wineries w
where w.slug = 'soter'
  and not exists (
    select 1 from public.winery_facts f where f.winery_id = w.id and f.fact_type = 'varietal'
  );

insert into public.winery_chunks (winery_id, chunk_text, chunk_type, source_url, fetched_at, confidence)
select w.id,
  'Tastings and visits at Soter Vineyards / Mineral Springs Ranch are typically by appointment. '
    || 'They offer estate tasting experiences and seasonal programs; hours and booking details change—'
    || 'always confirm on sotervineyards.com or call (503) 662-5600 before visiting.',
  'hours',
  'https://www.sotervineyards.com/visit',
  now(),
  0.85
from public.wineries w
where w.slug = 'soter'
  and not exists (
    select 1 from public.winery_chunks c where c.winery_id = w.id and c.chunk_type = 'hours'
  );
