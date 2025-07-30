import React from 'react'

function FaqSection() {
  return (
    <div className="my-12 md:w-[90%] w-[95%]  mx-auto">
  <h2 className="text-2xl font-bold mb-4">FAQs</h2>
  <div className="space-y-4">
    <div>
      <h3 className="font-semibold">Q: Is this product original?</h3>
      <p className="text-gray-600">Absolutely. We guarantee 100% originality and premium quality.</p>
    </div>
    <div>
      <h3 className="font-semibold">Q: How many days will it take to deliver?</h3>
      <p className="text-gray-600">It usually takes 2–5 working days across Pakistan.</p>
    </div>
    <div>
      <h3 className="font-semibold">Q: Is there any return or exchange?</h3>
      <p className="text-gray-600">Yes! Check our return policy below for full details.</p>
    </div>
  </div>
</div>

  )
}

export default FaqSection

