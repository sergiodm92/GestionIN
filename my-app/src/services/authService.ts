// authService.ts
export function getAuthToken(): string {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem("authToken") as string;
  }
  return ""; // o maneja el caso en que no haya localStorage disponible
}

  