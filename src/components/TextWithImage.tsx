// components/ElevatedEssentials.jsx

export default function TextWithImage() {
  return (
    <section className="pt-[32px] md:pt-[40px] relative flex  items-center justify-between h-[70vh] bg-gray-50">

        <img
          src="https://images.unsplash.com/photo-1754430544331-0b2d98edaf2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNnx8fGVufDB8fHx8fA%3D%3D" // Replace with your image path
          alt="Elevated Essentials Model"
          width={900}
          height={700}
          className="object-cover w-full h-full absolute top-0 left-0"
        //   priority
        />
      
      {/* Text Section */}
      <div className="z-50 flex-1 px-6 md:px-12 py-10 md:py-0 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Elevated Essentials
        </h1>
        <a
          href="#"
          className="text-white font-semibold border-b border-black hover:text-gray-600 transition"
        >
          DISCOVER
        </a>
      </div>

      {/* Image Section */}
     
    </section>
  );
}
