import { Form } from "formik";
import React from "react";
import "./Register.css";
import logo from "../../Images/flavor.png"

const Register = () => {
  return (
    <div>
      <div class="flex">
        <div>
            <img
            className="h-[80vh]"
          src="https://static.cdninstagram.com/images/instagram/xig/homepage/phones/home-phones-2x.png?__makehaste_cache_breaker=73SVAexZgBW"
          alt="Instagram Homepage"
        />
        </div>
        
        <div class="">
          <img
            src={logo}
            alt="Instagram Logo"
          />

          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
