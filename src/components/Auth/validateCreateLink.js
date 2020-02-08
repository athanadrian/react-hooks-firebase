export default function validateCreateLink(values) {
  let errors = {};

  //description errors
  if (!values.description) {
    errors.description = "Description Required!";
  } else if (values.description.length < 10) {
    errors.description = "Descriptoion must be at least 10 characters long!";
  }
  //url errors
  if (!values.url) {
    errors.url = "Url Required!";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = "Invalid url address";
  }
  return errors;
}
