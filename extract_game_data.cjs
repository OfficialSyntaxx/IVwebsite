
const fs = require('fs');
const path = require('path');

// Paths
const GAME_SERVER_DATA = path.join(__dirname, '../IronVeil-GameServer/data/osrsbox-db/items-complete.json');
const OUTPUT_FILE = path.join(__dirname, 'src/data/game_data.json');

// List of items we want to find (from App.jsx)
const TARGET_ITEMS = [
    // Melee
    "Torva full helm", "Torva platebody", "Torva platelegs", "Scythe of vitur",
    "Avernic defender", "Primordial boots", "Ferocious gloves", "Amulet of torture",
    "Ultor ring", "Infernal cape",
    // Ranged
    "Masori mask (f)", "Masori body (f)", "Masori chaps (f)", "Twisted bow",
    "Dragonfire ward", "Pegasian boots", "Zaryte vambraces", "Necklace of anguish",
    "Venator ring", "Ava's assembler", "Dragon arrow",
    // Mage
    "Ancestral hat", "Ancestral robe top", "Ancestral robe bottom", "Tumeken's shadow",
    "Eternal boots", "Tormented bracelet", "Occult necklace", "Magus ring", "Imbued guthix cape",
    // NH
    "Neitiznot faceguard", "Ahrim's robetop", "Ahrim's robeskirt", "Ancient godsword",
    "Elysian spirit shield", "Barrows gloves", "Amulet of fury", "Ring of suffering (i)",
    // Collection Log
    "Kodai insignia", "Elder maul", "Dragon claws", "Dinh's bulwark",
    "Pet snakeling", "Toxic blowpipe", "Magic fang", "Serpentine visage", "Tanzanite fang", "Uncut onyx", "Pet vorki", "Draconic visage", "Jar of decay",
    "Bloodhound", "3rd age pickaxe", "3rd age druidic robe top", "3rd age druidic robe bottom", "Ring of coins", "Mimic", "Ranger boots", "Holy sandals",
    "Void knight top", "Void knight robe", "Void knight gloves", "Fighter torso", "Fire cape", "Imbued heart", "Castle wars helm (red)"
];

try {
    console.log("Reading game data...");
    if (!fs.existsSync(GAME_SERVER_DATA)) {
        console.error("Game data file not found at:", GAME_SERVER_DATA);
        process.exit(1);
    }

    const rawData = fs.readFileSync(GAME_SERVER_DATA, 'utf8');
    const items = JSON.parse(rawData);

    const foundItems = {};
    const missingItems = [];

    console.log("Searching for items...");

    // Create a lookup map by name (normalize to lowercase)
    const itemMap = new Map();
    Object.values(items).forEach(item => {
        itemMap.set(item.name.toLowerCase(), item);
    });

    TARGET_ITEMS.forEach(name => {
        const item = itemMap.get(name.toLowerCase());
        if (item) {
            foundItems[name] = {
                id: item.id,
                name: item.name,
                examine: item.examine,
                wiki_url: item.wiki_url,
                icon_url: `https://oldschool.runescape.wiki/images/${item.name.replace(/ /g, '_')}_detail.png`, // Construct wiki url as fallback
                stats: item.equipment ? item.equipment : null
            };
        } else {
            console.warn(`Missing: ${name}`);
            missingItems.push(name);
        }
    });

    // Create directory if not exists
    const dir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(foundItems, null, 2));
    console.log(`Successfully wrote ${Object.keys(foundItems).length} items to ${OUTPUT_FILE}`);

    if (missingItems.length > 0) {
        console.log("Missing items:", missingItems);
    }

} catch (e) {
    console.error("Error:", e);
}
