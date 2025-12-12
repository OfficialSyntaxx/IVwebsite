
export const MOCK_WORLD_STATE = {
    meta: {
        serverName: "IronVeil",
        status: "ONLINE",
        uptime: "4d 12h 30m",
        playersOnline: 432,
        wildyActivityLevel: "HIGH"
    },
    events: [
        { id: 1, name: "Wilderness Flash Event", status: "ALIVE", hpPercent: 100, location: "Dark Warriors' Fortress", attackers: 24, active: true },
        { id: 2, name: "Shooting Star", status: "ALIVE", hpPercent: 45, location: "Catherby", attackers: 8, active: true },
        { id: 3, name: "Xamphur", status: "DEAD", respawnTimer: "24:00", location: "Kourend", attackers: 0, nextSpawnMs: 1440000, active: false },
        { id: 4, name: "Charity Well", status: "ACTIVE", location: "Edgeville", active: true, statusText: "ACTIVE" },
        { id: 5, name: "Chambers of Xeric", status: "ALIVE", location: "Mt. Quidamortem", active: true },
        { id: 6, name: "Vote Bonus", status: "ACTIVE", location: "Global", active: true, statusText: "ACTIVE" }
    ],
    hotspots: [
        { id: 1, region: "Revenant Caves", intensity: "EXTREME", x: 69.26, y: 24.37, desc: "Multi-combat active" },
        { id: 2, region: "Mage Bank", intensity: "MODERATE", x: 70.04, y: 11.42, desc: "Team pking detected" },
        { id: 3, region: "Lava Maze", intensity: "LOW", x: 69.74, y: 17.16, desc: "Sporadic activity" },
        { id: 4, region: "Zul-Andra", intensity: "HIGH", x: 39.67, y: 65.55, desc: "Bot farm patrol" },
        { id: 5, region: "Chambers of Xeric", intensity: "HIGH", x: 6.74, y: 35.39, desc: "Raiding parties" },
        { id: 6, region: "Theatre of Blood", intensity: "MODERATE", x: 89.64, y: 55.72, desc: "Lobby active" },
        { id: 7, region: "Grand Exchange", intensity: "EXTREME", x: 72.58, y: 39.50, desc: "High volume trading" },
        { id: 8, region: "Ferox Enclave", intensity: "MODERATE", x: 71.80, y: 30.94, desc: "Safe zone pking" },
        { id: 9, region: "Lumbridge", intensity: "LOW", x: 74.53, y: 55.72, desc: "New player area" }
    ]
};

export const STORE_ITEMS = {
    cosmetics: [
        { id: 1, name: "Infernal Cape Override", price: 2500, img: "https://oldschool.runescape.wiki/images/Infernal_cape.png", desc: "Cosmetic override for any cape slot item. Shows off your dominance without the stats." },
        { id: 2, name: "Blood Torva Set", price: 5000, img: "https://oldschool.runescape.wiki/images/Torva_platebody_%28damaged%29.png", desc: "The ultimate melee cosmetic. Includes Helm, Body, and Legs overrides." },
        { id: 3, name: "Twisted Bow (Red)", price: 4000, img: "https://oldschool.runescape.wiki/images/Twisted_bow.png", desc: "A ruby-red recolor of the legendary Twisted Bow." },
        { id: 10, name: "3rd Age Platebody", price: 3500, img: "https://oldschool.runescape.wiki/images/3rd_age_platebody.png", desc: "Classic wealth display. Cosmetic override." },
        { id: 11, name: "Gilded Scimitar", price: 1000, img: "https://oldschool.runescape.wiki/images/Gilded_scimitar.png", desc: "Golden blade for the wealthy warrior." }
    ],
    pets: [
        { id: 4, name: "Pet Kree'arra", price: 1500, img: "https://oldschool.runescape.wiki/w/Special:FilePath/Kree%27arra_Jr..png", desc: "The Aviansie general, shrunk down to size. Does not flap aggressively." },
        { id: 5, name: "Pet General Graardor", price: 1500, img: "https://oldschool.runescape.wiki/w/Special:FilePath/General_Graardor_Jr..png", desc: "A tiny Bandosian general to follow you into battle." },
        { id: 6, name: "Vorki", price: 2000, img: "https://oldschool.runescape.wiki/w/Special:FilePath/Vorki.png", desc: "The undead dragon spawn. Ideally kept away from heat." }
    ],
    services: [
        { id: 7, name: "Name Change Bond", price: 500, img: "https://oldschool.runescape.wiki/images/Old_school_bond.png", desc: "Allows one free username change. redeemable in-game." },
        { id: 8, name: "Clan Creation Ticket", price: 1000, img: "https://oldschool.runescape.wiki/w/Special:FilePath/Clan_vexillum_%28black%29.png", desc: "Create a permanent clan chat with custom ranks and vexillum." },
        { id: 9, name: "Bank Space (+50)", price: 250, img: "https://oldschool.runescape.wiki/images/Bank_key.png", desc: "Expands your bank by 50 slots. Max 5 uses per account." },
        { id: 12, name: "Item Recolor Ticket", price: 750, img: "https://oldschool.runescape.wiki/images/Looting_bag_note.png", desc: "Unlock a custom recolor for one supported item. MUST be redeemed by trading an Admin+ in-game." }
    ]
};

export const VOTE_SITES = [
    { id: 1, name: "Runelocus", reward: "Vote Box + 5M GP", url: "#", color: "from-red-900 to-red-600" },
    { id: 2, name: "Rune-Server", reward: "Vote Box + 5M GP", url: "#", color: "from-blue-900 to-blue-600" },
    { id: 3, name: "TopG", reward: "Vote Box + 25 Points", url: "#", color: "from-orange-900 to-orange-600" },
    { id: 4, name: "RSPS List", reward: "Vote Box + 25 Points", url: "#", color: "from-green-900 to-green-600" },
];

export const STAFF = [
    {
        name: "Cranked",
        role: "Owner & Mastermind",
        image: "https://oldschool.runescape.wiki/images/Vannaka.png",
        desc: "The visionary force driving IronVeil forward. Master of strategy, game health, and keeping the wilderness dangerous.",
        skills: ["Project Management", "Game Design", "Economy Balancing", "Wilderness Logic"]
    },
    {
        name: "Syntaxx",
        role: "Co owner & Wizard",
        image: "https://oldschool.runescape.wiki/images/Wise_Old_Man.png",
        desc: "The architect behind the code. Transforming complex ideas into reality with seamless networking and pixel-perfect implementation.",
        skills: ["Full Stack Dev", "Server Architecture", "React Wizardry", "System Design"]
    }
];
