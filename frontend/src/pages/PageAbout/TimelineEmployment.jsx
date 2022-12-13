import React from 'react';
import { Timeline } from "@mui/lab";
import generateEmploymentTimeline from './employment';
import TimelineEmploymentItem from './TimelineEmploymentItem';

export default function TimelineEmployment () {
  return (
    <Timeline position="alternate">
      {/* AIE */}
      {generateEmploymentTimeline().map((entry, index) => (
        <TimelineEmploymentItem key={`timeline-entry-${index}`} data={entry} index={index} />
      ))}
    </Timeline>
  )
}