# Crushpad.ai
## Wine Agent
## Blind Tasting
## Blind Tasting Game: Willamette Valley Edition

## Product Goal

Build a fun, replayable blind tasting game set in the Willamette Valley, Oregon.

The game should teach players how to identify wine style through sensory clues, region clues, and structure clues. It should feel like a polished wine-education game, not a trivia quiz.

The app name is **Crushpad.ai** and the mode is **Wine Agent**. The featured experience is **Blind Tasting: Willamette Valley Edition**.

## Core Experience

The player is presented with a mystery wine and must guess:
- The grape variety.
- The AVA or sub-AVA.
- The likely style profile.
- The likely tasting notes.

The game should be designed around Willamette Valley wines, especially Pinot Noir, but it can also include Chardonnay, Pinot Gris, and a few "decoy" styles to make the gameplay more interesting.

The player should get clues in rounds. Earlier guesses should score higher.

## Region Knowledge to Bake In

Use these as canonical Willamette Valley truths:
- The Willamette Valley is one of the coolest winegrowing regions in North America, with cool, wet winters and warm, dry summers.
- Warm days and cool nights create diurnal temperature swings that help grapes develop flavor while keeping acidity.
- Pinot noir is the signature grape of the region.
- Most vineyards are planted above 200 feet on volcanic, marine sedimentary, or wind-blown loess soils rather than the valley floor.
- Common soil types in the valley include Jory, Willakenzie, and Nekia.
- Dundee Hills is known for volcanic Jory soils and Pinot noir with pure fruit, bright acidity, and depth.
- Eola-Amity Hills is known for shallow volcanic and sedimentary soils plus cool marine wind influence, which often yields structured, savory, age-worthy wines.
- Ribbon Ridge is a nested AVA within Willamette Valley and is especially recognized for Pinot noir.

## Gameplay Pillars

- Educational.
- Replayable.
- Simple to understand.
- Hard to master.
- Region-first, not brand-first.
- Good for both casual players and wine enthusiasts.

## Recommended Game Modes

### 1. Daily Blind Tasting
A single mystery wine each day.

### 2. Free Play
Players can choose:
- Easy.
- Medium.
- Hard.
- Expert.

### 3. Region Challenge
Focus only on Willamette Valley AVAs.

### 4. Wine Education Mode
Players can read explanations after each guess.

## Core Loop

1. Show the mystery wine.
2. Present the first clue.
3. Let the player guess at any time.
4. Reveal another clue after each round.
5. Score the guess.
6. Show the answer and explanation.
7. Offer "try another wine."

## Scoring System

Base score starts at 100.

Deduct points for each clue used:
- After clue 1: 100 points.
- After clue 2: 85 points.
- After clue 3: 70 points.
- After clue 4: 55 points.
- After clue 5: 40 points.
- Final reveal: 20 points max.

Bonus points:
- Correct grape: +10.
- Correct AVA: +15.
- Correct style family: +10.
- Correct tasting note match: +5.

Optional penalty:
- Wrong region family guess: -10.
- Wrong grape with high confidence: -5.

## Clue System

Each wine should have 5 clue layers.

### Clue Layer 1: Sensory Snapshot
Give broad sensory language.
Examples:
- Ruby color, red cherry, cranberry, tea leaf, subtle spice.
- Pale gold, lemon zest, green apple, wet stone, saline finish.

### Clue Layer 2: Structure
Describe acidity, tannin, body, and oak.
Examples:
- Medium body.
- Bright acidity.
- Fine-grained tannins.
- Light-to-moderate oak.
- Elegant rather than powerful.

### Clue Layer 3: Regional Terroir
Give climate and soil hints.
Examples:
- Cool-climate growing region.
- Volcanic soil.
- Marine sediment influence.
- Afternoon winds.
- Long hang time.

### Clue Layer 4: AVA Hint
Narrow toward a sub-region.
Examples:
- Dundee Hills.
- Eola-Amity Hills.
- Ribbon Ridge.
- Yamhill-Carlton.
- McMinnville.

### Clue Layer 5: Final Tell
Give a signature detail that makes the answer solvable.
Examples:
- Jory soils.
- Volcanic red fruit profile.
- Wind-driven tannic structure.
- Savory herb and spice lift.
- Bright acidity with earthy undertones.

## Wine Pool

Use a curated set of wine archetypes rather than requiring real-world inventory.

### Primary Archetypes
- Willamette Valley Pinot Noir.
- Dundee Hills Pinot Noir.
- Eola-Amity Hills Pinot Noir.
- Ribbon Ridge Pinot Noir.
- Yamhill-Carlton Pinot Noir.
- Willamette Valley Chardonnay.
- Willamette Valley Pinot Gris.

