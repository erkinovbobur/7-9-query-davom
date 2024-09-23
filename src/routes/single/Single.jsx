import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../redux/api/ProductsApi';
import { Carousel } from 'antd';


const Single = () => {
    const { id } = useParams();
    const { data } = useGetProductsQuery();

    const product = data?.payload?.find((item) => item._id === id);

    if (!product) {
        return <div className='product-not-found text-center text-4xl font-semibold text-red-600 mt-20'>Product not found!</div>;
    }

    return (
        <>
            <div className='container mx-auto mt-10 mb-20 p-6 bg-white shadow-md rounded-lg' style={{ paddingTop: '170px' }}>
                <div className='lg:flex gap-10 justify-between'>
                    <div className='lg:w-1/3 mb-10 lg:mb-0'>
                        <div className='bg-gradient-to-r from-purple-400 to-blue-500 p-4 rounded-lg shadow-lg'>
                            <Carousel autoplay arrows className='product-carousel'>
                                {product.product_images.map((image, index) => (
                                    <div key={index} className='flex justify-center'>
                                        <img src={image} alt={product.product_name} className='object-cover w-full h-96 rounded-lg' />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </div>

                    <div className='lg:w-2/3'>
                        <h1 className='text-4xl font-bold text-gray-800 mb-4'>{product.product_name}</h1>
                        <p className='text-lg text-gray-500 mb-6'>{product.description}</p>
                        
                        <div className='mb-4'>
                            <span className='inline-block bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full'>
                                Category: {product.category}
                            </span>
                        </div>

                        <div className='mb-4'>
                            <span className='text-yellow-500 text-2xl font-semibold'>
                                {'★'.repeat(product.rating)} {product.rating} / 5
                            </span>
                        </div>

                        <div className='mb-6'>
                            <span className='text-3xl font-bold text-green-600'>${product.sale_price}</span>
                        </div>

                        <div className='mb-4'>
                            {product.countInStock > 0 ? (
                                <span className='text-green-600 text-lg font-semibold'>In Stock: {product.countInStock}</span>
                            ) : (
                                <span className='text-red-600 text-lg font-semibold'>Out of Stock</span>
                            )}
                        </div>

                        <div className='mt-8'>
                            <button className='bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow hover:bg-blue-700 transition'>
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Single;