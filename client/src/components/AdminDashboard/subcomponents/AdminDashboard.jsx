import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Container, Row, Col, Card, Table, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [totalRegistered, setTotalRegistered] = useState(0);
  // Dummy data for total attendees over the last 7 days
  const attendeesData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Attendees",
        data: [10, 20, 15, 25, 30, 20, 35], // Replace with actual data
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  // Dummy data for attendees list
  const [attendees, setAttendees] = useState([]);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    // Fetch all attendees (users)
    const fetchAttendees = async () => {
      try {
        const response = await axios.get("http://localhost:2000/api/users"); // Make sure this matches your API endpoint
        setTotalRegistered(response.data.users.length);
        setAttendees(response.data.users); // Set the attendees data from response
      } catch (error) {
        console.error("Error fetching attendees:", error);
      }
    };

    fetchAttendees(); // Call the function to fetch the data
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Filtered attendees based on search term
  const filteredAttendees = attendees.filter(
    (attendee) =>
      attendee.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="Cls_Container_AdminDashboard mt-4">
      {/* Title */}
      <h1 className="Cls_H1_Title text-center mb-4 fw-light">
        ADMIN DASHBOARD
      </h1>

      {/* Top row */}
      <Row className="Cls_Row_TopRow mb-4">
        {/* Total attendees */}
        <Col md={6} className="Cls_Col_TotalAttendees">
          <Card className="Cls_Card_Attendees text-center mb-3">
            <Card.Body>
              <Card.Title className="Cls_CardTitle_TotalAttendees">
                Total Attendees
              </Card.Title>
              <Card.Text className="Cls_CardText_TotalAttendees display-4 fw-light">
                150 {/* Replace 150 with dynamic data */}
              </Card.Text>
            </Card.Body>
          </Card>

          {/* Total Registered */}
          <Card className="Cls_Card_TotalRegistered text-center">
            <Card.Body>
              <Card.Title className="Cls_CardTitle_TotalRegistered">
                Total Number of Registered
              </Card.Title>
              <Card.Text className="Cls_CardText_TotalRegistered display-4 fw-light">
                {totalRegistered}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Line chart */}
        <Col md={6} className="Cls_Col_LineChart">
          <Card className="Cls_Card_LineChart">
            <Card.Body>
              <Card.Title className="Cls_CardTitle_LineChart">
                Attendees Over the Week
              </Card.Title>
              <Line data={attendeesData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Attendees list */}
      <Card className="Cls_Card_AttendeesList">
        <Card.Body className="Cls_CardBody_AttendeesList">
          <Card.Title className="Cls_CardTitle_AttendeesList">
            Attendees List
          </Card.Title>

          {/* Search bar */}
          <Form.Control
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="Cls_FormControl_SearchBar mb-3"
          />

          {/* Attendees table */}
          <Table bordered className="Cls_Table_Attendees">
            <thead className="Cls_Thead_Attendees">
              <tr>
                <th className="Cls_Th_Name">Name</th>
                <th className="Cls_Th_Email">Email</th>
              </tr>
            </thead>
            <tbody className="Cls_Tbody_Attendees">
              {filteredAttendees.length > 0 ? (
                filteredAttendees.map((attendee, index) => (
                  <tr key={index} className="Cls_Tr_AttendeeRow">
                    <td className="Cls_Td_Name">{attendee.candidateName}</td>
                    <td className="Cls_Td_Email">{attendee.email}</td>
                  </tr>
                ))
              ) : (
                <tr className="Cls_Tr_NoAttendees">
                  <td colSpan="2" className="Cls_Td_NoAttendees text-center">
                    No attendees found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminDashboard;
