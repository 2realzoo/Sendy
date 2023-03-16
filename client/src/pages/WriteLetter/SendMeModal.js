import React, { useEffect, useState } from "react";
import * as W from "./WriteStyled";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import RoundButton from "../commons/RoundButton";

function SendMeModal({ sendMe, setSendMe }) {
  const [selectedDate, setSelectedDate] = useState({
    Date: null,
    hour: null,
    minutes: null,
  });
  const currentYear = new Date().getFullYear();
  const currentMonth = ("00" + (new Date().getMonth() + 1)).slice(-2);
  const currentDay = ("00" + new Date().getDay()).slice(-2);
  const currentHour = new Date().getHours();
  const currentMinutes = new Date().getMinutes();
  let hourArr = [];
  let makeHourArr = () => {
    for (let i = 0; i < 24; i++) {
      hourArr.push(i);
    }
  };
  makeHourArr();
  const minutesArr = [0, 15, 30, 45];
  const findCloseMinutes = (currentMinutes) => {
    let i = 0;
    while (i < minutesArr.length - 1) {
      if (minutesArr[i] >= currentMinutes) {
        return minutesArr[i];
      }
      i++;
    }
  };
  const afterCloseMinutes = findCloseMinutes(currentMinutes);
  const findCloseHour = () => {
    if (afterCloseMinutes === 0) {
      return currentHour + 1;
    }
    return currentHour;
  };
  let afterCloseHour = findCloseHour();

  const handleCloseModal = () => {
    setSendMe(false);
  };

  const handleChangeTime = (e) => {
    switch (e.target.name) {
      case "hour":
        setSelectedDate({ ...selectedDate, hour: e.target.value });
        break;
      case "minutes":
        setSelectedDate({ ...selectedDate, minutes: e.target.value });
        break;
      default:
        break;
    }
  };

  return (
    <W.ModalWrapper>
      <W.ModalTitle>예약시간</W.ModalTitle>
      <W.TimeBoxWrapper>
        <W.DateBox>
          {`${currentYear}.${currentMonth}.${currentDay}`}
          <MdOutlineKeyboardArrowDown />
        </W.DateBox>
        <W.TimeBox name="hour" onClick={handleChangeTime}>
          {hourArr.map((el) => {
            if (el === afterCloseHour) {
              return (
                <W.TimeOption
                  selected
                  key={`hour${el}`}>{`${el}시`}</W.TimeOption>
              );
            }
            return <W.TimeOption key={`hour${el}`}>{`${el}시`}</W.TimeOption>;
          })}
        </W.TimeBox>

        <W.TimeBox name="minutes" onClick={handleChangeTime}>
          {minutesArr.map((el, idx) => {
            if (el === afterCloseMinutes) {
              return (
                <W.TimeOption
                  selected
                  key={`minutes${idx}`}>{`${el}분`}</W.TimeOption>
              );
            }
            return (
              <W.TimeOption key={`minutes${el}`}>{`${el}분`}</W.TimeOption>
            );
          })}
        </W.TimeBox>
      </W.TimeBoxWrapper>
      <W.ReservationText>
        <div>예약시간을 기준으로 나에게 편지가 발송됩니다.</div>
        <div>편지 발송 알림은 마이페이지에서 확인할 수 있습니다.</div>
      </W.ReservationText>
      <W.ButtonContainer>
        <W.ButtonWrapper id="sendMeModalButton">
          <RoundButton onClick={handleCloseModal}>취소</RoundButton>
          <RoundButton backgroundColor="#A5EF8A">확인</RoundButton>
        </W.ButtonWrapper>
      </W.ButtonContainer>
    </W.ModalWrapper>
  );
}

export default SendMeModal;
