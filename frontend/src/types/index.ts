import React from 'react';

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
  quizIncluded: boolean
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
  text: string,
  correct: boolean,
  explanation: (React.ReactNode | string)[]
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
