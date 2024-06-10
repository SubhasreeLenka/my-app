import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { coursesCard } from "../../dummydata"; // Ensure this path is correct
import './c.css';
import './courses.css';
import Certificate from './Certificate'; // Import the Certificate component

const CoursePage = () => {
  const { id } = useParams();
  const course = coursesCard.find(course => course.id === parseInt(id));
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  if (!course) {
    return <div>Course not found</div>;
  }

  const handleAnswerChange = (questionIndex, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option
    });
  };

  const handleSubmit = () => {
    let score = 0;
    course.exam.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        score += 1;
      }
    });
    setScore(score);
    setShowResults(true);

    if (score >= course.exam.questions.length * 0.7) { // Assuming 70% is the passing mark
      setCompleted(true);
      localStorage.setItem(`completedCourse_${id}`, true); // Save completion status
    }
  };

  return (
    <div className='course-page'>
      <h1 className="course-name">{course.coursesName}</h1>
      <img className="course-cover" src={course.cover} alt={course.coursesName} />
      <p className="course-description">{course.description}</p>
      
      <h2 className="section-title">Course Videos</h2>
      <div className='video-list'>
        {course.youtubeLinks.map((link, index) => (
          <div key={index} className='video-item'>
            <iframe 
              width="560" 
              height="315" 
              src={link.replace("watch?v=", "embed/")} 
              title={`YouTube video player ${index}`} 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>

      <h2 className="section-title">Course Materials</h2>
      <div className='pdf-list'>
        {course.pdfLinks.map((link, index) => (
          <div key={index} className='pdf-item'>
            <a href={link} target='_blank' rel='noopener noreferrer' className="pdf-link">
              Download PDF {index + 1}
            </a>
          </div>
        ))}
      </div>

      <h2 className="section-title">Exam</h2>
      <div className='exam-section'>
        {course.exam.questions.map((question, index) => (
          <div key={index} className='exam-question'>
            <p>{question.question}</p>
            {question.options.map((option, optIndex) => (
              <div key={optIndex} className='exam-option'>
                <input
                  type="radio"
                  id={`question-${index}-option-${optIndex}`}
                  name={`question-${index}`}
                  value={option}
                  checked={selectedAnswers[index] === option}
                  onChange={() => handleAnswerChange(index, option)}
                />
                <label htmlFor={`question-${index}-option-${optIndex}`}>{option}</label>
              </div>
            ))}
          </div>
        ))}
        <button onClick={handleSubmit} className='submit-btn'>Submit</button>
      </div>

      {showResults && (
        <div className='results-section'>
          <h2 className="section-title">Results</h2>
          <p>Your score: {score} / {course.exam.questions.length}</p>
          {completed && <p>Congratulations! You have completed the course.</p>}
        </div>
      )}

      {/* Add Certificate component */}
      {completed && <Certificate courseName={course.coursesName} userName="Your Name" />}
    </div>
  );
};

export default CoursePage;
