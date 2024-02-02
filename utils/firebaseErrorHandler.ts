export interface FirebaseError {
  code?: string;
  response?: {
    data?: {
      code?: string;
    };
  };
}

const firebaseErrorHandler = (error: FirebaseError): string => {
  const errorCode = error?.response?.data?.code
    ? error.response.data.code
    : error.code;

  if (
    errorCode === "auth/email-already-in-use" ||
    errorCode === "auth/email-already-exists"
  ) {
    return "The email address is already in use by another account.";
  } else if (
    errorCode === "auth/wrong-password" ||
    errorCode === "auth/user-not-found"
  ) {
    return "Incorrect email or password.";
  } else if (errorCode === "auth/missing-email") {
    return "Invalid email";
  }

  return "Something went wrong. Please try again later";
};

export default firebaseErrorHandler;
