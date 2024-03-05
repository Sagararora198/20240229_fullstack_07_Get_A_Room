const Error400 = {
    MISSING_FIELDS: {
      error: "Required fields are missing.",
    },
    INVALID_EMAIL_FORMAT: {
      error: "Invalid email format.",
    },
    INVALID_PASSWORD_FORMAT:{
        error:"Invalid password format"
    },
    INVALID_USERNAME_FROMAT:{
        error:"Invalid username format"
    }

  };
  
  const Success200 = {
    REGISTRATION_SUCCESSFUL: {
      message: "Registration successful. login in to continue",
    },
  };
  
  const Error500 = {
    INTERNAL_SERVER_ERROR: {
      error: "Internal Server Error. Please try again later.",
    },
  };
  const Error409={
    USER_ALREADY_EXISTS: {
        error: "User already exists.",
      },
  }
  
export {Error400,Error409,Error500,Success200}