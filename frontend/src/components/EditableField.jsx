import * as React from "react";
import {Grid, TextField, Typography} from "@mui/material";
import {useCallback, useEffect} from "react";

export const EditableField = ({value, setValue, name, textFieldProps, isEditable = true, children, childrenWrapper: ChildrenWrapper}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const Component = ChildrenWrapper || Grid

  const defaultValueWrapperProps = isEditable ? {
    onClick: () => setIsFocused(true),
    sx: {
      cursor: 'pointer'
    }
  } : {}

  const handleEsc = useCallback( (event) => {
    if (event.keyCode === 27) {
      setIsFocused(false)
    }
  }, [])

  useEffect(() => {
    if (isFocused && isEditable) {
      window.addEventListener('keydown', handleEsc);
    } else {
      window.removeEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isFocused, isEditable, handleEsc])

  const onKeyPressHandler = (e, name) => {
    const newVal = e.target.value;
    if (e.key === 'Enter') {
      e.preventDefault()
      setIsFocused(false)
      setValue(newVal, name);
    }
  }

  const defaultValue = children ? (
    <Component
      {...defaultValueWrapperProps}
    >
      {children}
    </Component>) : (
    <Typography
      {...defaultValueWrapperProps}
    >
      {value}
    </Typography>
  )

  const editableField = (
    <TextField
      variant="standard"
      size="small"
      autoFocus
      defaultValue={value}
      onBlur={() => setIsFocused(false)}
      onKeyPress={(e) => onKeyPressHandler(e, name)}
      {...textFieldProps}
    />
  )

  // if (!isEditable) return children || value

  return (
    <Grid
      container={true}
      alignItems="flex-start"
    >
      {
        !isFocused
          ? defaultValue
          : editableField
      }
    </Grid>
  )
}