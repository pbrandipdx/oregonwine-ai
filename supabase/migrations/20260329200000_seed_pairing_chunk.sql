-- Pairing-oriented chunk so "food" / pairing questions retrieve context (FTS + embeddings).
insert into public.winery_chunks (winery_id, chunk_text, chunk_type, source_url, fetched_at, confidence)
select id,
  'Food and pairings: REX HILL pours estate Pinot Noir, Chardonnay, and sparkling wines. Pinot Noir often pairs well with salmon, duck, mushrooms, and local cheeses; Chardonnay with roast chicken or richer seafood. Ask your host during a tasting about seasonal small bites or pairing flights—offerings can change. Call (503) 538-0666 to confirm what is available on the day of your visit.',
  'pairing',
  'https://rexhill.com/experiences/',
  now(),
  0.85
from public.wineries where slug = 'rex-hill';
