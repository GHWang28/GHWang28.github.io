import React from 'react';
import BlogElement from './blogElementTypes';

export type Action<T> = {
  type: string,
  value: T
}

export type FooterContacts = {
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  title: string,
  icon: React.ReactNode
}

export type BlogData = {
  id: number,
  title: string,
  subtitle: string,
  thumbnail: string,
  created: string,
  estimatedReadingTime: number,
  quizIncluded: boolean,
  emoji: string,
  elements: BlogElement[]
}

export type ProjectData = {
  title: string,
  date: string,
  type: IconTypes[],
  body: (React.ReactNode | string)[],
  imgs: string[],
  buttons: ProjectButtons[]
}

type ProjectButtons = {
  text: string,
  icon: React.ReactNode,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  disabled?: string
}

export type ProjectFilter = {
  type: IconTypes,
  enabled: boolean
}

export type IconTypes = 'Artwork' | 'React' | 'C++' | 'Game' | 'OpenGL' | 'JavaScript' | 'Frontend' | 'Personal Project' | 'University Project' | 'High School Project' | 'Firebase'

export type QuizOptions = {
  text: React.ReactNode | string,
  correct: boolean,
  explanation: React.ReactNode | string
}

export type SparklezType = {
  id: string,
  timestamp: number,
  color: string,
  size: number,
  style: {
    top: string,
    left: string,
    zIndex: 2,
  }
}

export type Skill = {
  name: string,
  src: string,
  tags: string[],
  whitebg?: boolean
}

export type TimelineData = {
  oppContent: string,
  timelineDotColor: string,
  timelineDotImg?: string,
  timelineTitle: string,
  timelineContent: (React.ReactNode | string)[]
}

export type HobbyData = {
  icon: React.ReactNode,
  text: string,
}

export type ContactData = {
  label: string,
  info?: string,
  extraInfo?: string,
  icon: React.ReactNode,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  tooltip: string,
}

export type Position = {
  x: number,
  y: number
}

export type CSSColorKeyword =
| 'aliceblue'
| 'antiquewhite'
| 'aqua'
| 'aquamarine'
| 'azure'
| 'beige'
| 'bisque'
| 'black'
| 'blanchedalmond'
| 'blue'
| 'blueviolet'
| 'brown'
| 'burlywood'
| 'cadetblue'
| 'chartreuse'
| 'chocolate'
| 'coral'
| 'cornflowerblue'
| 'cornsilk'
| 'crimson'
| 'cyan'
| 'darkblue'
| 'darkcyan'
| 'darkgoldenrod'
| 'darkgray'
| 'darkgreen'
| 'darkgrey'
| 'darkkhaki'
| 'darkmagenta'
| 'darkolivegreen'
| 'darkorange'
| 'darkorchid'
| 'darkred'
| 'darksalmon'
| 'darkseagreen'
| 'darkslateblue'
| 'darkslategray'
| 'darkslategrey'
| 'darkturquoise'
| 'darkviolet'
| 'deeppink'
| 'deepskyblue'
| 'dimgray'
| 'dimgrey'
| 'dodgerblue'
| 'firebrick'
| 'floralwhite'
| 'forestgreen'
| 'fuchsia'
| 'gainsboro'
| 'ghostwhite'
| 'gold'
| 'goldenrod'
| 'gray'
| 'green'
| 'greenyellow'
| 'grey'
| 'honeydew'
| 'hotpink'
| 'indianred'
| 'indigo'
| 'ivory'
| 'khaki'
| 'lavender'
| 'lavenderblush'
| 'lawngreen'
| 'lemonchiffon'
| 'lightblue'
| 'lightcoral'
| 'lightcyan'
| 'lightgoldenrodyellow'
| 'lightgray'
| 'lightgreen'
| 'lightgrey'
| 'lightpink'
| 'lightsalmon'
| 'lightseagreen'
| 'lightskyblue'
| 'lightslategray'
| 'lightslategrey'
| 'lightsteelblue'
| 'lightyellow'
| 'lime'
| 'limegreen'
| 'linen'
| 'magenta'
| 'maroon'
| 'mediumaquamarine'
| 'mediumblue'
| 'mediumorchid'
| 'mediumpurple'
| 'mediumseagreen'
| 'mediumslateblue'
| 'mediumspringgreen'
| 'mediumturquoise'
| 'mediumvioletred'
| 'midnightblue'
| 'mintcream'
| 'mistyrose'
| 'moccasin'
| 'navajowhite'
| 'navy'
| 'oldlace'
| 'olive'
| 'olivedrab'
| 'orange'
| 'orangered'
| 'orchid'
| 'palegoldenrod'
| 'palegreen'
| 'paleturquoise'
| 'palevioletred'
| 'papayawhip'
| 'peachpuff'
| 'peru'
| 'pink'
| 'plum'
| 'powderblue'
| 'purple'
| 'rebeccapurple'
| 'red'
| 'rosybrown'
| 'royalblue'
| 'saddlebrown'
| 'salmon'
| 'sandybrown'
| 'seagreen'
| 'seashell'
| 'sienna'
| 'silver'
| 'skyblue'
| 'slateblue'
| 'slategray'
| 'slategrey'
| 'snow'
| 'springgreen'
| 'steelblue'
| 'tan'
| 'teal'
| 'thistle'
| 'tomato'
| 'turquoise'
| 'violet'
| 'wheat'
| 'white'
| 'whitesmoke'
| 'yellow'
| 'yellowgreen';
