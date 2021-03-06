import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useUIContext } from '../../../context/UIContext'
import { Heading } from './Heading'
import { Description } from './Description'
import { SubHeading } from './SubHeading'
import { LinkItem as Item } from './Item'

export function ModuleMenu() {
  const {
    allMdx: { nodes: lessons },
  } = useStaticQuery(graphql`
    query LessonMenuQuery {
      allMdx(filter: { fields: { type: { eq: "lesson" } } }) {
        nodes {
          frontmatter {
            title
          }
          fields {
            slug
            path
          }
        }
      }
    }
  `)
  const { resetNavigation, currentNavTarget } = useUIContext()
  if (currentNavTarget) {
    const { program, module } = currentNavTarget
    return (
      <>
        <Heading onClick={resetNavigation} icon="fas fa-caret-left">
          {program.title}
        </Heading>
        <SubHeading>{module.title}</SubHeading>
        {module.description && <Description>{module.description}</Description>}
        <Heading>Lessons</Heading>
        <div className="pl-3">
          {module.lessons.map((slug) => {
            const lesson = lessons.find((lesson) => lesson.fields.slug === slug)
            return lesson ? (
              <Item key={slug} to={lesson.fields.path}>
                {lesson.frontmatter.title}
              </Item>
            ) : (
              <Item key={slug}>
                <span className="text-red-400">MISSING LESSON: {slug}</span>
              </Item>
            )
          })}
        </div>
      </>
    )
  } else {
    return null
  }
}
