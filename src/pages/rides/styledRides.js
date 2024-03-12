// StyledComponents.js
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
`;

export const EventContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 55vw;
    max-width: 700px;
    max-height: 90%;
    z-index: 1000;
`;

export const EventAlignContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 2rem;
`;

export const Title = styled.h1`
    font-size: 3rem;
    margin-bottom: 0.6rem;
    margin-top: 0rem;
    font-family: 'Outfit';
`;

export const Label = styled.label`
    display: block;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    color: #262626;
    font-weight: bold;
    font-size: 1.2rem;
    font-family: 'Outfit';
`;

export const PopupLabel = styled.label`
    display: block;
    margin-top: 0rem;
    margin-bottom: 0.25rem;
    color: #262626;
    font-weight: bold;
    font-size: 2.5rem;
    font-family: 'Outfit';
`;

export const PopupSubLabel = styled.label`
    display: block;
    margin-top: 0rem;
    margin-bottom: 0.25rem;
    color: #262626;
    font-size: 1.5rem;
    font-family: 'Outfit';
`;

export const StyledSelect = styled.select`
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    color: #333;
    font-size: 1.2rem;
    font-family: 'Outfit';
`;

export const DatePickerStyled = styled(DatePicker)`
    width: 95%;
    padding: 0.5rem;
    margin: 0.5rem 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    color: #333;
    font-size: 1.2rem;
    font-family: 'Outfit';
`;

export const Button = styled.button`
    background-color: #031d39;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 10px;
    font-size: 1.2rem;
    font-family: 'Outfit';
    width: 275px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #021326;
        color: #ffc52d;
    }
`;

export const EventPopupButton = styled.button`
    background-color: #031d39;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 10px;
    font-size: 1.2rem;
    font-family: 'Outfit';
    width: 175px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #021326;
        color: #ffc52d;
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 0.25rem;
`;

export const CenterContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 5rem;
`;
export const MemberLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
