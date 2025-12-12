
import GAME_DATA from './game_data.json';

export const getGameItem = (name, fallbackStats) => {
    const item = GAME_DATA[name];
    if (item) {
        return {
            id: item.id,
            name: item.name,
            stats: item.stats ? `+${Object.values(item.stats).reduce((a, b) => a + b, 0)} Total` : fallbackStats,
        };
    }
    return { id: Math.random(), name, stats: fallbackStats };
};

export const getItemImage = (name) => {
    if (!name) return null;
    if (GAME_DATA[name] && GAME_DATA[name].icon_url) {
        return GAME_DATA[name].icon_url;
    }
    const formatted = name.replace(/ /g, '_');
    return `https://oldschool.runescape.wiki/images/${formatted}_detail.png`;
};

export const ARMORY_DATA = {
    MELEE: {
        id: 'melee',
        label: 'Max Melee',
        username: "IronLegend",
        rank: "Ironman",
        totalLevel: 2277,
        description: "Standard max efficiency melee setup.",
        equipment: {
            head: getGameItem("Torva full helm", "+8 Str, +256 Def"),
            body: getGameItem("Torva platebody", "+6 Str, +320 Def"),
            legs: getGameItem("Torva platelegs", "+4 Str, +289 Def"),
            weapon: getGameItem("Scythe of vitur", "+75 Str, +70 Acc"),
            shield: getGameItem("Avernic defender", "+30 Acc, +8 Str"),
            feet: getGameItem("Primordial boots", "+5 Str, +2 Acc"),
            hands: getGameItem("Ferocious gloves", "+14 Str, +16 Acc"),
            neck: getGameItem("Amulet of torture", "+15 Acc, +10 Str"),
            ring: getGameItem("Ultor ring", "+12 Str"),
            cape: getGameItem("Infernal cape", "+8 Str, +4 Prayer")
        }
    },
    RANGED: {
        id: 'ranged',
        label: 'Max Ranged',
        username: "BowFaDees",
        rank: "Legend",
        totalLevel: 2150,
        description: "High dps ranged setup for raids.",
        equipment: {
            head: getGameItem("Masori mask (f)", "+8 Ranged Str"),
            body: getGameItem("Masori body (f)", "+4 Ranged Str"),
            legs: getGameItem("Masori chaps (f)", "+2 Ranged Str"),
            weapon: getGameItem("Twisted bow", "+70 Ranged Str"),
            shield: getGameItem("Dragonfire ward", "+15 Def"),
            feet: getGameItem("Pegasian boots", "+12 Ranged Acc"),
            hands: getGameItem("Zaryte vambraces", "+2 Ranged Str"),
            neck: getGameItem("Necklace of anguish", "+5 Ranged Str"),
            ring: getGameItem("Venator ring", "+2 Ranged Str"),
            cape: getGameItem("Ava's assembler", "+2 Ranged Str"),
            ammo: getGameItem("Dragon arrow", "+60 Str")
        }
    },
    MAGE: {
        id: 'mage',
        label: 'Max Mage',
        username: "ShadowWizard",
        rank: "Administrator",
        totalLevel: 2277,
        description: "Tumeken's Shadow max hit setup.",
        equipment: {
            head: getGameItem("Ancestral hat", "+2% Magic Dmg"),
            body: getGameItem("Ancestral robe top", "+2% Magic Dmg"),
            legs: getGameItem("Ancestral robe bottom", "+2% Magic Dmg"),
            weapon: getGameItem("Tumeken's shadow", "Triple Magic Accuracy"),
            feet: getGameItem("Eternal boots", "+8 Magic Acc"),
            hands: getGameItem("Tormented bracelet", "+5% Magic Dmg"),
            neck: getGameItem("Occult necklace", "+10% Magic Dmg"),
            ring: getGameItem("Magus ring", "+2% Magic Dmg"),
            cape: getGameItem("Imbued guthix cape", "+2% Magic Dmg")
        }
    },
    NH: {
        id: 'nh',
        label: 'NH Pker',
        username: "SitRat",
        rank: "Pker",
        totalLevel: 126,
        description: "Tribrid setup for deep wilderness.",
        equipment: {
            head: getGameItem("Neitiznot faceguard", "+6 Str"),
            body: getGameItem("Ahrim's robetop", "Mage/Def Hybrid"),
            legs: getGameItem("Ahrim's robeskirt", "Mage/Def Hybrid"),
            weapon: getGameItem("Ancient godsword", "Blood Sacrifice"),
            shield: getGameItem("Elysian spirit shield", "Dmg Reduction"),
            feet: getGameItem("Primordial boots", "+5 Str"),
            hands: getGameItem("Barrows gloves", "Hybrid Stats"),
            neck: getGameItem("Amulet of fury", "Hybrid Stats"),
            ring: getGameItem("Ring of suffering (i)", "+20 Def, Recoil"),
            cape: getGameItem("Infernal cape", "+8 Str")
        }
    }
};
