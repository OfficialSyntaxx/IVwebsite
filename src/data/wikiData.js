


import { Sword, Shield, Zap, Hammer, Anchor, Flame, Scroll, Crown } from 'lucide-react';

export const WIKI_TABS = [
    { id: 'general', label: 'General Guide', icon: Scroll },
    { id: 'custom', label: 'Custom Content', icon: Crown },
    { id: 'gear', label: 'Gear Progression', icon: Shield },
    { id: 'skilling', label: 'Skilling Hotspots', icon: Hammer },
];

export const CUSTOM_CONTENT = [
    {
        title: "Member Zones",
        desc: "Exclusive areas for Premium, Respected, Legendary, and Uber members. Features boosted skilling rates and private boss instances.",
        rewards: ["XP Boosts", "Private Bosses", "Priority Banking"],
        difficulty: "Varies",
        color: "text-yellow-500",
        border: "border-yellow-500/30"
    },
    {
        title: "High-Tier Bossing",
        desc: "Challenge the most powerful foes including Vorkath, Zulrah, and the Alchemical Hydra. Complete logs for exclusive rewards.",
        rewards: ["Vorkath's Head", "Toxic Blowpipe", "Hydra's Claw"],
        difficulty: "Hard",
        color: "text-red-500",
        border: "border-red-500/30"
    },
    {
        title: "Wilderness Events",
        desc: "Compete for resources in the wilderness. Watch out for global events involving Skotizo and wilderness bosses.",
        rewards: ["PvP Weapons", "Loot Keys", "Emblems"],
        difficulty: "Extreme",
        color: "text-purple-500",
        border: "border-purple-500/30"
    }
];



export const GEAR_PROGRESSION = {
    MELEE: {
        icon: "https://oldschool.runescape.wiki/images/Attack_icon.png",
        color: 'text-red-500',
        tiers: [
            {
                name: "Early Game",
                desc: "Essential starting equipment for training slayer and low-level bosses.",
                items: [
                    { name: "Dragon Scimitar", source: "Shops / Monkey Madness" },
                    { name: "Fighter Torso", source: "Barbarian Assault" },
                    { name: "Dragon Defender", source: "Warriors' Guild" },
                    { name: "Berserker Ring", source: "Dagannoth Kings" },
                ]
            },
            {
                name: "Mid Game",
                desc: "Transitioning into raids and higher tier PvM.",
                items: [
                    { name: "Abyssal Whip", source: "Abyssal Demons" },
                    { name: "Bandos Chestplate", source: "General Graardor" },
                    { name: "Bandos Tassets", source: "General Graardor" },
                    { name: "Amulet of Torture", source: "Demonic Gorillas" },
                    { name: "Primordial Boots", source: "Cerberus" },
                ]
            },
            {
                name: "End Game",
                desc: "Best in slot gear for maximizing DPS.",
                items: [
                    { name: "Scythe of Vitur", source: "Theatre of Blood" },
                    { name: "Torva Full Helm", source: "Nex" },
                    { name: "Torva Platebody", source: "Nex" },
                    { name: "Torva Platelegs", source: "Nex" },
                    { name: "Infernal Cape", source: "The Inferno" },
                ]
            }
        ]
    },
    RANGED: {
        icon: "https://oldschool.runescape.wiki/images/Ranged_icon.png",
        color: 'text-green-500',
        tiers: [
            {
                name: "Early Game",
                desc: "Solid DPS for early slayer tasks.",
                items: [
                    { name: "Rune Crossbow", source: "Crazy Archaeologist" },
                    { name: "Black D'hide Set", source: "Crafting / Clues" },
                    { name: "Ava's Accumulator", source: "Animal Magnetism" },
                ]
            },
            {
                name: "Mid Game",
                desc: "Required for efficient bossing and early raids.",
                items: [
                    { name: "Toxic Blowpipe", source: "Zulrah" },
                    { name: "Armadyl Crossbow", source: "Commander Zilyana" },
                    { name: "Armadyl Armor Set", source: "Kree'arra" },
                    { name: "Necklace of Anguish", source: "Demonic Gorillas" },
                ]
            },
            {
                name: "End Game",
                desc: "Maximum ranged output.",
                items: [
                    { name: "Twisted Bow", source: "Chambers of Xeric" },
                    { name: "Masori Armor (f)", source: "Tombs of Amascut" },
                    { name: "Zaryte Vambraces", source: "Nex" },
                ]
            }
        ]
    },
    MAGIC: {
        icon: "https://oldschool.runescape.wiki/images/Magic_icon.png",
        color: 'text-blue-500',
        tiers: [
            {
                name: "Early Game",
                desc: "Basic magic gear for utility and safe spotting.",
                items: [
                    { name: "Iban's Staff", source: "Underground Pass" },
                    { name: "Mystic Robes", source: "Shops / Slayer" },
                    { name: "Tome of Fire", source: "Wintertodt" },
                ]
            },
            {
                name: "Mid Game",
                desc: "Significant damage boost for burst tasks.",
                items: [
                    { name: "Trident of the Swamp", source: "Zulrah" },
                    { name: "Ahrim's Robes", source: "Barrows" },
                    { name: "Occult Necklace", source: "Thermonuclear Smoke Devil" },
                    { name: "Tormented Bracelet", source: "Demonic Gorillas" },
                ]
            },
            {
                name: "End Game",
                desc: "Unmatched magical power.",
                items: [
                    { name: "Tumeken's Shadow", source: "Tombs of Amascut" },
                    { name: "Ancestral Robes", source: "Chambers of Xeric" },
                    { name: "Magus Ring", source: "Duke Sucellus" },
                ]
            }
        ]
    }
};

export const SKILLING_HOTSPOTS = [
    {
        skill: "Mining",
        icon: Hammer,
        color: "text-slate-400",
        locations: [
            { name: "Motherlode Mine", requirements: "30 Mining", desc: "Semi-AFK mining offering nuggets for prospector kit and coal bag." },
            { name: "Mining Guild", requirements: "60 Mining", desc: "Contains Iron, Coal, Mithril, Adamantite, and Runite rocks close to a bank." },
            { name: "Amethyst Mine", requirements: "92 Mining", desc: "Located in mining guild expansion, great for crafting ammunition." },
        ]
    },
    {
        skill: "Smithing",
        icon: Hammer,
        color: "text-slate-400",
        locations: [
            { name: "Blast Furnace", requirements: "60 Smithing", desc: "Fastest XP for smelting bars. Requires coal bag for efficiency." },
            { name: "Giants' Foundry", requirements: "15 Smithing", desc: "Interactive minigame that saves bars and gives great XP." },
        ]
    },
    {
        skill: "Firemaking",
        icon: Flame,
        color: "text-orange-500",
        locations: [
            { name: "Wintertodt", requirements: "50 Firemaking", desc: "Skilling boss that offers crates of rewards and high XP rates." },
            { name: "Rogue's Den", requirements: "50 Firemaking", desc: "Permanent fire suitable for cooking, close to a bank." },
        ]
    }
];
