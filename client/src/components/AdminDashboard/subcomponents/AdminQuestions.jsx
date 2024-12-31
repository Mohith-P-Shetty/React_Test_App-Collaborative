import { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import questions from "./questions.json"; // Import the JSON file

function AdminQuestions() {
  const [questionsList, setQuestionsList] = useState(questions);
  const [filteredQuestions, setFilteredQuestions] = useState(questions);

  const [selectedJobRoleFilter, setSelectedJobRoleFilter] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editModeQuestion, setEditModeQuestion] = useState(null);

  // States for Add Modal
  const [newJobRole, setNewJobRole] = useState("");
  const [addNewJobRole, setAddNewJobRole] = useState(false);
  const [selectedJobRole, setSelectedJobRole] = useState("");

  const [newCategory, setNewCategory] = useState("");
  const [addNewCategory, setAddNewCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", "", "", ""]);
  const [newCorrectOption, setNewCorrectOption] = useState("");

  // Handle filtering
  const handleFilterChange = () => {
    let filtered = questions;
    if (selectedJobRoleFilter) {
      filtered = filtered.filter((q) => q.jobAppliedFor === selectedJobRoleFilter);
    }
    if (selectedCategoryFilter) {
      filtered = filtered.filter((q) => q.category === selectedCategoryFilter);
    }
    setFilteredQuestions(filtered);
  };

  // Reset Filters
  const resetFilters = () => {
    setSelectedJobRoleFilter("");
    setSelectedCategoryFilter("");
    setFilteredQuestions(questions);
  };

  // Function to handle option change
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newOptions];
    updatedOptions[index] = value;
    setNewOptions(updatedOptions);
  };

  // Add Question
  const handleAddQuestion = () => {
    const newEntry = {
      id: Date.now(),
      jobAppliedFor: addNewJobRole ? newJobRole : selectedJobRole,
      category: addNewCategory ? newCategory : selectedCategory,
      question: newQuestion,
      options: newOptions,
      correctOption: newCorrectOption,
      image: "", // Placeholder for image
    };

    const updatedQuestions = [...questionsList, newEntry];
    setQuestionsList(updatedQuestions);
    setFilteredQuestions(updatedQuestions); // Update filtered list
    resetAddModal();
  };

  const resetAddModal = () => {
    setShowAddModal(false);
    setNewJobRole("");
    setAddNewJobRole(false);
    setSelectedJobRole("");
    setNewCategory("");
    setAddNewCategory(false);
    setSelectedCategory("");
    setNewQuestion("");
    setNewOptions(["", "", "", ""]);
    setNewCorrectOption("");
  };

  // Edit Question
  const handleEditQuestion = () => {
    const updatedQuestions = questionsList.map((q) =>
      q.id === editModeQuestion.id
        ? {
            ...q,
            question: newQuestion,
            options: newOptions,
            correctOption: newCorrectOption,
          }
        : q
    );

    setQuestionsList(updatedQuestions);
    setFilteredQuestions(updatedQuestions); // Update filtered list
    resetEditModal();
  };

  const resetEditModal = () => {
    setShowEditModal(false);
    setEditModeQuestion(null);
    setNewQuestion("");
    setNewOptions(["", "", "", ""]);
    setNewCorrectOption("");
  };

  // Function to delete a question
  const handleDeleteQuestion = (id) => {
    const updatedQuestions = questionsList.filter((q) => q.id !== id);
    setQuestionsList(updatedQuestions);
    setFilteredQuestions(updatedQuestions); // Update filtered list
  };

  return (
    <div>
      <h2>Admin Questions</h2>

      {/* Filters */}
      <div className="mb-3 d-flex gap-3">
        <Form.Select
          value={selectedJobRoleFilter}
          onChange={(e) => {
            setSelectedJobRoleFilter(e.target.value);
            handleFilterChange();
          }}
        >
          <option value="">Filter by Job Role</option>
          {[...new Set(questionsList.map((q) => q.jobAppliedFor))].map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </Form.Select>

        <Form.Select
          value={selectedCategoryFilter}
          onChange={(e) => {
            setSelectedCategoryFilter(e.target.value);
            handleFilterChange();
          }}
        >
          <option value="">Filter by Category</option>
          {[...new Set(
            questionsList
              .filter((q) => !selectedJobRoleFilter || q.jobAppliedFor === selectedJobRoleFilter)
              .map((q) => q.category)
          )].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Form.Select>

        <Button variant="secondary" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>

      {/* Add Question Button */}
      <Button variant="primary" onClick={() => setShowAddModal(true)}>
        Add Question
      </Button>

      {/* Questions List */}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Options</th>
            <th>Correct Option</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((q, index) => (
            <tr key={q.id}>
              <td>{index + 1}</td>
              <td>{q.question}</td>
              <td>{q.options.join(", ")}</td>
              <td>{q.correctOption}</td>
              <td>
                <Button
                  onClick={() => {
                    setEditModeQuestion(q);
                    setNewQuestion(q.question);
                    setNewOptions(q.options);
                    setNewCorrectOption(q.correctOption);
                    setShowEditModal(true);
                  }}
                  style={{
                    border: '2px solid #333',  // Dark border
                    backgroundColor: 'transparent',  // No background color
                    color: '#333',  // Text color to match the border
                  }}
                >
                  Edit
                </Button>{" "}
                <Button  onClick={() => handleDeleteQuestion(q.id)} style={{
                    border: '2px solid #333',  // Dark border
                    backgroundColor: 'transparent',  // No background color
                    color: '#333',  // Text color to match the border
                  }}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Question Modal */}
      <Modal show={showAddModal} onHide={resetAddModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Job Role */}
            <Form.Group className="mb-3">
              <Form.Label>Job Role</Form.Label>
              {!addNewJobRole ? (
                <>
                  <Form.Select
                    value={selectedJobRole}
                    onChange={(e) => setSelectedJobRole(e.target.value)}
                  >
                    <option value="">Select Job Role</option>
                    {[...new Set(questionsList.map((q) => q.jobAppliedFor))].map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Check
                    type="checkbox"
                    label="Add new job role"
                    onChange={() => setAddNewJobRole(true)}
                  />
                </>
              ) : (
                <Form.Control
                  type="text"
                  placeholder="Enter new job role"
                  value={newJobRole}
                  onChange={(e) => setNewJobRole(e.target.value)}
                />
              )}
            </Form.Group>

            {/* Category */}
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              {!addNewCategory ? (
                <>
                  <Form.Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {[
                      ...new Set(
                        questionsList
                          .filter((q) => q.jobAppliedFor === selectedJobRole)
                          .map((q) => q.category)
                      ),
                    ].map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Check
                    type="checkbox"
                    label="Add new category"
                    onChange={() => setAddNewCategory(true)}
                  />
                </>
              ) : (
                <Form.Control
                  type="text"
                  placeholder="Enter new category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              )}
            </Form.Group>

            {/* Question */}
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
            </Form.Group>

            {/* Options */}
            {newOptions.map((option, index) => (
              <Form.Group className="mb-3" key={index}>
                <Form.Label>Option {index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </Form.Group>
            ))}

            {/* Correct Option */}
            <Form.Group className="mb-3">
              <Form.Label>Correct Option</Form.Label>
              <Form.Select
                value={newCorrectOption}
                onChange={(e) => setNewCorrectOption(e.target.value)}
              >
                <option value="">Select Correct Option</option>
                {newOptions.map((opt, index) => (
                  <option key={index} value={opt}>
                    Option {index + 1}: {opt}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddQuestion}>
            Add Question
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Question Modal */}
      <Modal show={showEditModal} onHide={resetEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Question */}
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
            </Form.Group>

            {/* Options */}
            {newOptions.map((option, index) => (
              <Form.Group className="mb-3" key={index}>
                <Form.Label>Option {index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </Form.Group>
            ))}

            {/* Correct Option */}
            <Form.Group className="mb-3">
              <Form.Label>Correct Option</Form.Label>
              <Form.Select
                value={newCorrectOption}
                onChange={(e) => setNewCorrectOption(e.target.value)}
              >
                <option value="">Select Correct Option</option>
                {newOptions.map((opt, index) => (
                  <option key={index} value={opt}>
                    Option {index + 1}: {opt}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditQuestion}>
            Update Question
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminQuestions;
