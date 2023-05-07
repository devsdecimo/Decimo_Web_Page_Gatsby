//This function receives the title and removes any character other than a letter number or hyphen
function postSlug(title) {
  let slug = title
    .replace(/\W+/g, " ")
    .trim()
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase();

  return slug;
}

module.exports = { postSlug };
