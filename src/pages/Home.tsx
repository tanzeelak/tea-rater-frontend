import React, { useState } from "react";
import Login from "../components/Login";
import TeaRatingForm from "../components/TeaRatingForm";
import UserRatings from "../components/UserRatings";
import Navbar from "../components/Navbar";
import RegisterTea from "../components/RegisterTea";

const Home: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));
  const userId = token ? Number(token.replace("user-", "")) : null;
  const [refreshTeas, setRefreshTeas] = useState(0);
  const [isRegisterTeaVisible, setIsRegisterTeaVisible] = useState(false);

  const handleTeaRegistered = () => {
    setRefreshTeas(prev => prev + 1);
    setIsRegisterTeaVisible(false);
  };

  return (
    <div>
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar 
            setToken={setToken} 
            userId={userId!} 
            onRegisterTeaClick={setIsRegisterTeaVisible}
            isFormVisible={isRegisterTeaVisible}
          />
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            {isRegisterTeaVisible && (
              <RegisterTea onTeaRegistered={handleTeaRegistered} />
            )}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ marginTop: 0 }}>Rate a Tea!</h2>
              <TeaRatingForm userId={userId!} refreshTrigger={refreshTeas} />
            </div>
            <UserRatings userId={userId!} />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
