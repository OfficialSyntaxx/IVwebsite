


import { Sword, Shield, Zap, Hammer, Anchor, Flame, Scroll, Crown } from 'lucide-react';

export const WIKI_TABS = [
    { id: 'general', label: 'General Guide', icon: Scroll },
    { id: 'custom', label: 'Custom Content', icon: Crown },
    { id: 'gear', label: 'Gear Progression', icon: Shield },
    { id: 'skilling', label: 'Skilling Hotspots', icon: Hammer },
    { id: 'donator', label: 'Donator Benefits', icon: Crown },
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
            { name: "Blast Mine", requirements: "43 Mining / 100% Fav", desc: "High intensity mining minigame in Lovakengj offering ore and dynamite." },
        ]
    },
    {
        skill: "Smithing",
        icon: Hammer,
        color: "text-slate-400",
        locations: [
            { name: "Blast Furnace", requirements: "60 Smithing", desc: "Fastest XP for smelting bars. Requires coal bag for efficiency." },
            { name: "Giants' Foundry", requirements: "15 Smithing", desc: "Interactive minigame that saves bars and gives great XP." },
            { name: "Varrock Anvils", requirements: "15 Smithing", desc: "Conveniently located south of the West Bank." },
            { name: "Prifddinas Anvils", requirements: "70 Smithing", desc: "Closest anvil to a bank in the game (Trahaearn District)." },
        ]
    },
    {
        skill: "Firemaking",
        icon: Flame,
        color: "text-orange-500",
        locations: [
            { name: "Wintertodt", requirements: "50 Firemaking", desc: "Skilling boss that offers crates of rewards and high XP rates." },
            { name: "Rogue's Den", requirements: "50 Firemaking", desc: "Permanent fire suitable for cooking, close to a bank." },
            { name: "Prifddinas Bonfire", requirements: "70 Firemaking", desc: "Permanent bonfire in the city of elves." },
            { name: "Hosidius Range", requirements: "Cooking Level", desc: "Best cooking range with lower burn rates." },
        ]
    },
    {
        skill: "Woodcutting",
        icon: Hammer, // Using hammer as generic tool icon if axe isn't imported, or swap to Tree/Axe if available in Lucide imports
        color: "text-green-600",
        locations: [
            { name: "Woodcutting Guild", requirements: "60 Woodcutting", desc: "Contains yews, magic trees, and redwoods with +7 invisible boost." },
            { name: "Redwood Trees", requirements: "90 Woodcutting", desc: "Located in the WC Guild / Farming Guild, best AFK XP." },
            { name: "Sulliuscep Mushrooms", requirements: "65 Woodcutting", desc: "Fossil Island swamp, best XP for active cutting." },
            { name: "Prifddinas Teaks", requirements: "70 Woodcutting", desc: "Teaks located in the Prifddinas hardwood grove." },
        ]
    },
    {
        skill: "Fishing",
        icon: Anchor,
        color: "text-blue-500",
        locations: [
            { name: "Fishing Guild", requirements: "68 Fishing", desc: "Contains sharks, lobsters, and swordfish range with +7 invisible boost." },
            { name: "Sacred Eels", requirements: "87 Fishing", desc: "Zul-Andra fishing spot, scales for blowpipe." },
            { name: "Karambwans", requirements: "65 Fishing", desc: "Located in Karamja (Tai Bwo Wannai), fast XP and food." },
            { name: "Minnows", requirements: "82 Fishing", desc: "Fishing Platform activity, great for gathering sharks." },
        ]
    }
];

export const DONATOR_BENEFITS = [
    {
        tier: "Premium",
        price: "$25",
        icon: "/images/ranks/chat/emerald.png",
        color: "from-green-600 to-green-400",
        benefits: [
            "+1% Drop Rate Boost",
            "Access to Donator Island (::di)",
            "~8% Chance to Auto-Pickup/Note Items",
            "Cannon Capacity: 40 (Base: 30)",
            "5 Total Preset Slots",
            "GWD Killcount: 8 (Reduced by 2)",
            "+1 Pest Control Point"
        ]
    },
    {
        tier: "Expansion",
        price: "$50",
        icon: "/images/ranks/chat/sapphire.png",
        color: "from-yellow-500 to-yellow-300",
        benefits: [
            "+2% Drop Rate Boost",
            "Access to Expansion Island (::die)",
            "Set Home to Mage Bank / Ferox Enclave",
            "Permanent Compost on all patches",
            "10% Chance to Auto-Pickup/Note Items",
            "Cannon Capacity: 50",
            "10 Total Preset Slots",
            "GWD Killcount: 6",
            "+1 Pest Control Point"
        ]
    },
    {
        tier: "Extreme",
        price: "$200",
        icon: "/images/ranks/chat/ruby.png",
        color: "from-red-600 to-red-400",
        benefits: [
            "+4% Drop Rate Boost",
            "12.5% Chance to Auto-Pickup/Note Items",
            "Cannon Capacity: 60",
            "15 Total Preset Slots",
            "GWD Killcount: 4",
            "+3 Pest Control Points"
        ]
    },
    {
        tier: "Respected",
        price: "$400",
        icon: "/images/ranks/chat/diamond.png",
        color: "from-orange-600 to-orange-400",
        benefits: [
            "+6% Drop Rate Boost",
            "Access to Respected Island (::rdi)",
            "~16.6% Chance to Auto-Pickup/Note Items",
            "Cannon Capacity: 70",
            "20 Total Preset Slots",
            "GWD Killcount: 2",
            "+3 Pest Control Points"
        ]
    },
    {
        tier: "Legendary",
        price: "$1,000",
        icon: "/images/ranks/chat/dragonstone.png",
        color: "from-blue-600 to-blue-400",
        benefits: [
            "+8% Drop Rate Boost",
            "Access to Legendary Island (::ldi)",
            "Permanent Supercompost on all patches",
            "25% Chance to Auto-Pickup/Note Items",
            "Cannon Capacity: 90",
            "30 Total Preset Slots",
            "GWD Killcount: 2",
            "+4 Pest Control Points"
        ]
    },
    {
        tier: "Mythical",
        price: "$2,500",
        icon: "/images/ranks/chat/onyx.png",
        color: "from-purple-600 to-purple-400",
        benefits: [
            "+10% Drop Rate Boost",
            "50% Chance to Auto-Pickup/Note Items",
            "Cannon Capacity: 90",
            "40 Total Preset Slots",
            "GWD Killcount: 2",
            "+5 Pest Control Points"
        ]
    },
    {
        tier: "Uber",
        price: "$5,000",
        icon: "/images/ranks/chat/zenyte.png",
        color: "from-slate-200 to-slate-400",
        benefits: [
            "+12% Drop Rate Boost",
            "Access to Uber Island (::udi)",
            "Permanent Ultracompost on all patches",
            "100% Guaranteed Auto-Pickup/Note Items",
            "Cannon Capacity: 100",
            "50 Total Preset Slots",
            "Instant GWD Access (0 KC)",
            "+5 Pest Control Points"
        ]
    }
];
