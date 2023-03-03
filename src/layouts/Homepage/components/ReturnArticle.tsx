import React from 'react';
import { Link } from 'react-router-dom';
import ArticleModel from '../../../models/ArticleModel';

export const ReturnArticle: React.FC<{article: ArticleModel}> = (props) => {
    return(
        <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
            <div className='text-center'>
                {props.article.img? //if props article image is true:
                    <img //display this image
                        src={props.article.img}
                        width='233'
                        height='151'
                        alt="article"
                    />
                    :    
                    <img //if not, display this:
                        src={require('./../../../Images/PublicImages/image-6.jpg')}
                        width='233'
                        height='151'
                        alt="article"
                    />
                }
                    <h6 className='mt-2'>{props.article.title}</h6>
                    <p>{props.article.author}</p>
            </div>
        </div>
    );
}
