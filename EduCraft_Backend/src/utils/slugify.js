// utils/slugify.js
exports.slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Handles duplicates by adding -1, -2, -3...
exports.generateUniqueSlug = (parentArray, title) => {
  const baseSlug = exports.slugify(title);
  let slug = baseSlug;
  let counter = 1;

  while (parentArray.some(item => item.slug === slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};
