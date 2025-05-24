'use client';
import ReactMarkdown from 'react-markdown'
import Ppatc from './Ppatc';



interface MediaType {
  type: 'image' | 'video';
  url: string;
}

interface ProductInfoProps {
  id: string;
  title: string;
  price: number;
  originalprice: number;
  description: string;
  media: MediaType[]
}

export default function ProductInfo({ id, title, price, description, media, originalprice}: ProductInfoProps) {
 

  return (
    <>
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-base-dark">{title}</h1>
     <div className="flex items-center gap-2">
            {originalprice && (
              <span className="block font-semibold text-base-dark line-through">
                ${originalprice.toFixed(2)}
              </span>
            )}
            <span className="font-semibold text-price">${price.toFixed(2)}</span>
          </div>
      <p className="text-base-dark">SKU: X6144-A-GRADE</p>
       <Ppatc product={{
        id: id,
        title: title,
        price: price,
        description: description,
        media:media.map((m) => ({
          url: m.url,
          type: m.type || "image" 
        })),
        quantity: 1
      }}/>
      <div className=" leading-relaxed text-muted">  <ReactMarkdown>
  {description}
</ReactMarkdown>
</div>
    </div>
    </>
  );
}
