import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ user, children, onRequireLogin, redirectTo }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const allowed = onRequireLogin(redirectTo);
      if (!allowed) {
        // Modal open ho jaayega App.jsx ke state se
      }
    }
  }, [user]);

  if (!user) return null; // Modal show hoga, page blank rahega
  return children;
};

export default ProtectedRoute;
