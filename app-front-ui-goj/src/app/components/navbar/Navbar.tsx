import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/logo.png";

const Navbar = () => {
  const [searchInput] = useState('');
  const navigate = useNavigate();

  const navigation: any[] = [
    {
      name: "Home",
      href: ""
    },
    {
      name: "Random 100",
      href: "random"
    },
    {
      name: "Bookmarked",
      href: "bookmarked"
    },
    {
      name: "NotFoundTest",
      href: "abrakdabra"
    }
  ]

  useEffect(() => {
    if(searchInput){
      navigate(`/search?input=${searchInput}`);
    }
  }, [searchInput]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
        {logo}
        <h1>EXAMPLE</h1>
    </>
  );
};

export default Navbar;