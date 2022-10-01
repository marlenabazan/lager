export default async function getCoordinates(address: string) {
    const urlEncodedAddress = encodeURIComponent(address); // hanterar speciella tecken
    const url = "https://nominatim.openstreetmap.org/search.php?format=jsonv2&q=";
    const response = await fetch(`${url}${urlEncodedAddress}`); // söker adress
    const result = await response.json();

    return result;
};