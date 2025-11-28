import type { CollisionEvent } from "../types";

const API_BASE_URL = "http://localhost:5299/api";

/**
 * Wysyła zdarzenie kolizji do backendu.
 */
export const logCollisionEvent = async (event: CollisionEvent): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/racetrack/race-events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error(`Błąd API: ${response.status}`);
    }
  } catch (error) {
    console.error("Błąd podczas zapisywania zdarzenia kolizji:", error);
    throw error;
  }
};
