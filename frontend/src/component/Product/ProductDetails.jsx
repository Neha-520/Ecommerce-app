import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel';
import './productDetails.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import ReviewCard from './ReviewCard';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../actions/cartActions';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from '../../constants/productConstants';


const ProductDetails = ({ match }) => {

    const dispatch = useDispatch()
    const alert = useAlert();

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { product, loading, error } = useSelector(state => state.productDetails)

    const { success, error: reviewError } = useSelector((state) => state.newReview)

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors())
        }

        if (success) {
            alert.success("Review Submitted Successfully")
            dispatch({ type: NEW_REVIEW_RESET })
        }

        dispatch(getProductDetails(match.params.id));
    }, [dispatch, match.params.id, error, alert, success, reviewError])


    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;

        setQuantity((q) => q + 1);
    }

    const decreaseQuantity = () => {
        if (quantity <= 1) return;

        setQuantity((q) => q - 1);
    }

    const addToCartHandler = () => {

        dispatch(addItemsToCart(match.params.id, quantity));
        alert.success("Item Added To Cart")
    }

    const submitReviewToggle = () => {
        setOpen((x) => !x);
    }

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", match.params.id);

        dispatch(newReview(myForm));

        setOpen(false)
    }

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={`${product.name} -- BLUEMART`} />
                    <div className='ProductDetails'>
                        <div>
                            <Carousel>
                                {product.images &&
                                    product.images.map((item, i) => (
                                        <img className='CarouselImage'
                                            key={i}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))
                                }

                            </Carousel>
                        </div>
                        <div>
                            <div className='detailsBlock-1'>
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className='detailsBlock-2'>
                                <Rating {...options} />
                                <span className='detailsBlock-2-span'>({product.numOfReviews} Reviews)</span>
                            </div>
                            <div className='detailsBlock-3'>
                                <h1>{`₹${product.price}`}</h1>
                                <div className='detailsBlock-3-1'>
                                    <div className='detailsBlock-3-1-1'>
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly value={quantity} type="number" />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler} >Add to Cart</button>
                                </div>
                                <p>
                                    Status:
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product.Stock < 1 ? "Out Of Stock" : "In Stock"}
                                    </b>
                                </p>
                            </div>

                            <div className='detailsBlock-4'>
                                Description : <p>{product.description}</p>
                            </div>
                            <button onClick={submitReviewToggle} className='submitReview'> Submit Review</button>
                        </div>
                    </div>
                    <h3 className="reviewsHeading">REVIEWS</h3>

                    <Dialog
                        aria-labelledby='simple-dialog-title'
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />
                            <textarea
                                className='submitDialogTextArea'
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            >
                            </textarea>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={reviewSubmitHandler} color="primary">
                                Submit
                            </Button>
                        </DialogActions>

                    </Dialog>

                    {product.reviews && product.reviews[0] ? (
                        <div className='reviews'>
                            {
                                product.reviews &&
                                product.reviews.map((review) => <ReviewCard review={review}></ReviewCard>)
                            }
                        </div>
                    ) : (
                        <p className='noReviews'>No Reviews Yet</p>
                    )}
                </>
            )}
        </>
    )
}

export default ProductDetails
