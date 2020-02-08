import React, { useState, useContext } from "react";
import useFormValidation from "../Auth/useFormValidation";
import validateCreateLink from "../Auth/validateCreateLink";
import { FirebaseContext } from "../../firebase";

const INITIAL_STATE = {
  description: "",
  url: ""
};

function CreateLink(props) {
  const { user, firebase } = useContext(FirebaseContext);

  const handleCreateLink = () => {
    if (!user) {
      props.history.push("/login");
    }
  };

  const { handleChange, handleSubmit, values, errors } = useFormValidation(
    INITIAL_STATE,
    validateCreateLink,
    handleCreateLink
  );

  const { description, url } = values;
  const [serverErrors, setServerErrors] = useState(null);

  return (
    <form className="flex flex-column mt3" onSubmit={handleSubmit}>
      <input
        type="description"
        placeholder="A description for your link"
        autoComplete="off"
        name="description"
        className={errors.description && "error-input"}
        onChange={handleChange}
        value={description}
      />
      {errors.description && <p className="error-text">{errors.description}</p>}
      <input
        type="url"
        placeholder="A url for your link"
        autoComplete="off"
        name="url"
        className={errors.urtl && "error-input"}
        onChange={handleChange}
        value={url}
      />
      {errors.url && <p className="error-text">{errors.url}</p>}
      {serverErrors && <p className="error-text">{serverErrors}</p>}
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
}

export default CreateLink;
