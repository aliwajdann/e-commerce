import { addToCart } from '@/redux/cartSlice';
import {  useDispatch } from "react-redux";
import { toggle } from "@/redux/drawerSlice";
interface MediaType {
  type: string;
  url: string;
}

interface ProductInfoProps {
  id: string;
  title: string;
  price: number;
  description: string;
  media: MediaType[],
  quantity: number
}
interface Product {
    product: ProductInfoProps
}

function AtcBtn({product}:Product) {
const dispatch = useDispatch();

  // const [open, setOpen] = useState(false);

  const handleAddToCart = (e:any) => {
    dispatch(toggle())
    // setOpen(true)
     e.stopPropagation()
      dispatch(
          addToCart({
              id: product.id,
  title: product.title,
  price:product.price,
  media:product.media.map((m:any) => ({
      url: m.url,
    type: m.type || "image" 
})),
quantity: product.quantity
})
);
// router.push('/cart')
  };

  return (
      <>
    <div className='bg-white w-full hover:cursor-pointer'>
       <button
        onClick={(e)=>{handleAddToCart(e)}}
        className="hover:cursor-pointer border-1  font-bold inline-block text-black px-6 py-2   transition-all w-full text-center"
      >
          Add to Cart
      </button>
      </div>
</>

  )
}

export default AtcBtn




