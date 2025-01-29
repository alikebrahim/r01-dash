import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Navbar from './Navbar';

const About = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    console.log("Fetching Markdown...");
    fetch('/README.md')
      .then((response) => response.text())
      .then((text) => {
        setMarkdown(text);
      })
      .catch((error) => {
        console.error('Error fetching Markdown:', error);
        setMarkdown('# Error\nFailed to load the content.');
      });
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div style={{ textAlign: 'left', margin: '20px' }}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </>
  );
};

export default About;
