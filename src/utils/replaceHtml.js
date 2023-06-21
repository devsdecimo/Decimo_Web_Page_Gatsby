// I tried to use an environment variable (the one that already exists in the .env)
// but it does not work because when it renders for the first time it is not defined,
// so you have to refresh the page so that it is defined
const replaceHtml = (html) => {
  const updatedHTML = html
    .replace(/<img[^>]*class="[^"]*"/g, "<img")
    .replace(/<img/g, '<img class="drupal-img"')
    .replace(/class="/g, 'class="')
    .replace(
      /src="\/sites/g,
      'src="https://dev-decimo-drupal-site.pantheonsite.io/sites'
    );

  return updatedHTML;
};

export default replaceHtml;
