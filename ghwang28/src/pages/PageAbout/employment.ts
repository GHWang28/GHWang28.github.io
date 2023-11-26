import moment from 'moment/moment';
import { TimelineData } from '../../types';

const currTime = moment().format('Do MMM YY');

const generateEmploymentTimeline = (): TimelineData[] => [
  {
    oppContent: '(Feb 18)',
    timelineDotColor: 'rgb(255,255,255)',
    timelineDotImg: '/images/timeline/aie.webp',
    timelineTitle: 'Academy of Interactive Entertainment Work Experience',
    timelineContent: [
      'Obtained valuable experience and insight using industry-standard tools for game development and animation, such as Autodesk Maya, Adobe Animate, Photoshop, and GameMaker Studio',
      'Experimented with various game-making techniques, including normal maps, height maps, and texture application',
      'Created games using JavaScript',
      'Developed strong work ethics and effective communication skills in collaboration with my team'
    ]
  },
  {
    oppContent: `(30th Nov 19) → (${currTime})`,
    timelineDotColor: 'rgb(255,255,255)',
    timelineDotImg: '/images/timeline/abc.webp',
    timelineTitle: 'Australia ABC College Tutor',
    timelineContent: [
      'Currently holding a tutoring and administrative role at Australia ABC College, specialising in providing support to primary and high school students. This strengthened my ability to thrive in a teaching environment',
      'Established and maintained long-term positive relationships with colleagues, students and parents through effective ongoing communication and friendly interactions',
      'Acquired experience working as part of a team, which helped me to understand and address the concerns and needs of my colleagues',
      'Taught Mathematics, English, General Abiltiy, Spelling and Vocabulary to a variety of cohorts with class sizes of 10 to 15 students',
      'Assisted parents with a variety of concerns, such as arranging their child\'s Opportunity Class and Selective Applications'
    ]
  },
  {
    oppContent: `(13th Feb 23) → (${currTime})`,
    timelineDotColor: 'rgb(254,230,0)',
    timelineDotImg: '/images/timeline/unsw.webp',
    timelineTitle: 'UNSW COMP6080 Web Frontend Programming Tutor',
    timelineContent: [
      'Currently holding a tutoring role in a Frontend course at UNSW',
      'Maintained a strong bond with a classroom of 32 students, as well as preparing lesson materials for them',
      'Involved guiding and nurturing the growth of university students with limited experience in Frontend development, empowering them to comprehend the intricacies and possibilities of the React library.',
      'Assisted and guided students in Help Sessions with Frontend related queries by exchanging ideas and listening to their problems',
      'Consistently answering and monitoring the course forum questions from students',
      'Graded student’s assignments and exams',
    ]
  },
  {
    oppContent: `(13th Nov 23) → (${currTime})`,
    timelineDotColor: 'rgb(0,0,0)',
    timelineDotImg: '/images/timeline/tiktok.webp',
    timelineTitle: 'TikTok Australia Frontend Engineer',
    timelineContent: [
      'Started a Graduate Frontend role at TikTok Australia.'
    ]
  },
  {
    oppContent: `(${currTime})`,
    timelineDotColor: 'rgb(0,0,0)',
    timelineTitle: 'Present Time',
    timelineContent: [
      'I am currently employed at Australia ABC College Tutoring, work as a Frontend Tutor at UNSW and a Graduate Frontend Engineer at TikTok Australia.'
    ]
  }
]


export default generateEmploymentTimeline;
