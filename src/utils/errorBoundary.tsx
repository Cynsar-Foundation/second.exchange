import React, { ErrorInfo } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<Props, { hasError: boolean }, {}> {
  constructor(props: Props) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log({ error, errorInfo });
  }

  handleClose = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Modal isOpen={true} onClose={this.handleClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Error Occurred</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Oops, there is an error!
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={this.handleClose}>
                  Try again?
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {this.props.children}
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
