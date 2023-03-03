import { Carousel } from "./components/Carousel";
import { ExploreArticles } from "./components/ExploreArticles";
import { Heros } from "./components/Heros";

export const Homepage = () => {
    return (
        <>
        <ExploreArticles/>
        <Carousel/> 
        <Heros/>
        </>
    );
}