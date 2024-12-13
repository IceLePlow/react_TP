import React, { useState, useEffect } from "react";
import { SuperHero } from "./Superhero"; // Importation de notre classe SuperHero
import SuperHerosData from "./Superhero.json"; // Importation du fichier JSON
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Ajout d'un fichier CSS personnalisé

export default function App() {
  const [heroes, setHeroes] = useState<SuperHero[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");

  useEffect(() => {
    const heroesFromData = SuperHerosData.map((heroData: any) =>
      new SuperHero(heroData.id, heroData.name, heroData["id-api"], heroData.powerstats, heroData.slug)
    );
    setHeroes(heroesFromData);
  }, []);

  const filteredHeroes = heroes.filter((hero: SuperHero) => {
    return hero.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sortedHeroes = filteredHeroes.sort((a: SuperHero, b: SuperHero) => {
    if (sortOption === "name") {
      return a.name.localeCompare(b.name);
    } else {
      return a.id - b.id;
    }
  });

  return (
    <div className="container">
      <div className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Search heroes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="form-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="id">Sort by ID</option>
        </select>
      </div>

      {/* Affichage des héros dans une grille Bootstrap */}
      <div className="row g-3">
        {sortedHeroes.map((hero) => (
          <div className="col-md-6 col-lg-4" key={hero.id}>
            <div className="card shadow-sm h-100 card-hover">
              <div className="row g-0">
                {/* Colonne pour l'image */}
                <div className="col-4">
                  <img
                    src={`https://cdn.jsdelivr.net/gh/rtomczak/superhero-api@0.3.0/api/images/sm/${hero.slug}.jpg`}
                    alt={hero.name}
                    className="img-fluid rounded-start"
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                </div>
                {/* Colonne pour les informations */}
                <div className="col-8">
                  <div className="card-body">
                    <h5 className="card-title">{hero.name}</h5>
                    <p><strong>Id API:</strong> {hero.idApi}</p>
                    <p><strong>Slug:</strong> {hero.slug}</p>
                    <h6>Powerstats:</h6>
                    <ul className="list-unstyled">
                      {Object.entries(hero.powerstats).map(([stat, value]) => {
                        const statValue = value as number; // Cast explicite de value en "number"
                        return (
                          <li key={stat}>
                            <strong>{stat.charAt(0).toUpperCase() + stat.slice(1)}:</strong>{" "}
                            <span className={`badge bg-${getStatColor(statValue)}`}>{statValue}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getStatColor(value: number): string {
  if (value >= 80) return "success"; // Vert pour les valeurs élevées
  if (value >= 50) return "warning"; // Jaune pour les valeurs moyennes
  return "danger"; // Rouge pour les valeurs basses
}
