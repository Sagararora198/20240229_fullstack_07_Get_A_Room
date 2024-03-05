const Error400 = {
    PARAMETER_MISSING: {
        error: "At least one search parameter is required.",
      },
      INVALID_DATE_FORMAT: {
        error: "Invalid date format.",
      },
      DATE_INVALID: {
        error: "Dates cannot be in the past.",
      },
      INVALID_GUEST_COUNT: {
        error: "Invalid guest count.",
      },
      INVALID_SORTING_PARAMETER: {
        error: "Invalid sorting parameter.",
      },
      INVALID_REQUEST_URL: {
        error: "Invalid request URL.",
      },
      HOTEL_PARAMETER_REQUIRED:{
        error:"Hotel name parameter is required"
      },
      INVALID_HOTEL_PARAMETER:{
        error:"Invalid hotel name parameter"
      },

}
const Error404={
    NO_RESULTS_FOUND: {
        error: "No results found.",
      },
      HOTEL_NOT_FOUND:{
        error:"Hotel not found"
        
      }
}
const Error500={
    INTERNAL_SERVER_ERROR:{
        error:"Internal server error. Please try again"
    }
}

