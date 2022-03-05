import React from 'react'
import Link from 'next/link'
import * as S from './styles'
import { HeaderComponentInterface } from './components'
import { useLanguage } from 'src/languages/hooks'
import { GithubIcon } from 'public/github'

export const Header: React.FC<HeaderComponentInterface> = ({ page, isAbsolute }) => {
  const { text, lang, pathname } = useLanguage()

  const opposite = { pt: 'en', en: 'pt' } as { [key: string]: string }

  const children = (
    <div>
      <Link href={`/?lang=${lang}`} passHref>
        <S.ButtonHeader active={page === 'home'}>{text.home}</S.ButtonHeader>
      </Link>
      <Link href={`/projects?lang=${lang}`} passHref>
        <S.ButtonHeader active={page === 'projects'}>{text.project}</S.ButtonHeader>
      </Link>
      <Link href={`/blog?lang=${lang}`} passHref>
        <S.ButtonHeader active={['blog', 'blog-page'].includes(page)}>{text.blog}</S.ButtonHeader>
      </Link>
      <S.Image
        onClick={() => (window.location.href = `${pathname}?lang=${opposite[lang]}`)}
        src={`/languages/${opposite[lang]}.png`}
      />
      <S.IconDiv onClick={() => window.open('https://github.com/Joao208/fe_personal_website', '_blank')}>
        <GithubIcon />
      </S.IconDiv>
    </div>
  )

  if (isAbsolute) return <S.AbsoluteHeader>{children}</S.AbsoluteHeader>

  return <S.Header>{children}</S.Header>
}
