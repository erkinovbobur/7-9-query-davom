import { useRoutes } from "react-router-dom"
import { lazy } from "react"
import Suspense from "../utils"
const Home = lazy(() => import('../routes/home/Home'));
 const Profile = lazy(() => import('../routes/profile/Profile'));
const Private = lazy(() => import('../routes/private/Private'));
const Auth = lazy(() => import('../routes/auth/Auth'));
const Login = lazy(() => import('../routes/auth/login/Login'));
const NotFound = lazy(() => import('../routes/not-found/NotFound'));
const SignUp = lazy(() => import('../routes/auth/signUp/SignUp'));

const Single = lazy(() => import ("../routes/single/Single"))

const RouteController = () => {

    
    return useRoutes([

        {

            path: "/",
            element: <Suspense><Home/></Suspense>
        },
        {
            path:'/profile',
            element: <Suspense><Private/></Suspense>,
            children:[
                {
                    path: "/profile/",
                    element: <Suspense><Profile/></Suspense>
                }
            ]
        },
        {
            path: "/auth",
            element: <Suspense><Auth/></Suspense>,
            children: [
                {
                    path: "/auth/login",
                    element: <Suspense><Login/></Suspense>
                },
                {
                    path: "/auth/signup",
                    element: <Suspense><SignUp/></Suspense>
                }
            ]
        },
        {
            path:`/single/:id`,
            element: <Suspense><Single/></Suspense>

        },
        {
            path: "*",
            element: <Suspense><NotFound/></Suspense>
        }
    
      
        
    ])
}

export default RouteController