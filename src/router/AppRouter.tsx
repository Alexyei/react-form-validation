import {FC} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {publicRoutes as publicRoutesArray} from "./routes";
const AppRouter:FC = ()=>{
    const publicRoutes = publicRoutesArray.map((r)=><Route path={r.path} element={r.element}></Route>)

    return (
        <Routes>
            {publicRoutes}
        </Routes>
    )
}

export const Links:FC = ()=>{
    const publicRoutesLinks = publicRoutesArray.filter(r=>r.linkName !== undefined).map((r)=><Link to={r.path}>{r.linkName!}</Link>)
    return (
        <>
            {publicRoutesLinks}
        </>
    )
}

export default AppRouter;