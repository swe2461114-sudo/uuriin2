import { livestock } from "../data/livestock.js";

export function getAllLivestock() {
  return livestock;
}

// Сүргийн тооцоо
export function calculateHerd(counts, { pastureHa, hayKg, days }) {
  const rows = livestock.map((a) => {
    const heads = Number(counts[a.id]) || 0;
    return { id: a.id, heads, units: heads * a.unit };
  });

  const totalHeads = rows.reduce((s, r) => s + r.heads, 0);
  const totalUnits = rows.reduce((s, r) => s + r.units, 0);

  return {
    rows,
    totalHeads,
    totalUnits,
    pastureHa: totalUnits * (Number(pastureHa) || 0),
    hayTonnes: (totalUnits * (Number(hayKg) || 0) * (Number(days) || 0)) / 1000,
  };
}
