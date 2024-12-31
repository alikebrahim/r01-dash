import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Navbar from './Navbar';

const About = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    // Fetch the Markdown file from the public folder or another location
    fetch('/README.md') // Adjust the path to your Markdown file
      .then((response) => response.text())
      .then((text) => {
        setMarkdown(text);
      })
      .catch((error) => {
        console.error('Error fetching Markdown:', error);
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
