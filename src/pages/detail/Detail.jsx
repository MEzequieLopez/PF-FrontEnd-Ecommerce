import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import { Rating } from "@mui/material";
import { getTemplateById, getCategories } from "../../redux/actions/templatesAction";
import "react-image-gallery/styles/css/image-gallery.css";
import 'react-toastify/dist/ReactToastify.css';
import ReviewForm from '../../components/reviews/ReviewForm';
import { getReviewsTemplate } from "../../redux/actions/reviewsAction";
import { promedio } from "./promedio";
import { addToCart } from "../../redux/actions/cartActions";
import { ToastContainer } from "react-toastify";
import { useTranslation } from 'react-i18next';

const Detail = () => {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => i18n.changeLanguage(lng);

    const { id } = useParams();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [hasUserReviewed, setHasUserReviewed] = useState(false); 


    
    const template = useSelector((state) => state.templates.detailTemplate);
    const allReviews = useSelector((state) => state.templates.detailTemplateCopy.reviews) || [];
    const loggedIn = useSelector((state) => state.user.loggedIn); 
    const userId = useSelector(state => state.user.userInfo.id); 

    useEffect(() => {
        if (template && template.images) {
            setImages(template.images);
        }
    }, [template]);

    useEffect(() => {
        dispatch(getTemplateById(id)).then((response) => {
            console.log('Response de getTemplateById:', response); 
            if (response && response.payload && response.payload.reviews) {
                const userReview = response.payload.reviews.find(review => review.idUser === userId);
                console.log('User Review encontrado:', userReview);
                setHasUserReviewed(!!userReview);
            }
        });
        dispatch(getCategories());
        dispatch(getReviewsTemplate(id))
    }, [id, dispatch, userId]);

    

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const categories = template.categories || [];
    const technologies = template.technologies || [];
    const ratings = allReviews.map((e) => e.rating) || [];
    const resultRating = ratings.length > 0 ? promedio(ratings) : 0;

    return (
        <div>
            <ToastContainer />
            <div className="p-4 shadow-md font-inter font-semibold">
                <div className="bg-gray relative mx-auto min-w-[20rem] w-full rounded-2xl flex flex-col md:flex-row mb-10 shadow-md border-2">
                    <div className="bg-white w-[70%] mb-5 mt-10 mr-10 relative overflow-hidden flex items-center justify-center ml-10">
                        <ImageGallery items={images} showPlayButton={false} showBullets={true} autoPlay={false} />
                    </div>
                    <div className="md:w-[50%] mr-10">
                        <div className="flex justify-end text-2xl">
                            <Link to="/home">
                                <button className="py-4 px-3 rounded-lg text-2xl">X</button>
                            </Link>
                        </div>
                        <br />
                        <h1 className="text-start text-xl mr-8 mt-4 font-inter font-bold text-gray-800 pb-4 transition-colors tracking-wider border-green-900">
                            {template.name}
                        </h1>
                        <br />
                        <div className="flex items-center">
                            <div className="flex flex-row gap-4">
                                <Rating className="text-sm" readOnly value={resultRating ? resultRating : 0} />
                            </div>
                        </div>
                        <br />
                        <span className="font-bold text-2xl text-bgred text-start mr-8 mt-4 font-inter font-bold text-gray-800 pb-4 transition-colors tracking-wider border-green-900">
                            {`${"$"}${template.price}`}
                        </span>
                        <br />
                        <br />
                        <h2 className="text-start text-sm text-bggris mr-8 mt-4 font-inter font-bold text-gray-800 pb-4 tracking-wider border-green-900">
                            Categorias
                            {categories.map((c) => (
                                <p key={c.id}>{c.name}</p>
                            ))}
                        </h2>
                        <h3 className="text-start text-sm text-bggris mr-8 mt-4 font-inter font-bold text-gray-800 pb-4 tracking-wider border-green-900">
                            {template.description}
                        </h3>
                        <h3 className="text-start text-sm text-bggris mr-8 mt-4 font-inter font-bold text-gray-800 pb-4 tracking-wider border-green-900">
                            Tecnologias
                            {technologies.map((c) => (
                                <p key={c.id}>{c.name}</p>
                            ))}
                        </h3>
                        <br />
                        <div className="flex mb-4">
                            <div className="flex items-center mt-3 mb-10 w-1/2">
                                <button onClick={() => dispatch(addToCart(template.id))} className="bg-black text-white font-inter hover:bg-gray-900 font-bold py-2 px-4 rounded-full">
                                    Añadir a carrito
                                </button>
                            </div>
                            <div className="flex items-center mt-3 mb-10 w-1/2">
                                <button className="bg-black text-white font-inter hover:bg-gray-900 font-bold py-2 px-4 rounded-full">
                                    Comprar ahora
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative mx-auto min-w-[20rem] w-full rounded-2xl flex flex-col md:flex-row items-center md:justify-start mb-10">
    {loggedIn ? (
        hasUserReviewed ? (
            <p className="text-gray-800">Ya has realizado una opinión sobre esta plantilla.</p>
        ) : (
            <button
                onClick={openModal}
                className="bg-blue-500 text-white font-inter hover:bg-blue-700 font-bold py-2 px-4 rounded-full"
            >
                Opinar
            </button>
        )
    ) : (
        <div className="inline-flex items-center space-x-1">
            <Link to="/SignIn" className="text-blue-500 hover:underline">Inicia sesión</Link>
            <p className="text-gray-800">para dejar una opinión</p>
        </div>
    )}
</div>

                {allReviews.length > 0 ? (
                    <div className="bg-gray relative mx-auto min-w-[20rem] w-full rounded-2xl flex flex-col md:flex-row mb-10 shadow-md border-2">
                        <div className="bg-white mr-10 relative overflow-hidden ml-10">
                            <h2 className="text-start text-xl mr-8 mt-4 font-inter font-bold text-gray-800 pb-4 transition-colors tracking-wider border-green-900">
                                Reviews
                            </h2>
                            {allReviews.map((r) => (
                                <div key={r.id} className="mb-4">
                                    <Rating className="mb-2" readOnly value={r.rating} />
                                    <p className="text-gray-600">{r.date}</p>
                                    <span className="text-gray-800">{r.content}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-100 relative mx-auto min-w-[20rem] w-full rounded-2xl flex flex-col md:flex-row mb-10 shadow-md border-2">
                        <div className="bg-zinc-50 text-lg font-inter font-semibold p-3">
                            <span>No existen opiniones de este producto</span>
                        </div>
                    </div>
                )}

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-50">
                        <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md mt-8">
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                            >
                                X
                            </button>
                            <ReviewForm templateId={id} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Detail;