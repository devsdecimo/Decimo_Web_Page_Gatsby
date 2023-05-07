const wordsPerMinute = 200;

/*It allows us to count the number of words in the body and we calculate the amount of reading time according to the number of words divided by the average reading of an adult. */
export function readingTime(body) {
  const plainBody = body.replace(/(<([^>]+)>)/gi, "");

  const wordCount = plainBody.trim().split(/\s+/).length;

  const time = Math.ceil(wordCount / wordsPerMinute);

  return time;
}
