import http from "k6/http";
import { check, sleep } from "k6";

const apiBaseUrl = (__ENV.API_BASE_URL || "https://swapi.dev/api").replace(/\/$/, "");
const peopleQuery = __ENV.PEOPLE_QUERY || "Luke Skywalker";
const planetQuery = __ENV.PLANET_QUERY || "Alderaan";

export const options = {
  insecureSkipTLSVerify: __ENV.IGNORE_HTTPS_ERRORS === "true",
  scenarios: {
    smoke_search: {
      executor: "constant-vus",
      vus: Number(__ENV.VUS || 2),
      duration: __ENV.DURATION || "30s",
    },
  },
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<1000"],
  },
};

export default function () {
  const peopleResponse = http.get(`${apiBaseUrl}/people/?search=${encodeURIComponent(peopleQuery)}`);
  check(peopleResponse, {
    "people search is 200": response => response.status === 200,
    "people search has results": response => response.json("results").length > 0,
  });

  const planetResponse = http.get(`${apiBaseUrl}/planets/?search=${encodeURIComponent(planetQuery)}`);
  check(planetResponse, {
    "planet search is 200": response => response.status === 200,
    "planet search has results": response => response.json("results").length > 0,
  });

  sleep(1);
}
