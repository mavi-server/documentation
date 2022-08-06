const MaviLogo = () => {
  return (
    <img
      width="120px"
      src="https://raw.githubusercontent.com/m-emre-yalcin/mavi/main/public/mavi.svg"
    />
  )
}
const Head = () => {
  return (
    <>
      <title>Mavi documantation</title>
      <link rel="shortcut icon" href="../public/mavi.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Mavi documantation" />
      <meta name="og:title" content="Mavi documantation" />
    </>
  )
}

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
