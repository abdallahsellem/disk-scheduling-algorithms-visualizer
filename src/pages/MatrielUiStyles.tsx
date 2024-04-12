import { styled } from '@mui/system';
import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'



const CssTextField = styled(TextField, {
})((p) => ({
    input: {
      color: "white",
    },
    label:{
      color:"white"
    },
  "& .MuiFormControl-root":{
    '& fieldset': {
      borderColor: '#1565c0',
      color:"white"
    },
    '& hover:fieldset': {
        borderColor: '#1565c0',
      },
  } ,"& .MuiFormControl-fullWidth":{
    '& fieldset': {
      borderColor: '#1565c0',
    },
    '& hover:fieldset': {
        borderColor: '#1565c0',
      },
  } ,"& ,MuiTextField-root":{
    '& fieldset': {
      borderColor: '#1565c0',
    },
    '& hover:fieldset': {
        borderColor: '#1565c0',
      },
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#1565c0',
    },
    '&:hover fieldset': {
      borderColor: '#1565c0',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1565c0',
    },
  }, 
  "&.MuiInputBase-input":{
    'fieldset': {
        color:"white"
      },
  }, "&.MuiOutlinedInput-input":{
    'fieldset': {
        color:"white"
      },
  },
}));
const CssSelect = styled(Select, {
})((p) => ({
    input: {
      color: "white",
    },
  "& .MuiFormControl-root":{
    '& fieldset': {
      borderColor: '#1565c0',
      color:"white",
      innerWidth:"200px"

    },
    '& hover:fieldset': {
        borderColor: '#1565c0',
      },
  } ,"& .MuiFormControl-fullWidth":{
    '& fieldset': {
      borderColor: '#1565c0',
    },
    '& hover:fieldset': {
        borderColor: '#1565c0',
      },
  } ,"& ,MuiTextField-root":{
    '& fieldset': {
      borderColor: '#1565c0',
    },
    '& hover:fieldset': {
        borderColor: '#1565c0',
      },
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#1565c0',
    },
    '&:hover fieldset': {
      borderColor: '#1565c0',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1565c0',
    },
  }, 
  "&.MuiInputBase-input":{
    'fieldset': {
        color:"white"
      },
  }, "&.MuiOutlinedInput-input":{
    'fieldset': {
        color:"white"
      },
  },

}));
const CssInputLabel= styled(InputLabel, {
})((p) => ({
    input: {
      color: "white",
    },
  "& .MuiFormControl-root":{
    '& fieldset': {
      borderColor: '#1565c0',
      color:"white"
    },
    '& hover:fieldset': {
        borderColor: '#1565c0',
      },
  } ,"& .MuiFormControl-fullWidth":{
    '& fieldset': {
      borderColor: '#1565c0',
    },
    '& hover:fieldset': {
        borderColor: '#1565c0',
      },
  } ,"& ,MuiTextField-root":{
    '& fieldset': {
      borderColor: '#1565c0',
    },
    '& hover:fieldset': {
        borderColor: '#1565c0',
      },
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#1565c0',
    },
    '&:hover fieldset': {
      borderColor: '#1565c0',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1565c0',
    },
  }, 
  "&.MuiInputBase-input":{
    'fieldset': {
        color:"white"
      },
  }, "&.MuiOutlinedInput-input":{
    'fieldset': {
        color:"white"
      },
  }
}));
export {CssTextField ,CssSelect,CssInputLabel}