const Parser = require('rss-parser');

const parser = new Parser();

// ==> Método que retorna as informações do rss do jornal valor economico
exports.rss = async (req) => {
  let result = [];

  const feed = await (async () => parser.parseURL(req))();

  feed.items.forEach((element) => {
    result.push({
      title: element.title,
      content: element.contentSnippet.trim(),
      link: element.link,
      date: new Date(element.pubDate).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
      categories: element.categories,
    });
  });

  result = result.slice(0, 5);

  return result;
};
