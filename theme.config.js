import Head from './components/Head'
import MaviLogo from './components/Logo'

export default {
  projectLink: 'https://github.com/mavi-server/mavi', // GitHub link in the navbar
  docsRepositoryBase: 'https://github.com/mavi-server/documentation', // base URL for the docs repository
  titleSuffix: null,
  nextLinks: true,
  prevLinks: true,
  search: true,
  customSearch: null, // customizable, you can use algolia for example
  darkMode: true,
  footer: true,
  footerText: `MIT ${new Date().getFullYear()} © Mavi`,
  footerEditLink: `Edit this page on GitHub`,
  logo: <MaviLogo />,
  head: <Head />,
}
