import moment from "moment/moment";

const generateEmploymentTimeline = () => {
  return [
    {
      oppContent: '(February 2018)',
      timlineDotColor: 'rgb(255,255,255)',
      timelineDotImg: '/images/employment/aie.jpg',
      timelineTitle: 'Academy of Interactive Entertainment Work Experience',
      timelineContent: [
        'Gained valuable insight and experience with industry standard tools for Game Development and Animation (Autodesk Maya, Adobe Animate, Photoshop, GameMaker Studio)',
        'Experimented with various Game-making techniques such as normal maps, height maps, texture application etc.',
        'Created games using JavaScript',
        'Developed good work ethics and interactions with co-workers'
      ]
    },
    {
      oppContent: '(30th November 2019) → (Present Time)',
      timlineDotColor: 'rgb(255,255,255)',
      timelineDotImg: '/images/employment/abc.jpg',
      timelineTitle: 'Australia ABC College Tutor',
      timelineContent: [
        'Held onto a tutoring and administration role at Australia ABC College which specialises in tutoring Primary and High School students',
        'Cultivated long-term positive relationships with colleagues, students and their parents through friendly ongoing communication',
        'Gained expereince with working as a team, which assisted me in understanding colleagues concerns and needs',
        'Taught Mathematics, English, General Abiltiy, Spelling and Vocabulary to a variety of cohorts with class sizes of 10 to 15 students',
        'Assisted parents with a variety of concerns, such as arranging their child\'s Opportunity Class and Selective Applications'
      ]
    },
    {
      oppContent: `(${moment().format('Do MMMM YYYY')})`,
      timlineDotColor: 'rgb(0,0,0)',
      timelineTitle: 'Present Time',
      timelineContent: [
        'Currently employed at ABC College and have applied for a tutoring position at UNSW'
      ]
    }
  ]
}

export default generateEmploymentTimeline;