### Secondary Decoys
- Oregon sparkling wine.
- Oregon Gamay.
- Oregon rosé.
- Cooler-climate Syrah.
- Light-bodied Cabernet Franc.

## Suggested Wine Profiles

### Willamette Valley Pinot Noir
- Red cherry.
- Raspberry.
- Cranberry.
- Forest floor.
- Baking spice.
- Medium body.
- Fresh acidity.
- Integrated tannins.

### Dundee Hills Pinot Noir
- Bright red fruit.
- Cherry.
- Raspberry.
- Earth.
- Truffle.
- Floral notes.
- Silky tannins.
- Volcanic/Jory soil character.

### Eola-Amity Hills Pinot Noir
- Black cherry.
- Blackberry.
- Red plum.
- Fresh herbs.
- Earth.
- Firm but polished tannins.
- Savory and structured profile.

### Ribbon Ridge Pinot Noir
- Dark cherry.
- Blackberry.
- Spice.
- Dense texture.
- Fine tannins.
- Good acidity.
- Compact, site-driven style.

### Yamhill-Carlton Pinot Noir
- Dark berry.
- Cola.
- Spice.
- Floral lift.
- Supple but structured.
- Earthy finish.
- Slightly broader texture.

### Willamette Valley Chardonnay
- Lemon.
- Green apple.
- Pear.
- Citrus blossom.
- Wet stone.
- Subtle oak.
- Medium body.
- High freshness.

### Willamette Valley Pinot Gris
- Pear.
- White peach.
- Apple.
- Honeysuckle.
- Citrus.
- Medium body.
- Soft texture.
- Crisp finish.

## Example Game Round

### Mystery Wine
A translucent ruby wine with red cherry, cranberry, dried rose, forest floor, and cinnamon.

### Clue 1
The wine is light to medium-bodied with bright acidity and silky tannins.

### Clue 2
The fruit leans red rather than black, and the finish has a savory earthy edge.

### Clue 3
The wine comes from a cool-climate region with volcanic and marine sediment influence.

### Clue 4
The most likely AVA is Dundee Hills.

### Clue 5
The soil profile points strongly toward Jory.

### Answer
Dundee Hills Pinot Noir.

### Why It Works
Dundee Hills is strongly associated with Jory soils and Pinot noir showing pure fruit, bright acidity, and depth.

## UI Screens

### Home Screen
- Start Game.
- Daily Challenge.
- Learn the Region.
- How to Play.

### Game Screen
- Mystery wine card.
- Clue panel.
- Guess input.
- Multiple-choice options.
- Reveal button.
- Score meter.

### Result Screen
- Correct answer.
- Tasting note explanation.
- AVA explanation.
- "Try another wine" button.
- Share score button.

### Education Screen
Show:
- What Pinot noir tastes like in the Willamette Valley.
- How climate affects acidity.
- How soil changes texture and aroma.
- What each major AVA is known for.

## UX Tone

The tone should feel:
- Premium.
- Friendly.
- Slightly playful.
- Educational but not academic.
- Wine-nerd smart without being snobby.

## Visual Direction

Use:
- Deep burgundy.
- Cream.
- Forest green.
- Slate gray.
- Soft gold accents.

Style:
- Minimal.
- Elegant.
- Wine-label inspired.
- Modern editorial.

## Fonts

Use a refined serif for headings and a clean sans-serif for body text.

Suggested pairing:
- Headings: elegant serif.
- Body: neutral sans-serif.

## Sound and Feedback

If audio is included:
- Soft pour sound.
- Gentle cork pop.
- Low chime for correct guess.
- Subtle glass ping for reveal.

## Suggested Data Schema

```json
{
  "id": "dundee-hills-pinot-001",
  "name": "Mystery Wine 001",
  "region": "Willamette Valley",
  "subRegion": "Dundee Hills",
  "grape": "Pinot Noir",
  "body": "medium",
  "acidity": "bright",
  "tannin": "silky",
  "oak": "light to moderate",
  "aromas": ["red cherry", "raspberry", "rose", "forest floor", "cinnamon"],
  "clues": [
    "Ruby in color with red fruit and floral notes.",
    "Light to medium body with fresh acidity and fine tannins.",
    "Cool-climate Oregon wine with volcanic soil influence.",
    "Most likely from Dundee Hills.",
    "Strong Jory soil signature."
  ],
  "answer": {
    "grape": "Pinot Noir",
    "region": "Willamette Valley",
    "subRegion": "Dundee Hills"
  }
}
```
