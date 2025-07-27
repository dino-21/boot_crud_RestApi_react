import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function MemberList() {
  // 회원 목록 상태
  const [members, setMembers] = useState([]);

  // 현재 페이지 번호와 전체 페이지 수를 담는 상태
  const [pageInfo, setPageInfo] = useState({ number: 0, totalPages: 0 });

  // 현재 페이지 번호만 따로 관리 (페이지 버튼 클릭 시 변경)
  const [currentPage, setCurrentPage] = useState(0);

  // currentPage 값이 변경될 때마다 회원 목록을 가져옴
  useEffect(() => {
    fetchPage(currentPage);
  }, [currentPage]);

  // 특정 페이지 번호에 해당하는 회원 목록 요청
  const fetchPage = (page) => {
    axios
      .get(`http://localhost:8080/api/members?page=${page}&size=3`)
      .then((res) => {
        setMembers(res.data.content);
        setPageInfo({
          number: res.data.number,
          totalPages: res.data.totalPages,
        });
      });
  };

  // 페이지 버튼 클릭 시 해당 페이지로 이동
  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  // 회원 삭제 기능
  const handleDelete = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(`http://localhost:8080/api/members/${id}`)
        .then(() => {
          alert("삭제 완료!");
          fetchPage(currentPage); // 현재 페이지를 다시 로드
        })
        .catch((err) => {
          console.error("삭제 에러:", err);
          alert("삭제 중 오류가 발생했습니다.");
        });
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>회원 목록</h2>
        <Link to="/new">
          <Button variant="primary">+ 새 회원 등록</Button>
        </Link>
      </div>

      <Table striped bordered hover responsive className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>AGE</th>
            <th>PHONE</th>
            <th>ADDRESS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.age}</td>
              <td>{member.phone}</td>
              <td>{member.address}</td>
              <td>
                <Link to={`/edit/${member.id}`}>
                  <Button size="sm" variant="warning" className="me-2">
                    수정
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(member.id)}
                >
                  삭제
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* 페이지 번호 */}
      <div className="d-flex justify-content-center mt-3">
        {Array.from({ length: pageInfo.totalPages }, (_, i) => (
          <Button
            key={i}
            variant={i === pageInfo.number ? "dark" : "outline-dark"}
            className="mx-1"
            onClick={() => handlePageClick(i)}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default MemberList;
