import { Link } from '@mui/material';

const generateExtraCurricularTimeline = (navigate, location) => {

  return [
    {
      oppContent: '(2017)',
      timelineDotColor: 'rgb(255,255,255)',
      timelineDotImg: '/images/timeline/robotics.jpg',
      timelineTitle: 'Zero Robotics High School Tournament',
      timelineContent: [
        'Worked with other peers to solve a challenging problem that involved resource management',
        'Enhanced my problem-solving skills which greatly influenced my programming skills'
      ]
    },
    {
      oppContent: '(2018)',
      timelineDotColor: 'rgb(255,255,255)',
      timelineDotImg: '/images/timeline/sefton-hs.jpg',
      timelineTitle: 'Peer Support Leader at Sefton High School',
      timelineContent: [
        'Committed to a school-term long mentorship role, providing guidance and support to a group of 7th grade high school students',
        'The role involved organising weekly activities and an end-of-term picnic to foster a sense of community and connection among students, their peers, and teachers. This allowed me to play a key role in creating a positive and supportive learning environment for the students',
        'Continued to maintain positive relationships with students after the role till High School graduation'
      ]
    },
    {
      oppContent: '(2019)',
      timelineDotColor: 'rgb(255,255,255)',
      timelineDotImg: '/images/timeline/art-express.jpg',
      timelineTitle: 'ArtExpress 2020',
      timelineContent: [
        'Submitted a 6-piece body of work for Art Express 2020, which later was selected for display at the prestigious Art Gallery of New South Wales',
        'Extensive usage of Photoshop, Clip Studio and understanding of colours were required to create the Body of Work',
        'Demonstrated initiative and organisational skills by utilising multiple diaries and planners to track ideas, character/environment designs, and document progress throughout the project. This approach allowed me to effectively plan and manage my work, ensuring timely and successful completion without compromising any of my ideas',
        'The successful completion of this project also provided valuable experience in project management, demonstrating my ability to effectively plan and enact on complex tasks',
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
      timelineDotColor: 'rgb(255,255,255)',
      timelineDotImg: '/images/timeline/trachack.jpg',
      timelineTitle: 'TracHack 22.2',
      timelineContent: [
        'Participated in a global competition that involved working as a team and creating a Machine Learning model that was able to predict the eligibility of customers for the Emergency Broadband Benefit Program',
        'Unsupervised machine learning algorithms were used to train the models',
        'Taught me skills in Python regarding the manipulation of big data, data cleaning and the many Machine Learning algorithms and its benefits',
        'Developed stronger team-oriented skills'
      ]
    }
  ]
}

export default generateExtraCurricularTimeline;
