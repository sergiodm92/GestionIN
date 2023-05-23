import { places, sizes, types, colors } from "./arrays";

export const generateRandomID = () => {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var id = '';

  for (var i = 0; i < 6; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return id;
}

export function decomposeId(id: string) {
  const placeInitials = id.slice(0, 2);
  const typeInitials = id.slice(2, 4);
  const sizeInitials = id.slice(4, 6);
  const colorInitials = id.slice(6, 8);
  const metalBoxInitials = id.slice(8);

  const place = places.find((p) => p.initials === placeInitials)?.name || "";
  const type = types.find((t) => t.initials === typeInitials)?.name || "";
  const size = sizes.find((s) => s.initials === sizeInitials)?.name || "";
  const color = colors.find((c) => c.initials === colorInitials)?.name || "";
  const metalBox = metalBoxInitials === "TR" ? "Si" : "No";

  return `Lugar: ${place}, \nTipo: ${type}, \nMedida: ${size}, \nColor: ${color}, \nCaja metálica: ${metalBox}`
}
