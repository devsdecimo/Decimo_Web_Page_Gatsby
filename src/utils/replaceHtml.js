const drupalBaseUrl = process.env.DRUPAL_BASE_URL;

const replaceHtml = (html) => {
  const updatedHTML = html
    .replace(/<img[^>]*class="[^"]*"/g, "<img")
    .replace(/<img/g, '<img class="drupal-img"')
    .replace(/class="/g, 'class="')
    .replace(/src="\/sites/g, `src="${drupalBaseUrl}/sites`);

  return updatedHTML;
};

export default replaceHtml;
