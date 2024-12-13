// superheros.ts
export class SuperHero {
  id: number;
 name: string;
  idApi: number;
  slug: string | undefined;
  powerstats: PowerStats;


  constructor(id: number, name: string, idApi: number,powerstats:PowerStats, slug?: string ) {
  this.id = id;
  this.name = name;
  this.idApi = idApi;
  this.powerstats = powerstats
  this.slug = slug;
  }
 }

 export interface PowerStats {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
 }