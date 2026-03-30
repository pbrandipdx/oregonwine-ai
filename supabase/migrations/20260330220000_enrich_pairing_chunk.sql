-- Richer pairing context for RAG (still operational disclaimers; not a menu guarantee).
update public.winery_chunks wc
set
  chunk_text =
    'Food and pairings at REX HILL center on Willamette Pinot Noir, Chardonnay, and méthode traditionnelle sparkling. Pinot Noir: bright acid and earthy red fruit often complement salmon, roast duck, wild mushrooms, charcuterie, and Oregon cheeses—either echo the wine''s earthiness or contrast with a richer dish. Chardonnay (especially with partial oak): roast chicken, Dungeness crab, scallops, and cream-based sauces. Sparkling: strong aperitif; classic pairings include fried appetizers, oysters, triple-cream cheese, and salty nuts. During your visit, ask the host about seasonal small bites, cheese boards, or curated pairing flights—offerings rotate; online menus may be out of date. Call (503) 538-0666 before you visit to confirm what food service is available that day.',
  fetched_at = now(),
  confidence = 0.88
from public.wineries w
where wc.winery_id = w.id
  and w.slug = 'rex-hill'
  and wc.chunk_type = 'pairing';
