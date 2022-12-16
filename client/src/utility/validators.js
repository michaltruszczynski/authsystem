export const required = (defineEmpty) => (value) => {
   if (defineEmpty) {
      return value.trim() !== defineEmpty;
   }
   return value.trim() !== "";
};

export const length =
   (config = { min: 5, max: 10 }) =>
   (value) => {
      if (!value.trim()) return false;
      let isValid = true;

      if (config.min) {
         isValid = isValid && value.trim().length >= config.min;
      }
      if (config.max) {
         isValid = isValid && value.trim().length <= config.max;
      }

      return isValid;
   };

export const containNumber = (value) => {
   if (!value.trim()) return false;
   const regex = new RegExp(/\d/);
   return regex.test(value);
};

export const containSpecialChar = (value) => {
   if (!value) return false;
   const regex = new RegExp(/[!@#$%^&*]/);
   return regex.test(value);
};

export const containCapitalLetter = (value) => {
   if (!value) return false;
   const regex = new RegExp(/[A-Z]/);
   return regex.test(value);
};

export const email = (value) => {
   if (!value) return false;
   const regex = new RegExp(
      /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/
   );
   return regex.test(value);
};

export const compareStrings = (refInputName) => {
   return (value, formInputsValue) => {
      const secondValue = formInputsValue[refInputName];
      if (!value && !secondValue) return false;
      return value === secondValue;
   };
};

export const isArrayNotEmpty = (value) => {
   if (!value || value.length === 0) return false;
   let isValid = true;
   value.forEach((element) => {
      isValid = isValid && element.trim() !== "";
   });
   return isValid;
};
