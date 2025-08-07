import React, { useState } from "react";
import "./index.css";
import bgMobile from "./images/bg-main-mobile.png";
import bgDesktop from "./images/bg-main-desktop.png";
import logo from "./images/card-logo.svg";
import tick from "./images/icon-complete.svg";
import {format} from "date-fns";

function App() {
  const [confirm, setConfirm] = useState(false);
  const [name, setName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [date, setDate] = useState("01/23")
  const [cvc, setCvc] = useState("")

  const [errors, setErrors] = useState({});

  const formattedCardNum = cardNum.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    //name validation
    if (!name) {
      newErrors.name = "name cannot be empty";
    }

    if (!cardNum) {
      newErrors.cardNum = "Card number cannot be blank";
    } else if (cardNum.replace(/\s/g, "").length !== 16 || !/^\d+$/.test(cardNum.replace(/\s/g, ""))) {
      newErrors.cardNum = "Wrong format, numbers only";
    }
    
    if (!cvc) {
      newErrors.cvc = "CVC cannot be blank";
    } else if (cvc.length !== 3 || !/^\d+$/.test(cvc)) {
      newErrors.cvc = "Wrong format";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setConfirm(true);
    }
  };

  return (
    <>
      <section>
        <div className="absolute -z-10 w-full">
          <picture>
            <source media="(min-width: 768px )" srcSet={bgDesktop} />
            <img src={bgMobile} alt="" className="w-full md:w-1/3" />
          </picture>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-7xl mx-auto">
          <div className="mt-10 mx-5 lg:grid grid-cols-1">
            <article className="frontCard p-5 flex flex-col justify-between">
              <img src={logo} alt="" className="w-20 lg:w-28" />

              <div>
                <h2 className="text-white text-xl lg:text-3xl mb-6 tracking-widest">
                  {formattedCardNum || "0000 0000 0000 0000"}
                </h2>
                <ul className="flex items-center justify-between">
                  <li className="text-white uppercase text-base lg:text-xl tracking-widest">
                    {name || "Jane Appleseed"}
                  </li>
                  <li className="text-white text-base lg:text-xl tracking-widest">
                   {format(new Date(date), "MM/yy")}
                  </li>
                </ul>
              </div>
            </article>

            <article className="backCard relative lg:ml-20">
              <p className="absolute right-8 text-lg lg:text xl text-white tracking-widest ">
                {cvc || "000"}
              </p>
            </article>
          </div>

          <div className="pt-8 px-5 pb-20">
            {!confirm && <form className="flex flex-col justify-center gap-8 lg:h-screen max-w-lg " onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="cardholderName"
                  className="block uppercase tracking-wider text-slate-800 mb-2 text-sm"
                >
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="cardholderName"
                  id="cardholderName"
                  placeholder="e.g. Jane Appleseed"
                  className={`border-2 py-3 px-4 rounded outline-none w-full ${errors.name ? 'border-red-500' : 'border-slate-300'}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                
              </div>

              <div>
                <label
                  htmlFor="cardNumber"
                  className="block uppercase tracking-wider text-slate-800 mb-2 text-sm"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  id="cardNumber"
                  placeholder="e.g. 0000 0000 0000 0000"
                  className={`border-2 py-3 px-4 rounded outline-none w-full ${errors.cardNum ? 'border-red-500' : 'border-slate-300'}`}
                  maxLength={19}
                  value={formattedCardNum}
                  onChange={(e) => setCardNum(e.target.value.replace(/ /g, ''))}
                />
                {errors.cardNum && <p className="text-red-500 text-sm mt-1">{errors.cardNum}</p>}
              </div>

              <article className="flex items-center justify-between gap-8">
                <div className="flex-1">
                  <label
                    htmlFor="expiryDate"
                    className="block uppercase tracking-wider text-slate-800 mb-2 text-sm"
                  >
                    Exp. Date (MM/YY)
                  </label>
                  <input
                    type="month"
                    name="expiryDate"
                    id="expiryDate"
                    placeholder="e.g. MM YY"
                    className="border-2 border-slate-300 py-3 px-4 rounded outline-none w-full"
                    
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="cvc"
                    className="block uppercase tracking-wider text-slate-800 mb-2 text-sm"
                  >
                    CVC
                  </label>
                  <input
                    type="text"
                    name="cvc"
                    id="cvc"
                    placeholder="e.g. 123"
                    className={`border-2 py-3 px-4 rounded outline-none w-full ${errors.cvc ? 'border-red-500' : 'border-slate-300'}`}
                    
                    maxLength={3}
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                  />
                  {errors.cvc && <p className="text-red-500 text-sm mt-1">{errors.cvc}</p>}
                </div>
              </article>

              <button
                className="btn py-3 px-6 rounded shadow text-white text-base tracking-wide lg:text-lg"
                // onClick={() => {setConfirm(true)}}
              >
                Confirm
              </button>
            </form> }

            {confirm && <ThankYou setConfirm={setConfirm}/>}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;

function ThankYou({ setConfirm }) {
  const handleContinue = () => {
    setConfirm(false);
  }
  return (
    <>
      <div className=" thankYou flex flex-col items-center justify-center lg:h-screen max-w-lg mx-auto ">
        <img src={tick} alt="" className="block mx-auto" />
        <h1 className="text-slate-800 text-3xl my-6 uppercase text-center">
          Thank You
        </h1>
        <p className="text-slate-400 text-center">
          We've added your card details
        </p>
        <button onClick={handleContinue} className="btn block mx-auto mt-10 py-3 px-6 rounded shadow text-white text-base tracking-wide lg:text-lg w-full">
          Continue
        </button>
      </div>
    </>
  );
}
