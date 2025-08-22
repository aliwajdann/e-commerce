import { addToCart } from '@/redux/cartSlice';
import {  useDispatch } from "react-redux";
import { toggle } from "@/redux/drawerSlice";
import { Plus } from 'lucide-react';
interface MediaType {
  type: string;
  url: string;
}

interface ProductInfoProps {
  id: string;
  name: string;
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
  title: product.name,
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
      <button className=' z-30 absolute bottom-2.5 right-2.5 bg-white text-gray-600 p-1 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
        onClick={(e)=>{handleAddToCart(e)}}
      >
       <Plus className='w-3.5 h-3.5'/>
      </button>
</>

  )
}

export default AtcBtn




