import React from "react";
import { Link } from "react-router-dom";
import "./courses.css";
import { coursesCard } from "../../dummydata";

const CoursesCard = () => {
  return (
    <section className='coursesCard'>
      <div className='container grid2'>
        {coursesCard.map((val) => (
          <div className='items' key={val.id}>
            <div className='content flex'>
              <div className='left'>
                <div className='img'>
                  <img src={val.cover} alt={val.coursesName} />
                </div>
              </div>
              <div className='text'>
                <h1>{val.coursesName}</h1>
                <div className='rate'>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <label htmlFor=''>({val.rating})</label>
                </div>
                <div className='details'>
                  {val.courTeacher.map((details, index) => (
                    <div className='box' key={index}>
                      <div className='dimg'>
                        <img src={details.dcover} alt={details.name} />
                      </div>
                      <div className='para'>
                        <h4>{details.name}</h4>
                      </div>
                      <span>{details.totalTime}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='price'>
              <h3>
                {val.priceAll} / {val.pricePer}
              </h3>
            </div>
            <Link to={`/course/${val.id}`} className='outline-btn'>
              Go to Course
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoursesCard;
