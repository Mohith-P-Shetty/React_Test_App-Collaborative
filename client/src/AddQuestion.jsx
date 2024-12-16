import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const AddQuestion = () => {
  const [formData, setFormData] = useState({
    questionId: "",
    jobAppliedFor: "",
    category: "",
    question: "",
    options: ["", "", "", ""],
    correctOption: "",
    image: null,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("option")) {
      const optionIndex = parseInt(name.split("-")[1], 10);
      const newOptions = [...formData.options];
      newOptions[optionIndex] = value;
      setFormData({ ...formData, options: newOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      questionId,
      jobAppliedFor,
      category,
      question,
      options,
      correctOption,
      image,
    } = formData;

    // Validate form fields
    if (
      !questionId ||
      !jobAppliedFor ||
      !category ||
      !question ||
      !options.includes(correctOption)
    ) {
      setError("Please fill in all fields correctly.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("questionId", questionId);
    formDataToSend.append("jobAppliedFor", jobAppliedFor);
    formDataToSend.append("category", category);
    formDataToSend.append("question", question);
    options.forEach((option, idx) =>
      formDataToSend.append(`options[${idx}]`, option)
    );
    formDataToSend.append("correctOption", correctOption);
    if (image) formDataToSend.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:2000/api/questions/question",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response);

      setSuccess(true);
      setError(null);
      setFormData({
        questionId: "",
        jobAppliedFor: "",
        category: "",
        question: "",
        options: ["", "", "", ""],
        correctOption: "",
        image: null,
      });
    } catch (err) {
      setError("Error creating question");
      console.error(err);
    }
  };

  return (
    <div className="add-question-container">
      <h2>Add New Question</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Question added successfully!</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="questionId">
          <Form.Label>Question ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter question ID"
            name="questionId"
            value={formData.questionId}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="jobAppliedFor">
          <Form.Label>Job Applied For</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter job name"
            name="jobAppliedFor"
            value={formData.jobAppliedFor}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category (e.g., Math, Analytical)"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="question">
          <Form.Label>Question</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the question"
            name="question"
            value={formData.question}
            onChange={handleChange}
          />
        </Form.Group>

        {formData.options.map((option, index) => (
          <Form.Group key={index} controlId={`option-${index}`}>
            <Form.Label>Option {index + 1}</Form.Label>
            <Form.Control
              type="text"
              placeholder={`Enter option ${index + 1}`}
              name={`option-${index}`}
              value={option}
              onChange={handleChange}
            />
          </Form.Group>
        ))}

        <Form.Group controlId="correctOption">
          <Form.Label>Correct Option</Form.Label>
          <Form.Control
            as="select"
            name="correctOption"
            value={formData.correctOption}
            onChange={handleChange}
          >
            <option value="">Select correct option</option>
            {formData.options.map((option, index) => (
              <option key={index} value={option}>
                Option {index + 1}: {option}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Image (optional)</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Question
        </Button>
      </Form>
    </div>
  );
};

export default AddQuestion;
