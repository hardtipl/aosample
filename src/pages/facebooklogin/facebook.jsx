import React from 'react'
import FacebookLogin from 'react-facebook-login';
const Facebook = () => {
  const responseFacebook = (response) => {
    console.log("response",response);
  }
  const componentClicked = (response) => {
    console.log("component clicked",response);
  }
  
  return (
    <div>
       <FacebookLogin
    appId="723688562736303"
    autoLoad={true}
    fields="name,email,picture"
    onClick={componentClicked}
    callback={responseFacebook} />
    </div>
  )
}

export default Facebook