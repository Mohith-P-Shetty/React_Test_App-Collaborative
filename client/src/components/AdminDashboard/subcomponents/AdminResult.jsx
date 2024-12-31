import { useState } from "react";

const AdminResult = () => {
  const results = [
    { id: 1, name: "John Doe", jobApplied: "Software Engineer", date: "2024-12-01", score: "85" },
    { id: 2, name: "Jane Smith", jobApplied: "Data Scientist", date: "2024-12-02", score: "90" },
    { id: 3, name: "Sam Wilson", jobApplied: "UX Designer", date: "2024-12-03", score: "78" },
    { id: 4, name: "Emily Davis", jobApplied: "Project Manager", date: "2024-12-04", score: "92" },
  ];

  const [nameFilter, setNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [jobFilter, setJobFilter] = useState("");

  // Handle restricted input for Date
  const handleDateKeyDown = (event) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "-",
      "/",
    ];
    const isNumber = event.key >= "0" && event.key <= "9";

    if (!isNumber && !allowedKeys.includes(event.key)) {
      event.preventDefault(); // Block invalid keys
    }
  };

  // Filtered results
  const filteredResults = results.filter(
    (result) =>
      result.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      result.date.includes(dateFilter) &&
      result.jobApplied.toLowerCase().includes(jobFilter.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center">Test Results</h2>

      {/* Results table */}
      <table
  className="table table-bordered table-hover mt-4"
  style={{ border: "3px solid black" }}
>        <thead>
          <tr>
            <th>Sl.No</th>
            <th>
              Name
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Search Name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </th>
            <th>
              Job Applied
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Search Job Applied"
                value={jobFilter}
                onChange={(e) => setJobFilter(e.target.value)}
              />
            </th>
            <th>
              Date
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Search Date (YYYY-MM-DD)"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                onKeyDown={handleDateKeyDown} // Restrict invalid input
              />
            </th>
            <th>Score</th>
            <th>Report</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.length > 0 ? (
            filteredResults.map((result, index) => (
              <tr key={result.id}>
                <td>{index + 1}</td>
                <td>{result.name}</td>
                <td>{result.jobApplied}</td>
                <td>{result.date}</td>
                <td>{result.score}</td>
                <td>
                  <button className="btn btn-secondary">REPORT</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminResult;