import { Route, Navigate, Outlet } from "react-router-dom";
import AuthService from "../Componants/management/AuthService";
import { isExpired, decodeToken } from "react-jwt";

export const isTokenExpired = () => {
  const cookie = AuthService.getCurrentUser();
  if (cookie && cookie.accessToken) {
    const token = cookie.accessToken;

    try {
      const isMyTokenExpired = isExpired(token);
      isMyTokenExpired;

      return isMyTokenExpired;
    } catch (error) {
      AuthService.logout();
      localStorage.removeItem("user");

      return true;
    }
  } else {
    AuthService.logout();
    localStorage.removeItem("user");

    return true;
  }
};
// interface PrivateRouteProps {
//   element: React.ReactNode;
//   path: string;
// }
// export const ProtectedRoute: React.FC<PrivateRouteProps> = ({
//   element,
//   path,
// }) => {
//   if (!isTokenExpired) {
//     // Redirige vers la page de connexion ou affiche un message d'expiration du jeton.
//     // Vous pouvez gérer cette partie en fonction de vos besoins.
//     return <Navigate to="/connexion" />;
//   }

//   return <Route path={path} element={element} />;
// };
interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath: string;
  children?: React.ReactNode;
}
export const ProtectedRoute = ({
  isAllowed,
  redirectPath = "/",
  children,
}: ProtectedRouteProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
