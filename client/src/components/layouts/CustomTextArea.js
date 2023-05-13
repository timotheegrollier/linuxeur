import * as React from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledTextarea = styled(TextareaAutosize)`
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  color: ${({ theme }) => (theme.palette.mode === 'dark' ? grey[300] : grey[900])};
  background: ${({ theme }) => (theme.palette.mode === 'dark' ? grey[900] : '#fff')};
  border: 1px solid ${({ theme }) => (theme.palette.mode === 'dark' ? grey[700] : grey[200])};
  box-shadow: 0px 2px 2px ${({ theme }) => (theme.palette.mode === 'dark' ? grey[900] : grey[50])};
  resize: none;
  &:hover {
    border-color: ${blue[400]};
  }
  &:focus-visible {
    outline: 0;
  }
`;

export default function CustomTextArea({ setButtonState, think, setThink }) {
  return (
    <StyledTextarea
      aria-label="minimum height"
      minRows={10}
      onChange={(e) => {
        setThink(e.target.value);
        if(e.target.value.length > 2){
          setButtonState(false)
        }else{
          setButtonState(true)
        }
      }}
      placeholder="What are you thinking now?"
      value={think}
    />
  );
}
