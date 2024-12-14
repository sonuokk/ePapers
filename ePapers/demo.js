window.onload = () => {
    const token = sessionStorage.getItem("token");
    if (token !== null) {
      window.location = "index.html";
    }
  };

  

  //ye wali line login.html aur signup.html wale file me script tag ke andar daal de bhai




  window.onload = () => {
    const token = sessionStorage.getItem("token");
    if (token === null) {
      window.location = "login.html";
    }
  };


  
 // ye wala tere vo pages me jo bina login nahi show hone chahiye

