import * as React from "react";
import {useCallback, useState} from "react";
import {AlertDialog, Modals} from "../../components";

export const ModalStateContext = React.createContext({})
export const ModalDispatchContext = React.createContext({})

export function useModalState() {
  const context = React.useContext(ModalStateContext);
  if (context === undefined) {
    throw new Error("Cannot AuthStateContext without AuthProvider");
  }

  return context;
}

export function useModalDispatch() {
  const context = React.useContext(ModalDispatchContext);
  if (context === undefined) {
    throw new Error("Cannot AuthDispatchContext without AuthProvider");
  }

  return context;
}

export const ModalProvider = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [componentName, setComponentName] = useState("")
  const [modalProps, setModalProps] = useState({})

  const ModalComponent = React.useMemo(() => {
    switch (componentName) {
      case Modals.AlertDialog:
        return AlertDialog
      default:
        return null
    }
  }, [componentName])


  const handleCloseModal = useCallback(() => {
    setComponentName("")
    setModalProps({})
    setIsOpen(false)
  }, [])

  const handleOpenModal = useCallback(({componentName, staticProps}) => {
    setComponentName(componentName)
    setModalProps(staticProps)
    setIsOpen(true)
  }, [])

  return (
    <ModalStateContext.Provider value={isOpen}>
      <ModalDispatchContext.Provider value={handleOpenModal}>
        {children}
        {
          componentName && (
            <ModalComponent
              {...modalProps}
              handleClose={handleCloseModal}
              isOpen={isOpen}
            />
          )
        }
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  )
}

