import { addFav, removeFav } from '../../redux/actions/templatesAction';
import { useDispatch, useSelector} from 'react-redux';
import './Card.css';
import React from 'react';
addFav
const Card = ({ template, id }) => {
const myFavorites = useSelector((state) => state.templates.myFavorites);
const dispatch = useDispatch();
// const imagenUrl =  template.images.map(image => (
//   image.content
// ));
// console.log(imagenUrl);
// const UrlString= imagenUrl.join("")

const isFavorite = myFavorites.includes(id);

  const handleClick = (event) => {
    event.preventDefault();
    if (isFavorite) {
      dispatch(removeFav(id))
    } 
    else {
      dispatch(addFav(id))
    } 
  };
console.log(template);
  return (
    <div
      className="max-w-xs rounded relative overflow-hidden shadow-custom transition-transform transform hover:scale-105"
      key={template.id}
    >
        <div className="flex items-center ml-4 mt-4 mb-2">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="none"
                stroke="#06B6D4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 1l2.705 5.674L18 7.5l-4.073 4.096L15.5 18 10 14.8 4.5 18l1.573-6.404L2 7.5l5.295-.826z"
                />
              </svg>
            ))}
          </div>
          
          <div>
    {template.images.map((image) => (
      <div>
        {(image.isCover === true) && <img className="w-full" key={image.id} src={image.original} alt={template.name} />}
      </div>
    ))}
  </div>

          
      <div className="absolute top-0 right-0 m-2 z-10 opacity-1 transition-opacity duration-300">
        
          <svg onClick={handleClick}
            className="h-4 w-4 text-[#06B6D4]"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor" 
          >
          { isFavorite ? (
            <path 
            fill='#06B6D4'
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          ) : (
            <path
            fill='#06B6D4'
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          )}
          </svg>
      </div>
      <div className="px-6 py-6">
        <div className="font-inter text-l">{template.name}</div>
        <div className="flex justify-between items-center">
          <p className="text-black text-lg font-bold">${template.price}</p>
          <div className="mt-2">
          {template.technologies && template.technologies.map(tech => (
            <span key={tech.id} className="text-[12px] border-2 border-[#06B6D4] text-gray-900 px-2 py-1 rounded p-2 m-2 hover:bg-[#06B6D4] hover:text-white">{tech.name}</span>
          ))}
        </div>
        </div>
      </div>
      <div className="px-6 py-6">
      </div>
    </div>
  );
};

export default Card;
