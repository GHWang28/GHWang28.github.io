import { Fragment } from 'react';
import GradientTitle from '../../components/GradientTitle';
import ButtonGoBack from '../../components/ButtonGoBack';
import { Box, Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import SkillIcon from './SkillIcon';

export default function PageSkills () {
  const lightMode = useTheme().palette.mode === 'light';
  const smallMq = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const headings = [
    'Programming Languages',
    'Frontend Technology',
    'Backend Technology',
    'Graphic Design',
    'Game Development',
    'Project Management',
    'Administrative Tools',
    'Languages',
    'Other'
  ]

  const allSkills = [
    {
      name: 'C',
      src: 'c.svg',
      tags: ['Programming Languages']
    },
    {
      name: 'C++',
      src: 'c++.svg',
      tags: ['Programming Languages']
    },
    {
      name: 'CSS',
      src: 'css.svg',
      tags: ['Frontend Technology']
    },
    {
      name: 'Firebase',
      src:   'firebase.svg',
      tags: ['Backend Technology']
    },
    {
      name: 'HTML',
      src: 'html.svg',
      tags: ['Frontend Technology']
    },
    {
      name: 'JEST',
      src: 'jest.svg',
      tags: ['Frontend Technology']
    },
    {
      name: 'Cypress',
      src: 'cypress.svg',
      whitebg: true,
      tags: ['Frontend Technology']
    },
    {
      name: 'Java',
      src: 'java.svg',
      tags: ['Programming Languages', 'Backend Technology']
    },
    {
      name: 'Spring Boot',
      src: 'spring-boot.svg',
      whitebg: true,
      tags: ['Backend Technology']
    },
    {
      name: 'JavaScript',
      src: 'js.svg',
      tags: ['Programming Languages', 'Frontend Technology', 'Backend Technology']
    },
    {
      name: 'TypeScript',
      src: 'ts.svg',
      tags: ['Programming Languages', 'Frontend Technology', 'Backend Technology']
    },
    {
      name: 'OpenGL',
      src: 'opengl.svg',
      tags: ['Game Development']
    },
    {
      name: 'Unity',
      src: 'unity.png',
      whitebg: true,
      tags: ['Game Development']
    },
    {
      name: 'Godot',
      src: 'godot.svg',
      tags: ['Game Development']
    },
    {
      name: 'PostgreSQL',
      src: 'psql.svg',
      tags: ['Backend Technology']
    },
    {
      name: 'Postman',
      src: 'postman.png',
      tags: ['Backend Technology']
    },
    {
      name: 'Python',
      src: 'python.svg',
      tags: ['Programming Languages', 'Backend Technology']
    },
    {
      name: 'React',
      src: 'react.svg',
      tags: ['Frontend Technology']
    },
    {
      name: 'Redux',
      src: 'redux.svg',
      tags: ['Frontend Technology']
    },
    {
      name: 'React Router',
      src: 'react-router.svg',
      whitebg: true,
      tags: ['Frontend Technology']
    },
    {
      name: 'Clip Studio Paint',
      src: 'clip.jpg',
      tags: ['Graphic Design']
    },
    {
      name: 'Animate',
      src: 'animate.svg',
      tags: ['Graphic Design']
    },
    {
      name: 'Photoshop',
      src: 'ps.svg',
      tags: ['Graphic Design']
    },
    {
      name: 'Material UI',
      src: 'mui.png',
      tags: ['Frontend Technology']
    },
    {
      name: 'Bootstrap',
      src: 'bootstrap.svg',
      tags: ['Frontend Technology']
    },
    {
      name: 'Figma',
      src: 'figma.svg',
      tags: ['Frontend Technology']
    },
    {
      name: 'RESTful API',
      src: 'rest-api.svg',
      whitebg: true,
      tags: ['Frontend Technology', 'Backend Technology']
    },
    {
      name: 'Word',
      src: 'office-ms.svg',
      tags: ['Administrative Tools']
    },
    {
      name: 'Excel',
      src: 'office-excel.svg',
      tags: ['Administrative Tools']
    },
    {
      name: 'PowerPoint',
      src: 'office-pp.svg',
      tags: ['Administrative Tools']
    },
    {
      name: 'Slack',
      src: 'slack.svg',
      tags: ['Administrative Tools']
    },
    {
      name: 'Teams',
      src: 'office-teams.svg',
      tags: ['Administrative Tools']
    },
    {
      name: 'Camtasia',
      src: 'camtasia.jpg',
      tags: ['Other']
    },
    {
      name: 'Git',
      src: 'git.svg',
      tags: ['Project Management']
    },
    {
      name: 'JIRA',
      src: 'jira.svg',
      tags: ['Project Management']
    },
    {
      name: 'Lucid Charts',
      src: 'lucid-charts.png',
      tags: ['Project Management']
    },
    {
      name: 'English',
      src: 'english.svg',
      whitebg: true,
      tags: ['Languages']
    },
    {
      name: 'Mandarin Chinese',
      src: 'chinese.svg',
      whitebg: true,
      tags: ['Languages']
    }
  ].sort((skillA, skillB) => ( skillA.name.localeCompare(skillB.name) ));

  const categorisedSkills = headings.map((heading) => ({
    heading,
    allSkills: allSkills.filter((skill) => skill?.tags?.find((e) => ( e === heading )))
  }));

  return (
    <Fragment>
      <ButtonGoBack destination={'/about'} />

      <GradientTitle title='Skills' subtitle='I possess skills in...' />

      <Box
        mx='auto'
        px={{ xs: 0.5, sm: 2 }}
        sx={{
          maxWidth: '750px',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: (lightMode) ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
          borderRadius: '15px'
        }}
      >
        {categorisedSkills.map((category) => (
          <Fragment key={`category-${category.heading}`}>
            <Divider sx={{
              '&::before, &::after': {
                borderColor: (lightMode) ? 'black.main' : 'whitesmoke',
              },
            }}>
              <Typography
                textAlign={(smallMq) ? 'left' : 'center'}
                fontWeight='bold'
                sx={{ textDecoration: 'underline', textAlign: (smallMq) ? 'left' : 'center' }}
                variant={'h5'}
              >
                {category.heading}
              </Typography>
            </Divider>
            
            <Box display='flex' justifyContent='center' flexWrap='wrap' rowGap={4} my={3}>
              {category.allSkills.map((skill, index) => (
                <SkillIcon index={index} src={`/images/about/skills/${skill.src}`} name={skill.name} key={skill.name} whitebg={skill?.whitebg}/>
              ))}
            </Box>
          </Fragment>
        ))}
      </Box>
    </Fragment>
  )
}