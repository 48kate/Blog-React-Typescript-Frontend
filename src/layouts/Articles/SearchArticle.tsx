import { Link } from "react-router-dom";
import ArticleModel from "../../models/ArticleModel";

export const SearchArticle: React.FC<{ article: ArticleModel }> = (props) => {
    return (
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-md-3'>
                    <div className='d-none d-lg-block mt-5 p-4'>
                        {props.article.img ?
                            <img src={props.article.img}
                                width='250'
                                height='230'
                                alt='Article'
                            />
                            :
                            <img src={require('./../../Images/PublicImages/image-6.jpg')}
                                width='250'
                                height='230'
                                alt='Article'
                            />
                        }
                    </div>
                    <div className='d-lg-none d-flex justify-content-center 
                        align-items-center'>
                        {props.article.img ?
                            <img src={props.article.img}
                                width='250'
                                height='230'
                                alt='Article'
                            />
                            :
                            <img src={require('./../../Images/PublicImages/image-6.jpg')}
                                width='250'
                                height='230'
                                alt='Article'
                            />
                        }
                    </div>
                </div>
                <div className='col-md-8'>
                    <div className='card-body'>
                        <h5 className='card-title'>
                            {props.article.author}
                        </h5>
                        <h4>
                            {props.article.title}
                        </h4>
                        <p className='card-text'>
                            {props.article.full_text}
                        </p>
                        <Link className='btn btn-md main-color text-white' to={`/articles/${props.article.id}`}>
                        View Details </Link >
                    </div>
                </div>
            </div>
        </div>
    );
}