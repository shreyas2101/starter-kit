/**
 * Converts a string to title case
 * @param str Input string
 * @returns Converted string in title case
 * @example
 * toTitleCase("HELLO WORLD") // "Hello World"
 * toTitleCase("THE QUICK brown FOX") // "The Quick Brown Fox"
 */
export const toTitleCase = (str: string | null | undefined): string => {
  if (!str) return "";

  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .trim();
};

/**
 * Truncates a string to a specified length and adds ellipsis
 * @param str Input string
 * @param length Maximum length
 * @param ending Custom ending (default: "...")
 * @returns Truncated string
 * @example
 * truncate("Long text here", 5) // "Long..."
 */
export const truncate = (
  str: string | null | undefined,
  length: number,
  ending = "...",
): string => {
  if (!str) return "";
  if (str.length <= length) return str;

  return str.substring(0, length - ending.length).trim() + ending;
};

/**
 * Removes all whitespace from a string
 * @param str Input string
 * @returns String without whitespace
 * @example
 * removeWhitespace("  hello  world  ") // "helloworld"
 */
export const removeWhitespace = (str: string | null | undefined): string => {
  if (!str) return "";
  return str.replace(/\s+/g, "");
};

/**
 * Converts a string to slug format
 * @param str Input string
 * @returns Slugified string
 * @example
 * slugify("Hello World!") // "hello-world"
 */
export const slugify = (str: string | null | undefined): string => {
  if (!str) return "";

  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscore with hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
};

/**
 * Capitalizes the first letter of a string
 * @param str Input string
 * @returns String with first letter capitalized
 * @example
 * capitalize("hello") // "Hello"
 */
export const capitalize = (str: string | null | undefined): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Formats a number as currency
 * @param amount Number to format
 * @param currency Currency code
 * @param locale Locale string
 * @returns Formatted currency string
 * @example
 * formatCurrency(1234.56) // "$1,234.56"
 */
export const formatCurrency = (
  amount: number | string | null | undefined,
  currency = "USD",
  locale = "en-US",
): string => {
  if (amount === null || amount === undefined) return "";

  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return "";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(num);
};

/**
 * Extracts the first N characters from a string
 * @param str Input string
 * @param n Number of characters
 * @returns First N characters
 * @example
 * takeFirst("Hello World", 5) // "Hello"
 */
export const takeFirst = (
  str: string | null | undefined,
  n: number,
): string => {
  if (!str) return "";
  return str.slice(0, n);
};

/**
 * Checks if a string is empty or consists only of whitespace
 * @param str Input string
 * @returns True if string is empty or whitespace
 * @example
 * isEmpty("  ") // true
 * isEmpty("hello") // false
 */
export const isEmpty = (str: string | null | undefined): boolean => {
  if (!str) return true;
  return str.trim().length === 0;
};

/**
 * Removes duplicate characters from a string
 * @param str Input string
 * @returns String with duplicate chars removed
 * @example
 * removeDuplicates("hello") // "helo"
 */
export const removeDuplicates = (str: string | null | undefined): string => {
  if (!str) return "";
  return [...new Set(str)].join("");
};

/**
 * Reverses a string
 * @param str Input string
 * @returns Reversed string
 * @example
 * reverse("hello") // "olleh"
 */
export const reverse = (str: string | null | undefined): string => {
  if (!str) return "";
  return str.split("").reverse().join("");
};

/**
 * Counts the occurrences of a substring in a string
 * @param str Input string
 * @param searchStr String to search for
 * @returns Number of occurrences
 * @example
 * countOccurrences("hello hello world", "hello") // 2
 */
export const countOccurrences = (
  str: string | null | undefined,
  searchStr: string,
): number => {
  if (!str || !searchStr) return 0;
  return (str.match(new RegExp(searchStr, "g")) ?? []).length;
};

/**
 * Masks a portion of the string with a character
 * @param str Input string
 * @param start Start position
 * @param end End position
 * @param maskChar Character to mask with
 * @returns Masked string
 * @example
 * mask("1234567890", 4, 8, "*") // "1234****90"
 */
export const mask = (
  str: string | null | undefined,
  start: number,
  end: number,
  maskChar = "*",
): string => {
  if (!str) return "";

  const length = str.length;
  if (start >= length || end <= start) return str;

  const maskLength = Math.min(end, length) - start;
  const maskedPortion = maskChar.repeat(maskLength);

  return (
    str.substring(0, start) +
    maskedPortion +
    str.substring(Math.min(end, length))
  );
};

/**
 * Normalize string by removing diacritics
 * @param str Input string
 * @returns Normalized string
 * @example
 * normalize("héllo") // "hello"
 */
export const normalize = (str: string | null | undefined): string => {
  if (!str) return "";
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
