import { useState } from "react";
import { projectFireAuth } from "../../firebase/Config";



const SSO = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const onSubmitHandler = (e) => {
    e.preventDefault();
    signin(mobileNumber)
    
  };
  projectFireAuth.useDeviceLanguage()
 async function signin ()
  {
    
    try{
   

    const res = await projectFireAuth.signInWithPhoneNumber(mobileNumber,true)

    }
    catch(err)
    {
        console.log(err.message)
    }
  }
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label> Mobile </label>
        <input
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          type="number"
          
          placeholder="Enter you Mobile"
        />
        <button type="submit" > Login </button>
      </form>
    </div>
  );
};
export default SSO;
