import React from 'react';
import './Home.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Navbar from "./Home/Navbar"
import "./Home/card.css"
import { useSpring, animated } from 'react-spring';

import Images from './assets/6.jpg'
import Imag from './assets/1.jpg'
import Images1 from './assets/4.jpg'
import Images2 from './assets/2.jpg'
import Images3 from './assets/3.jpg'
import Images4 from './assets/5.jpg'
import ImagesApp from './assets/f.png'
import ImagesApp1 from "./assets/app.png"

const SchoolWebsite = () => {
  const courses = [
    { id: 1, title: 'Mathematics', description: 'Learn the magic of numbers.' },
    { id: 2, title: 'Science', description: 'Explore the wonders of the universe.' },
    { id: 3, title: 'History', description: 'Unravel the stories of the past.' },
    { id: 4, title: 'Hindi', description: 'Express yourself through words.' },
    { id: 5, title: 'English', description: 'Explore the wonders of the universe.' },
  
    { id: 6, title: 'Language Arts', description: 'Express yourself through words.' },
  ];
  const work = [
    { id: 1, title: 'Mathematics', description: 'Learn the magic of numbers.', img:Images1 },
    { id: 2, title: 'Science', description: 'Explore the wonders of the universe.', img:Images3 },
 
  ];
  const FadeInSection = ({ children }) => {
    const props = useSpring({ opacity: 1, from: { opacity: 0 } });
    return <animated.div style={props}>{children}</animated.div>;
  };
  return (
    <div className="school-website">
        <Navbar/>
        
      <FadeInSection>
      <header >
       <div className='headert'>
         <h1>Welcome to Our School</h1>
        <p>Empowering students to achieve their dreams.</p>
        </div>
       
      </header>
      </FadeInSection>


<section className='card'>

          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </div>
          ))}
    </section>

       <section className="about-us">
    <div className='aboutp'>
    {/* <div className='point2'></div> */}
      <div className='point'>
   
      <h2>About Us</h2>
      </div>
      <div className='point2'></div>
{/*    
    <h2>About Us</h2> */}
  
  <h1 className='heading'>Super Kids Public School</h1>
  <p className='detail'>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel libero id mi
    rhoncus egestas. Suspendisse potenti. Sed vestibulum ante sit amet neque blandit
  </p>
  <p className='detail'>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel libero id mi
    rhoncus egestas. Suspendisse potenti. Sed vestibulum ante sit amet neque blandit, et
    consectetur lorem efficitur.
 
  </p>
  <h3 className='subtitle'>Address: 1234 School Gwalior, Madhya Pradesh, India</h3>
  
    </div>
        <img
          src={Images}
          alt="School Building"
          className="about-us-image"
        />
   
        
      </section>

      
      <section className="admissions">
         {/* <img
        src={Images3}
        alt="School Building"
        className="imga"
      /> */}
      <h1 className='add'>
        Admission Open 2023-2024
      </h1>
      <p>
          We are now accepting applications for the upcoming school year. Don't miss the
          opportunity to join our diverse and inclusive community.
        </p>

<ul>
  <li>
  Technological Education
  </li>
  <li>
  Sports & Extra Curriculums
  </li>
  <li>
  Frequent monitoring of Learning and Teaching
  </li>
  <li>
  Life Skills Development
  </li>
  <li>
  Security Measures
  </li>
  <li>
  Curriculum
  </li>
</ul>

       
      </section>
      <section className='section3'>
      <img
          src={Images2}
          alt="School Building"
          className="img"
        />
        <div className='q1'>
        <h2>Inspirational School Quotes</h2>
        <p>"Knowledge is power.<br/> Information is liberating.<br/> Education is the premise of progress, <br/>in every society, in every family"</p>
        <h4>-Super Kids Public School</h4>
        </div>
      </section>
  
      {/* <img
        src={Images2}
        alt="School Building"
        className="img"
      /><img
      src={Images3}
      alt="School Building"
      className="img"
    /> */}

<section className='section4'>
  
<div className='circle4'>
<img
        src={Images4}
        alt="School Building"
        className="imgc4"
      />
  </div>
<div className='circle3'>
<img
        src={Images3}
        alt="School Building"
        className="imgc2"
      />
</div>
<div className='circle2'>
<img
        src={Images1}
        alt="School Building"
        className="imgc1"
      />
</div>
<div className='circle1'>
  
</div>



</section>
    
<section className="admissions">
<div className='app'>
<div>
<h1>Download Our App?</h1>
<p>Download Our New School App! <br>
</br> To connect our school Digital World.</p>
<button className='btn'>Download Now !</button>
</div>
<div className="d">
<img
        src={ImagesApp}
        alt="School Building"
        className="imgapp"
      />
<img
        src={ImagesApp1}
        alt="School Building"
        className="imgapp2"
      />
</div>
     
</div>
</section>

<section className="testimonial-section">
        {/* <h2>Inspiring Testimonials from Teachers</h2>
        <Carousel
          showArrows={true}
          showThumbs={false}
          autoPlay={true}
          infiniteLoop={true}
          interval={5000}
          showStatus={false}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              designation={testimonial.designation}
              content={testimonial.content}
              img={testimonial.imges}
            />
          ))}
        </Carousel> */}
      </section>


<section className='contactf'>
  <div class="contact-container">
    <div class="form-container">
      <h2>Contact Us</h2>
      <form>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</section>

      <footer className='Footer'>
        <p>&copy; {new Date().getFullYear()} Our School. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SchoolWebsite;
