import { Header } from '@/components/HeaderComponent'
import { Loading } from '@/components/Loading'
import { useEffect, useState } from 'react'
import { getProjects } from 'src/services'
import { Container } from '../../components/home/styles'
import * as S from '../../components/projects/styles'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true)
      const response = await getProjects()

      setProjects(response)
      setLoading(false)
    }

    loadPosts()
  }, [])

  return (
    <>
      {loading && <Loading />}
      <Container>
        <Header page="projects" />
        <S.Title>What i’ve done</S.Title>
        <S.FlexWrapper>
          {projects.map(({ title, description, gitLink, cover, id }) => (
            <a key={id} target="_blank" href={gitLink} rel="noreferrer">
              <S.Card>
                <S.CardImage src={cover} />
                <S.ContainerText>
                  <S.CardTitle>{title}</S.CardTitle>
                  <S.CardDescription>{description}</S.CardDescription>
                  <S.CardButton></S.CardButton>
                </S.ContainerText>
              </S.Card>
            </a>
          ))}
        </S.FlexWrapper>
      </Container>
    </>
  )
}

export default Projects
