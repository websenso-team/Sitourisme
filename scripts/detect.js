#!/usr/bin/env node
/**
 * Récupère AUTOMATIQUEMENT tous les objets de type EQUIPEMENT d'un projet Apidae,
 * via l'API de DIFFUSION (recherche), et affiche pour chacun :
 *   - l'ID Apidae           -> obj.id
 *   - le membre propriétaire-> obj.gestion.membreProprietaire  (= "qui tient la fiche")
 *   - dates création / modif-> obj.gestion.dateCreation / dateModification
 *
 * IMPORTANT :
 *   - La lecture/recherche se fait avec apiKey + projetId (PAS d'OAuth).
 *   - L'OAuth client_credentials de ton apidae.js ne sert QUE pour l'API d'écriture
 *     (/api/v002/ecriture/...). Il n'y a pas de "listing" dans l'API d'écriture.
 *
 * Doc : https://dev.apidae-tourisme.com/documentation-technique/api-de-diffusion/
 *       liste-des-services/  (service recherche/list-objets-touristiques)
 *
 * Prérequis : Node 18+ (fetch natif).
 */

const BASE = "https://api.apidae-tourisme.com/api/v002";

const API_KEY = process.env.APIDAE_API_KEY || "VOTRE_API_KEY";
const PROJET_ID = Number(process.env.APIDAE_PROJET_ID || 0); // ex: 4187

// On ne demande que les champs utiles -> réponse plus légère.
const RESPONSE_FIELDS = [
  "id",
  "nom",
  "type",
  "gestion.membreProprietaire.id",
  "gestion.membreProprietaire.nom",
  "gestion.dateCreation",
  "gestion.dateModification",
].join(",");

const PAGE = 200; // taille de page max conseillée par Apidae

/**
 * Appelle recherche/list-objets-touristiques pour une page donnée.
 * Le filtre type EQUIPEMENT se fait via criteresQuery ("type:EQUIPEMENT").
 */
async function rechercheEquipements(first) {
  const query = {
    apiKey: API_KEY,
    projetId: PROJET_ID,
    criteresQuery: "type:EQUIPEMENT",
    first,
    count: PAGE,
    responseFields: RESPONSE_FIELDS,
    // locales: ["fr"],
  };

  const url = `${BASE}/recherche/list-objets-touristiques?query=${encodeURIComponent(
    JSON.stringify(query)
  )}`;

  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`recherche -> ${res.status} : ${await res.text()}`);
  }
  return res.json(); // { numFound, objetsTouristiques: [...] }
}

function ligne(obj) {
  const nom = obj.nom?.libelleFr ?? "(sans nom)";
  const prop = obj.gestion?.membreProprietaire;
  console.log("──────────────────────────────────────────");
  console.log(`ID Apidae           : ${obj.id}`);
  console.log(`Nom                 : ${nom}`);
  console.log(
    `Membre propriétaire : ${prop ? `${prop.nom} (id ${prop.id})` : "—"}`
  );
  console.log(`Créée le            : ${obj.gestion?.dateCreation ?? "—"}`);
  console.log(`Modifiée le         : ${obj.gestion?.dateModification ?? "—"}`);
}

async function main() {
  let first = 0;
  let total = Infinity;
  let recu = 0;

  while (first < total) {
    const data = await rechercheEquipements(first);
    total = data.numFound ?? 0;
    const objets = data.objetsTouristiques ?? [];
    if (objets.length === 0) break;

    objets.forEach(ligne);
    recu += objets.length;
    first += PAGE;
  }

  console.log(`\n${recu} équipement(s) lus sur ${total} trouvés.`);
}

main().catch((e) => {
  console.error("Erreur :", e.message);
  process.exit(1);
});

module.exports = { rechercheEquipements };
