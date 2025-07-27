import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NewMemberForm = () => {
  // 입력값 상태 초기화 (name, age, phone, address)
  const [member, setMember] = useState({
    name: "",
    age: "",
    phone: "",
    address: "",
  });

  // 저장 후 페이지 이동용
  const navigate = useNavigate();

  // 입력 필드 변경 시 상태 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prev) => ({ ...prev, [name]: value }));
  };

  // 폼 제출 시 처리
  const handleSubmit = (e) => {
    e.preventDefault();

    // 이름 정규표현식: 한글 3~5자
    const nameRegex = /^[가-힣]{3,5}$/;
    if (!nameRegex.test(member.name.trim())) {
      alert("이름은 한글 3~5글자로 입력하세요.");
      return;
    }

    // 나이: 숫자이며 0~100 범위인지 확인
    const age = Number(member.age);
    if (isNaN(age) || age < 0 || age > 100) {
      alert("나이는 0부터 100 사이의 숫자로 입력하세요.");
      return;
    }

    // 전화번호 정규식: 010-0000-0000 형식
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(member.phone.trim())) {
      alert("전화번호는 010-0000-0000 형식으로 입력하세요.");
      return;
    }

    // 주소 공백 검사
    if (!member.address.trim()) {
      alert("주소를 입력하세요.");
      return;
    }

    // 모든 유효성 통과 후 서버로 전송
    axios
      .post("http://localhost:8080/api/members", member) // 백엔드로 POST 요청
      .then(() => {
        alert("저장 완료!");
        navigate("/"); // 리스트 화면으로 이동
      })
      .catch((error) => {
        console.error("저장 실패:", error);
        alert("저장 실패");
      });
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">새 회원 등록</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formName">
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="name"
              value={member.name}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formAge">
          <Form.Label column sm={2}>
            Age
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              name="age"
              value={member.age}
              onChange={handleChange}
              placeholder="나이를 입력하세요"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPhone">
          <Form.Label column sm={2}>
            Phone
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="phone"
              value={member.phone}
              onChange={handleChange}
              placeholder="전화번호를 입력하세요"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formAddress">
          <Form.Label column sm={2}>
            Address
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="address"
              value={member.address}
              onChange={handleChange}
              placeholder="주소를 입력하세요"
              required
            />
          </Col>
        </Form.Group>

        <div className="text-end">
          <Button variant="primary" type="submit">
            저장
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default NewMemberForm;
