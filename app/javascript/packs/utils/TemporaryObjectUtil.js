export function generateTempId() {
  return "TEMP" + Date.now();
}

export function isTempId(tempId) {
  return tempId.slice(0, 4) === "TEMP"
}
