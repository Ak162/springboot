export const isUrl = (str) => {
  // str exists
  if (typeof str !== "string" || str.length < 3) {
    return false;
  }
  // Only contains letters numbers and '.', '-'
  if (/^[a-zA-Z0-9.-]*$/.test(str) === false) {
    return false;
  }
  // Contains one '.'
  if (!str.includes(".")) {
    return false;
  }
  // can't start or end with '.' or '-'
  if (
    str[0] === "." ||
    str[0] === "-" ||
    str[str.length - 1] === "." ||
    str[str.length - 1] === "-"
  ) {
    return false;
  }
  // can't have these either
  if (str.includes(".-") || str.includes("-.")) {
    return false;
  }

  return true;
};

export const validate = (name) => {
  let data = { ...name };
  for (let key of Object.keys(name).filter((key) => !key.includes("Error"))) {
    if (!name[key]) {
      data[key + "Error"] = true;
      data["notValid"] = true;
    } else {
      data[key + "Error"] = false;
      data["notValid"] = false;
    }
  }
  return data;
};

export function isValidHttpUrl(s) {
  let url;
  try {
    url = new URL(s);
  } catch (e) {
    return false;
  }
  return /https?/.test(url.protocol);
}

export function ValidEmail(email) {
  const regex = /^[\w\d._-]+@[a-z]+\.[a-z]{2,3}(\.[a-z]{2,3})?$/i;
  return regex.test(email);
}
