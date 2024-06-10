import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./hero1.css";
import Title from '../../common/title/Title';

const Hero = () => {
  const navigate = useNavigate(); // Get the navigate function

  const handleGetStartedClick = () => {
    // Navigate to the signup page when "GET STARTED NOW" button is clicked
    navigate('/signup');
  };

  const handleViewCourseClick = () => {
    // Navigate to the courses page when "VIEW COURSE" button is clicked
    navigate('/courses');
  };

  return (
    <>
      <section className='hero'>
        <div className="container">
          <div className="row">
            <Title subtitle='WELCOME TO ACADEMIA' title='Best Online Education Platform' />
            <p>Academia is a dynamic online learning platform offering a vast array of courses across various disciplines. It provides interactive and engaging educational experiences through video lectures, interactive quizzes, and practical assignments. Catering to diverse learning styles, Academia features content from world-renowned instructors and institutions. The platform supports community interaction through discussion forums and peer reviews, fostering collaborative learning. Personalized learning paths and progress tracking help users achieve their academic goals. With flexible access on multiple devices, Academia empowers learners to gain new skills and knowledge at their own pace, anytime and anywhere.</p>            
          </div>
        </div>
      </section>
      <div className="margin"></div>
    </>
  );
}

export default Hero;
