import React from 'react';
import { QuizOptions } from '.';

type BlogElement = OtherElementType | TextElementType | CodeElementType | QuizElementType | AsIsElement;

type TextElementType = {
  type: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  children: React.ReactNode | string
}

type CodeElementType = {
  type: 'code',
  language: string,
  children: string,
  title?: string
}

type QuizElementType = {
  type: 'quiz',
  question: string,
  options: QuizOptions[]
}

type OtherElementType = {
  type: 'signoff' | 'feedback'
}

type AsIsElement = {
  type: 'as-is',
  children: React.ReactNode,
}

export default BlogElement;
