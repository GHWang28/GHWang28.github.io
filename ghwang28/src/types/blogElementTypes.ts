import React from 'react';
import { QuizOptions } from '.';

type BlogElement = OtherElementType | TextElementType | CodeElementType | QuizElementType;

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

export default BlogElement;
