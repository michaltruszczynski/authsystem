export const getErrorMessage = (error) => {
   let errorMessage = "";
   let errorDetails = [];
   if (error.error) {
      errorMessage = error.error ? error.error : "";
      errorDetails = [];
   } else if (error.data) {
      errorMessage = error.data?.message ? error.data.message : "";
      errorDetails = error.data?.data ? error.data.data.map((message) => message.msg) : [];
   } else {
      errorMessage = "Connection problems.";
      errorDetails = ["Please try again later"];
   }

   return { errorMessage, errorDetails };
};
