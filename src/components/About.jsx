import React from 'react';
import ReactMarkdown from 'react-markdown';
import Navbar from './Navbar';

const About = () => {
  const readmeContent = `
# Reboot01 Learner Dashboard

This project served an introduction to Front-end Frameworks. I've chosen React to introduce myself to the basic concepts within the JS dev eco-system.

This project has helped me learn:

**Basic concepts such as:**
- Component design
- State Management
- CSS libraries (bootstrapCSS)
`;

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div style={{ textAlign: 'left', margin: '20px' }}>
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    </>
  );
};

export default About;
