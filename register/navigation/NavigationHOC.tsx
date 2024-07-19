import { useNavigate } from "react-router-dom";

const WithRouter = (Child: any) => {
    const ComponentWithRouter = (props: any) => {
        const navigate = useNavigate()
        return <Child navigate={navigate} {...props} />;
    };
    return ComponentWithRouter
}
export default WithRouter;