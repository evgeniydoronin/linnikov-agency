export default function (string) {
  return string.split(",").map(entry => entry.trim());
};