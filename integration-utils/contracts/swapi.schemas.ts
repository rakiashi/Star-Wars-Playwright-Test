import { z } from "zod";

const nullableUrl = z.string().url().nullable();

export const swapiCharacterSchema = z.object({
  name: z.string().min(1),
  gender: z.string(),
  birth_year: z.string(),
  eye_color: z.string(),
  skin_color: z.string(),
}).passthrough();

export const swapiPlanetSchema = z.object({
  name: z.string().min(1),
  population: z.string(),
  climate: z.string(),
  gravity: z.string(),
}).passthrough();

export const swapiPeopleSearchResponseSchema = z.object({
  count: z.number(),
  next: nullableUrl,
  previous: nullableUrl,
  results: z.array(swapiCharacterSchema).min(1),
}).passthrough();

export const swapiPlanetSearchResponseSchema = z.object({
  count: z.number(),
  next: nullableUrl,
  previous: nullableUrl,
  results: z.array(swapiPlanetSchema).min(1),
}).passthrough();
