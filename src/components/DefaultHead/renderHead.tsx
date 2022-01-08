interface RenderHeadInterface {
  title: string
  titleComplete: string
  image: string
  description: string
  site_name?: string
  type?: string
}

export const RenderHead = ({
  title,
  titleComplete,
  image,
  description,
  site_name = 'João Augusto',
  type = 'article',
}: RenderHeadInterface) => {
  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={titleComplete} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={site_name} />
      <meta property="og:type" content={type} />

      <meta prefix="og: http://ogp.me/ns#" property="og:title" content={titleComplete} />
      <meta prefix="og: http://ogp.me/ns#" property="og:image" content={image} />
      <meta prefix="og: http://ogp.me/ns#" property="og:description" content={description} />
      <meta prefix="og: http://ogp.me/ns#" property="og:site_name" content={site_name} />
      <meta prefix="og: http://ogp.me/ns#" property="og:type" content={type} />
    </>
  )
}