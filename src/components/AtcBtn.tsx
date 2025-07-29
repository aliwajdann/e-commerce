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
      <button className='w-full bg-gradient-to-r from-[#681C1C] to-[#8B2635] text-white py-2.5 px-4 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
        onClick={(e)=>{handleAddToCart(e)}}
      >
          Add to Cart
      </button>
</>

  )
}

export default AtcBtn




