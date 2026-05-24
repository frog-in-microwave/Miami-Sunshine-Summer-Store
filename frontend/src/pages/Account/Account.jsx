import React, { useRef, useState, useEffect } from "react";
import "./Account.css";
import { useSelector, useDispatch } from "react-redux";
import { changeInfo } from "../../store/slices/userSlice.js";



const Account = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const locationRef = useRef(null);
  const dispatch = useDispatch();

  const availableLabels = [
    { name: "Pro Surfer", color: "var(--sky-blue)" },
    { name: "Beach Bum", color: "#ffcf33" },
    { name: "Wave Chaser", color: "var(--sun-orange)" },
    { name: "Local Legend", color: "#00f2ff" },
    { name: "Party Guy", color: "#ff00ff" },
    { name: "Night Rider", color: "#bb86fc" },
  ];

  const user = useSelector((state) => state.user);
  const [label, setLabel] = useState(user.label);

  const saveChanges = () => {
    const token = localStorage.getItem("token");
    console.log(token);

    const updatedUser = {
      ...user,
      userName: nameRef.current.value,
      phoneNumber: phoneRef.current.value,
      location: locationRef.current.value,
      label: label,
    };
    dispatch(changeInfo(updatedUser));
    const payload = {
      userName: nameRef.current.value,
      phoneNumber: phoneRef.current.value,
      location: locationRef.current.value,
      label: label,
    };
    updateUserInDatabase(payload, token);
  };

  const updateUserInDatabase = async (changedUser, token) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/update-user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + token,
      },
      body: JSON.stringify({ changedUser }),
    });
    if(!response.ok){
      console.log("error with the response. ", response.message);
      return;
    }
    const data = await response.json();
    console.log(data);
  }


    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);








  return (
    <div className="account-page">
      <div className="account-container">
        <header className="account-header">
          <div className="member-card">
            <div className="card-top">
              <span className="brand-font card-logo">MIAMI SUNSHINE</span>
              <span
                className="card-status brand-font"
                style={{ backgroundColor: user.label.color }}
              >
                {user.label.name}
              </span>
            </div>
            <div className="card-body">
              <div className="avatar-placeholder">
                <img
                  src={user.profilePicLink}
                  alt="avatar"
                  className="profile-pic-img"
                />
              </div>
              <div className="user-info">
                <h2 className="brand-font">{user.userName}</h2>
                <p className="brand-font">{user.email}</p>
                <p className="member-date">MEMBER SINCE: {user.memberSince}</p>
              </div>
            </div>
            <div className="card-barcode">|| | ||| | || ||| | || |</div>
          </div>
        </header>

        <nav className="account-nav">
          {["orders", "settings"].map((tab) => (
            <button
              key={tab}
              className={`nav-btn brand-font ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </nav>

        <main className="account-content">
          {activeTab === "orders" && (
            <section className="orders-view animate-fade">
              <h3 className="brand-font section-title">Recent Drops</h3>
              <div className="order-list">
                {user.orderList.map((order) => (
                  <div key={order.id} className="order-card">
                    <span className="order-date">{order.date}</span>
                    <span className="order-total brand-font">
                      {order.total}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "settings" && (
            <section className="settings-view animate-fade">
              <h3 className="brand-font section-title">Account Settings</h3>
              <form
                className="settings-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="input-row">
                  <div className="input-group">
                    <label className="brand-font">Full Name</label>
                    <input name="name" defaultValue={user.userName} ref={nameRef} />
                  </div>
                  <div className="input-group">
                    <label className="brand-font">Phone</label>
                    <input
                      name="phoneNumber"
                      defaultValue={user.phoneNumber}
                      ref={phoneRef}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="brand-font">Location</label>
                  <input
                    name="location"
                    defaultValue={user.location}
                    ref={locationRef}
                  />
                </div>

                <div className="label-selector-container">
                  <label className="brand-font">Select Your Badge</label>
                  <div className="sticker-sheet">
                    {availableLabels.map((l) => (
                      <button
                        key={l.name}
                        type="button"
                        className={`sticker-btn brand-font ${label.name === l.name ? "selected" : ""}`}
                        style={{ "--sticker-color": l.color }}
                        onClick={() => setLabel(l)}
                      >
                        {l.name}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={saveChanges} className="save-btn brand-font">
                  SAVE CHANGES
                </button>
              </form>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Account;
