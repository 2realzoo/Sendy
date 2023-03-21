import React, { useState } from "react";
import * as M from "./PwdChangeStyled";
import {
  AiOutlineArrowRight,
  AiOutlineEnter,
  AiOutlineLock,
} from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import GNB from "./GNB";

function PwdChange() {
  const navigate = useNavigate();
  const [next, setNext] = useState(2);
  const { page } = useParams();
  const handleNext = () => {
    setNext(next + 1);
    navigate(`/pwdchange/${next}`);
  };

  const formSchma = yup.object({
    password: yup
      .string()
      .required("영문 소문자, 숫자, 특수문자를 포함한 8~16자리를 입력해주세요.")
      .min(8, "최소 8자리 이상 입력해주세요.")
      .max(16, "최대 16자까지 가능합니다.")
      .matches(
        /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/,
        "영문 소문자, 숫자, 특수문자를 포함한 8~16자리를 입력해주세요."
      ),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다."),
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(formSchma) });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    console.log(data);
  };

  return (
    <M.PwdChangeWrap>
      <GNB />
      <M.PwdChangeContainer>
        <M.CardBox />
        {page !== "3" && (
          <M.PwdChangeContents>
            <M.UserBox>
              <M.UserImg />
              <M.UserName>김햄찌</M.UserName>
            </M.UserBox>
            <M.PwdBox>
              <M.PwdChangeTitle>Password</M.PwdChangeTitle>
              {page === undefined && (
                <M.InputContainer>
                  <M.Explain>
                    비밀번호 변경을 위해 <br /> 기존 비밀번호 확인이 필요합니다.
                  </M.Explain>
                  <M.PwdForm>
                    <AiOutlineLock />
                    <M.PwdInput
                      type="password"
                      name="password"
                      placeholder="password"
                      {...register("password")}
                    />
                    <AiOutlineEnter />
                  </M.PwdForm>
                  <M.ErrorMsg>비밀번호를 틀렸습니다.</M.ErrorMsg>
                  <AiOutlineArrowRight className="next" onClick={handleNext} />
                </M.InputContainer>
              )}
              {page === "2" && (
                <M.InputContainer>
                  <M.PwdLabel>Password</M.PwdLabel>
                  <M.PwdForm>
                    <M.PwdInput
                      name="password"
                      type="password"
                      {...register("password")}
                    />
                  </M.PwdForm>
                  {errors.password && (
                    <M.ErrorMsg>{errors.password.message}</M.ErrorMsg>
                  )}
                  <M.PwdLabel>Password Confirm</M.PwdLabel>
                  <M.PwdForm>
                    <M.PwdInput
                      type="password"
                      name="passwordConfirm"
                      {...register("passwordConfirm")}
                    />
                  </M.PwdForm>
                  {errors.passwordConfirm && (
                    <M.ErrorMsg>{errors.passwordConfirm.message}</M.ErrorMsg>
                  )}
                  <M.ButtonBox>
                    <M.Button onClick={handleNext}>확인</M.Button>
                  </M.ButtonBox>
                </M.InputContainer>
              )}
            </M.PwdBox>
          </M.PwdChangeContents>
        )}
        {page === "3" && (
          <M.SuccessWrap>
            <M.SuccessContainer>
              <M.SuccessImg
                className="suc1"
                src={require("../../asset/뽀시래기/보라 뽀시래기.png")}
                alt=""
              />
              <M.SuccessImg
                className="suc2"
                src={require("../../asset/뽀시래기/빨주노 뽀시래기.png")}
                alt=""
              />
              <M.SuccessImg
                className="suc3"
                src={require("../../asset/뽀시래기/초록 뽀시래기.png")}
                alt=""
              />
              <M.SuccessImg
                className="suc4"
                src={require("../../asset/뽀시래기/파랑 뽀시래기.png")}
                alt=""
              />
              <M.SuccessImg
                className="suc5"
                src={require("../../asset/뽀시래기/핑크 뽀시래기.png")}
                alt=""
              />
              <M.SuccessImg
                className="suc6"
                src={require("../../asset/뽀시래기/핑크 여러개 뽀시래기.png")}
                alt=""
              />
              <M.SuccessImg
                className="suc7"
                src={require("../../asset/뽀시래기/하트 뽀시래기.png")}
                alt=""
              />
              <M.SuccessTitle>비밀번호 변경 완료</M.SuccessTitle>
              <M.SuccessContent>
                비밀번호 변경이 완료되었습니다.
                <br />
                로그인 페이지에서 로그인 해주세요.
              </M.SuccessContent>
              <Link to="/login">
                <M.SuccessButton>Log in</M.SuccessButton>
              </Link>
            </M.SuccessContainer>
          </M.SuccessWrap>
        )}
      </M.PwdChangeContainer>
    </M.PwdChangeWrap>
  );
}

export default PwdChange;
