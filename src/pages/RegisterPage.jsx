import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
const RegisterPage = () => {
  //here we define javascript code
  // Why we useState
  //we use the useState hook to manage the form's input state for email and password
  // as wel as any loading or error states
  //this line initializes the email state variable with an empty string and provides the `setEmail` function to update it
  const [email, setEmail] = useState("");
  // This line initialize the password state variable and its updater function `setPassword`
  const [password_hash, setPassword_hash] = useState("");
  // This line initialize the `state` , which tracks wether the registration in process is in progress
  const [loading, setLoading] = useState(false);
  //this line initialize the error state which score any registration error message
  const [error, setError] = useState(null);
  const { registerAuth } = useContext(AuthContext);
  //way we use an asynchronous for 'handelSubmit':
  //the registration process involves a request to the backend, which is an
  //asynchronous operation. using async/await makes the code more readable and
  //helps us  handel the sequence  of event (sending the request , waiting for a response)..
  //this asynchronous function is called when the form is submitted
  const handleSubmit = async (e) => {
    // e. preventDefault()' prevent the default from submission behavior  , which could cause  a page reload
    e.preventDefault();
    // set the `loading` state to `true to indicate that the registration process has started
    setLoading(true);
    // clear any previous error messages before attempting a new registration
    setError(null);
    // A `try...catch` block is handel success and failure of the asynchronous operation.
    try {
      //call the `register` function from the AuthContext
      //thw `await` keyword pause the execution until the `register` promise is resolved
      await registerAuth(email, password_hash);
    } catch {
      //if an error occurs during registrations, the `catch` block is executed..
      //log the error to the console for debugging purpose
      console.error(error);
      //we check for a specific error message to provide better feedback to the user
      //the `?` operator, which is shorthand of an `if..else` statement
      const errorMessage =
        error.Message === "email already exist"
          ? "this email is already in use please try in different one"
          : "failed to register please try again later";
      //set the error  state with the appropriate message, which will be displayed fo an `if... else`statement.
      setError(errorMessage);
    } finally {
      setLoading(false);
      setEmail("");
      setPassword_hash("");
    }
  };
  //THe `return` statement renders  the component's JSX( React's syntax for HTML-like code)
  return (
    // WE use the standard html tags with bootstrap class for styling to maintain
    // consistency across our components...
    // This is the main container `div` with Bootstrap classes for content
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      {/* this `div` acts as card with padding a shadow and a fixed width */}
      <div className="card p-4 shadow-sm" style={{ width: "25rem" }}>
        {/*  A heading for the form */}
        <h2 className="text-center mb-4">Register</h2>
        {/* WE use conditional rendering to shoe an error message if the error state is not null  */}
        {/* if `error` is a truthy value, The `div` with the alert will be rendered */}
        {error && <div className="alert alert-danger">{error}</div>}
        {/* The form element with an `onSubmit` event handler that calls handel submit function*/}
        <form onSubmit={handleSubmit}>
          {/* A `div` For the email input  */}
          <div className="mb-3">
            {/* A label for the email input . `htmlFor`links it to the input field id */}
            <label htmlFor="formEmail" className="form-label">
              Email <address></address>
            </label>
            {/* the email input field */}
            <input
              type="email"
              className="form-control"
              id="formEmail"
              placeholder="Enter your Email"
              //`value={email} `binds the inputs values to the email state
              value={email}
              // `onChange` updates the `email` state whenever the user types
              onChange={(e) => setEmail(e.target.value)}
              //`required` is an HTML attribute that make the field mandatory
              required
            />
            <div className="mb-3">
              {/* A label for the password input . `htmlFor`links it to the input field id */}
              <label htmlFor="formPassword" className="form-label">
                password <address></address>
              </label>
              {/* the password input field */}
              <input
                type="password"
                className="form-control"
                id="formPassword"
                placeholder="Enter your password"
                //`value={password} `binds the inputs values to the password state
                value={password_hash}
                // `onChange` updates the `password` state whenever the user types
                onChange={(e) => setPassword_hash(e.target.value)}
                //`required` is an HTML attribute that make the field mandatory
                required
              />
            </div>
          </div>
          {/*  the submit button */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            //the `disabled` attribute is set `true` if `loading` true
            // preventing multiple submission while a request is in progress
            // disabled
          >
            {/*  This uses a ternary operator to   conditionally change the button text */}
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default RegisterPage;