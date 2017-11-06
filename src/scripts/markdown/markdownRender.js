const MarkdownIt = require('markdown-it')

const markdown = new MarkdownIt({
  breaks: true,
  linkify: true,
  typographer: true,
})

const renderMarkdownToHtml = string => {
  if (!string) return ''
  return markdown.render(string)
}

const renderMarkdownToInline = string => {
  if (!string) return ''
  return markdown.renderInline(string)
}

module.exports = {
  renderMarkdownToHtml,
  renderMarkdownToInline,
}
