import emailjs from "emailjs-com";
import { EmailJSKeyWords } from "../pages/entrepreneur/EmailJSKeyWords";

export const SendEmail = (email) => {
  const { service_id, accountRegistrationTemplateId } = EmailJSKeyWords();

  return emailjs
    .send(service_id, accountRegistrationTemplateId, email, "D8zQ6PquDXoTY67LS")
    .then(
      (result) => {
        console.log(result.text);
        return result.text;
      },
      (error) => {
        console.log(error.text);
        return error.text;
      }
    );
};
