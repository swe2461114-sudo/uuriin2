// Таван хошуу малын мэдээлэл.
// unit = хонин толгойд шилжүүлэх коэффициент (хонь = 1)
export const livestock = [
  {
    id: "camel", icon: "🐪", unit: 5, gestationMonths: 13,
    products: ["milk", "wool", "transport", "meat"],
    name: { mn: "Тэмээ", en: "Camel" },
    desc: {
      mn: "Говийн бүс нутагт өргөн тархсан, ган гачигт тэсвэртэй, ачаа тээшний гол мал.",
      en: "Common in the Gobi region, drought-tolerant and the main pack animal.",
    },
  },
  {
    id: "horse", icon: "🐎", unit: 7, gestationMonths: 11,
    products: ["riding", "milk", "meat"],
    name: { mn: "Адуу", en: "Horse" },
    desc: {
      mn: "Унаа, уралдааны мал. Гүүний сүүгээр айраг хийдэг.",
      en: "Used for riding and racing. Mare's milk is fermented into airag.",
    },
  },
  {
    id: "cattle", icon: "🐄", unit: 6, gestationMonths: 9,
    products: ["milk", "meat", "hide"],
    name: { mn: "Үхэр", en: "Cattle" },
    desc: {
      mn: "Сүү, махны гол эх үүсвэр. Уулархаг нутагт сарлаг, хайнаг үржүүлнэ.",
      en: "A key source of milk and meat. Yaks are bred in mountain areas.",
    },
  },
  {
    id: "sheep", icon: "🐑", unit: 1, gestationMonths: 5,
    products: ["meat", "wool", "hide"],
    name: { mn: "Хонь", en: "Sheep" },
    desc: {
      mn: "Махны гол мал. Бусад малыг хонин толгойд шилжүүлэх суурь нэгж.",
      en: "The main meat animal and the base unit for converting other livestock.",
    },
  },
  {
    id: "goat", icon: "🐐", unit: 0.9, gestationMonths: 5,
    products: ["cashmere", "meat", "milk"],
    name: { mn: "Ямаа", en: "Goat" },
    desc: {
      mn: "Ямаан ноолуурын гол эх үүсвэр, бэлчээрт дасан зохицох чадвар сайтай.",
      en: "The main source of cashmere, well adapted to rangelands.",
    },
  },
];
