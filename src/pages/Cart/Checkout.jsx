import CheckoutForm from "./CheckoutForm";
import { OrderSummary } from "./OrderSummary";

export default function Checkout({ setCurrentStep }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Checkout Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold text-[#3F4919] mb-6">
                Checkout
              </h1>
              <CheckoutForm setCurrentStep={setCurrentStep} />
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-8">
              <h2 className="text-2xl font-bold text-[#3F4919] mb-6 px-6">
                Order Summary
              </h2>
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
