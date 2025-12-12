
import { Zap, Trophy, Newspaper, Sword, Shield, Map as MapIcon } from 'lucide-react';

export const BLOG_POSTS = [
    {
        slug: 'raids-4-announcement',
        title: "Dev Blog: Raids 4 - The Void's Edge",
        date: "December 10, 2025",
        author: "Cranked",
        tag: "Development",
        icon: Sword,
        summary: "A first look at our most ambitious raid yet. Explore the depths of the Void and face ancient horrors.",
        content: `
# The Void's Edge

We are thrilled to announce the development of our fourth raid: **The Void's Edge**. This raid will push your team coordination to the limit.

## What to Expect
- **5 New Bosses**: Each with unique mechanics that require precise prayer flicking and positioning.
- **New Rewards**: Including the T95 Void waker and the shadowy "Obsidian" armor set.
- **Dynamic Difficulty**: The raid scales based on your team size and average combat level.

## The Lore
Long before the God Wars, the Void Knights discovered a tear in reality. They built an outpost to monitor it, but silence has fallen. You are being sent in to investigate.

## Release Date
We are targeting a **Q1 2026** release. Stay tuned for more sneak peeks on our Discord!
        `
    },
    {
        slug: 'patch-notes-2-0',
        title: "Patch Notes v2.0: The Economy Update",
        date: "December 5, 2025",
        author: "Syntaxx",
        tag: "Update",
        icon: Zap,
        summary: "Major overhaul to the Grand Exchange, drop tables, and a specialized gold sink for high-level players.",
        content: `
# Economy Overhaul

This update focuses on long-term economic health. We've introduced several tax brackets for the Grand Exchange and rebalanced drop tables for Zulrah and Vorkath.

## Key Changes
- **Grand Exchange Tax**: Now set at 1% for all transactions over 1M GP.
- **Item Sinks**: You can now sacrifice duplicate uniques to the "Well of Goodwill" for cosmetic perks (like 1-hour double pet chance).
- **Vote Shop**: Added new recolors for the Twisted Bow.

## Bug Fixes
- Fixed an issue where the Slayer Helmet (i) was not applying the 15% damage boost on tasks.
- Fixed a pathing glich at the Mage Bank.
        `
    },
    {
        slug: 'clan-cup-finals',
        title: "Clan Cup: Finals Recap",
        date: "November 28, 2025",
        author: "Mod Ash",
        tag: "Event",
        icon: Trophy,
        summary: "Congratulations to 'Solo Mission' for taking the crown in this year's 5v5 Tournament!",
        content: `
# Clan Cup Champions

What a tournament! After 3 weekends of intense PvP action, **Solo Mission** has defeated **RoT** in the grand finals.

## The Highlights
- **MVP**: _DitterBitter_ for an insane 1v3 clutch in the semi-finals.
- **Prize Pool**: The winning team split a massive 10B GP prize pool and received the exclusive "Golden Scimitar" cosmetic override.

## Next Season
Sign-ups for the Winter Season begin next week. Get your squad ready!
        `
    }
];
