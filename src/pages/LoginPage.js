import { Link } from "react-router-dom";
import styled from 'styled-components';

// 로그인 영역
const LoginDiv = styled.div`
width: 95%;
max-width: 600px;
height: auto;
margin: 4rem auto 0;
overflow: hidden;
background-color: white;
padding: 40px;
border-radius: 20px;
`;

// 로그인 영역 제목
const LoginDivTitle = styled.div`
height: 12rem;
font-size: 1.8rem;
font-weight: lighter;
display: flex;
align-items: center;
justify-content: center;
`;

// 아이디, 비밀번호 입력 영역
const InsertDiv = styled.div`
margin: 30px auto;
width: 400px;
text-align: center;
`;

// 아이디, 비밀번호 입력칸
const InputField = styled.input`
  border: none;
  border-bottom: 2px solid #289AFF;
`;

// 로그인 버튼
const LoginButton = styled.button`
  margin-top: 5px;
  width: 100px;
  height: 25px;
  border-radius: 5px;
  border-color: #289AFF;
  background-color: #289AFF;
  color: white;
`;

// 회원가입 버튼
const SignupButton = styled.button`
  margin-top: 30px;
  width: 100px;
  height: 25px;
  border-radius: 5px;
  border-color: #289AFF;
  background-color: #289AFF;
  color: white;
`;

function LoginPage() {
    return (
      <LoginDiv>
        <LoginDivTitle>로그인</LoginDivTitle>
        <InsertDiv>
          <InputField type="text" placeholder="아이디"/>
          <br />
          <InputField type="password" placeholder="비밀번호"/>
          <br />
            <Link to="/home">
              <LoginButton type="submit">로그인</LoginButton>
            </Link>
            <Link to="/signup">
              <SignupButton type="submit">회원가입</SignupButton>
            </Link>
        </InsertDiv>
      </LoginDiv>
    );
};

export default LoginPage;