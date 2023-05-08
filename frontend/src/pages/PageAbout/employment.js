import moment from "moment/moment";

const generateEmploymentTimeline = () => {
  return [
    {
      oppContent: '(February 2018)',
      timelineDotColor: 'rgb(255,255,255)',
      timelineDotImg: '/images/timeline/aie.jpg',
      timelineTitle: 'Academy of Interactive Entertainment Work Experience',
      timelineContent: [
        'Obtained valuable experience and insight using industry-standard tools for game development and animation, such as Autodesk Maya, Adobe Animate, Photoshop, and GameMaker Studio',
        'Experimented with various game-making techniques, including normal maps, height maps, and texture application',
        'Created games using JavaScript',
        'Developed strong work ethics and effective communication skills in collaboration with my team'
      ]
    },
    {
      oppContent: '(30th November 2019) → (Present Time)',
      timelineDotColor: 'rgb(255,255,255)',
      timelineDotImg: '/images/timeline/abc.jpg',
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
      oppContent: '(13th February 2023) → (Present Time)',
      timelineDotColor: 'rgb(254,230,0)',
      timelineDotImg: '/images/timeline/unsw.jpg',
      timelineTitle: 'UNSW COMP6080 Web Front-End Programming Tutor',
      timelineContent: [
        'Currently holding a tutoring role in a Front-End course at UNSW',
        'Maintained a strong bond with a classroom of 32 students',
        'Involved guiding and nurturing the growth of university students with limited experience in Front-End development, empowering them to comprehend the intricacies and possibilities of the React library.'
      ]
    },
    {
      oppContent: `(${moment().format('Do MMMM YYYY')})`,
      timelineDotColor: 'rgb(0,0,0)',
      timelineTitle: 'Present Time',
      timelineContent: [
        'Currently employed at ABC College and a Frontend Tutor at UNSW'
      ]
    }
  ]
}

export default generateEmploymentTimeline;
