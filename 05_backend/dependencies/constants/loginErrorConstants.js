const Error400 = {
    MISSING_FIELDS: {
      error: "Required fields are missing.",
    },
    
  };
const Error401={
    UNAUTHORIZED_USER:{
        message:"Invalid email or password"
    }
}
  
  const Success200 = {
    ADMIN_ACCESS_GRANTED: {
      message: "admin access granted. Welcome!",
    },
    USER_ACCESS_GRANTED:{
        message:"user access granted. Welcome!"
    }
  };

const Error500 = {
    INTERNAL_SERVER_ERROR: {
      error: "Internal Server Error. Please try again later.",
    },
  };
  
