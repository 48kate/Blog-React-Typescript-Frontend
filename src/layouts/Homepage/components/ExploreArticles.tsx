import { NavLink } from "react-router-dom"

export const ExploreArticles = () => {
    return (
        <div className="p-5 mb-4 bg-dark header">
            <div className="container-fluid py-5 text-white 
            d-flex justify-content-center align-items-center">
                <div>
                    <h1 className="display-5 fw-bold"> Find your next adventure</h1>
                    <p className="col-md-8 fs-d">Where whould you like to go next?</p>
                    <NavLink type="button" className="btn main-color btn-lg text-white" to={"/articles"}>
                        Explore articles</NavLink>
                </div>
            </div>
        </div>
    )
}