import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

const InformationSection = () => {
  //   const [selectedSection, setSelectedSection] = useState('Aptitude'); // Track selected section
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status

  // Define questions under different sections
  const sections = {
    Aptitude: [
      { questionNumber: 1 },
      { questionNumber: 2 },
      { questionNumber: 3 },
    ],
    Verbal: [
      { questionNumber: 1 },
      { questionNumber: 2 },
      { questionNumber: 3 },
    ],
  };

  //   const handleSectionChange = (section) => {
  //     setSelectedSection(section);
  //     setIsSubmitted(false); // Reset submission status when changing sections
  //   };

  const handleSubmit = () => {
    alert("Quiz Submitted!");
    setIsSubmitted(true);
  };

  return (
    <div>
      <h3>Question Info</h3>
      <p>Additional information about the question goes here.</p>

      <div className="accordion" id="accordionExample">
        {/* Loop through sections and render an accordion for each */}
        {Object.keys(sections).map((section, sectionIndex) => (
          <div className="accordion-item" key={sectionIndex}>
            <h2 className="accordion-header" id={`heading${section}`}>
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`collapse${section}`}
                aria-expanded="true"
                aria-controls={`collapse${section}`}
              >
                {section} {/* Section name (Aptitude, Verbal) */}
              </button>
            </h2>
            <div
              id={`collapse${section}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${section}`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                {/* Loop through questions for this section */}
                {sections[section].map((question, questionIndex) => (
                  <p key={questionIndex}>Question {question.questionNumber}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit button for the entire quiz */}
      {!isSubmitted && (
        <button className="btn btn-success m-2" onClick={handleSubmit}>
          Submit
        </button>
      )}

      {isSubmitted && <p>Thank you for submitting!</p>}
    </div>
  );
};

export default InformationSection;
