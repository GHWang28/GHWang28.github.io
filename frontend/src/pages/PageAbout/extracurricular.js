import { Link } from '@mui/material';

const generateExtraCurricularTimeline = (navigate, location) => {

  return [
    {
      oppContent: '(2017)',
      timlineDotColor: 'rgb(255,255,255)',
      timelineDotImg: '/images/timeline/robotics.jpg',
      timelineTitle: 'Zero Robotics High School Tournament',
      timelineContent: [
        'Worked with other peers to solve a challenging problem that involved resource management',
        'Enhanced my problem-solving skills which greatly influenced my programming skills'
      ]
    },
    {
      oppContent: '(2018)',
      timlineDotColor: 'rgb(255,255,255)',
      timelineDotImg: '/images/timeline/sefton-hs.jpg',
      timelineTitle: 'Peer Support Leader at Sefton High School',
      timelineContent: [
        'A school-term long commitment of mentoring and guiding a group of 7th grade high schoolers',
        'The role consisted of organising weekly activities and an end-of-term picnic to strengthen the student\'s familiarity with the school and their bonds amongs their cohort and teachers',
        'Continued to maintain positive relationships with students after the role till High School graduation'
      ]
    },
    {
      oppContent: '(2019)',
      timlineDotColor: 'rgb(255,255,255)',
      timelineDotImg: '/images/timeline/art-express.jpg',
      timelineTitle: 'ArtExpress 2020',
      timelineContent: [
        'Entered my 6-piece Body of Work for Art Express 2020 and was nominated to be displayed at the Art Gallery of New South Wales',
        'Extensive usage of Photoshop, Clip Studio and understanding of colours were required to create the Body of Work',
        'Took initiative to plan and organise my project by using several diaries and planners to keep track of ideas, character/environment designs and document progress.',
        'Undertaking this project taught me valuable experiences with project management',
        <Link sx={{ cursor: 'pointer' }} onClick={() => {
          navigate('/projects/earth-ephemeris', { state: { prevLocation: location.pathname } })
        }}>
          Click here to see the Body of Work on this website
        </Link>,
        <Link target='_blank' href='https://www.artgallery.nsw.gov.au/art/insideartexpress/2020/gordon-wang/'>
          Click here to see the Body of Work on the <i>Art Gallery of New South Wales</i> website
        </Link>
      ]
    },
    {
      oppContent: '(2022)',
      timlineDotColor: 'rgb(255,255,255)',
      timelineDotImg: '/images/timeline/trachack.jpg',
      timelineTitle: 'TracHack 22.2',
      timelineContent: [
        'Participated in a global competition that involved working as a team and creating a Machine Learning model that was able to predict the eligibility of customers for the Emergency Broadband Benifit Program',
        'Models created were trained using unsupervised Machine Learning algorithms',
        'Taught me skills in Python regarding the manipulation of big data, data cleaning and the many Machine Learning algorithms and its benefits',
        'Improved my skills as a team player'
      ]
    }
  ]
}

export default generateExtraCurricularTimeline;
