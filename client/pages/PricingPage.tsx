import React from 'react';
import { Check, Zap, Sparkles, Building2 } from 'lucide-react';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const PricingPage: React.FC = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free',
      backendPlan: 'FREE',
      price: '$0',
      description: 'Perfect for exploring AI cloning.',
      features: ['1 Voice Model', '10 Minutes / month', 'Standard Quality', 'Community Support'],
      icon: Zap,
      color: 'bg-slate-100 text-slate-600'
    },
    {
      name: 'Pro',
      backendPlan: 'PRO',
      price: '$49',
      description: 'Built for creators and small studios.',
      features: [
        'Unlimited Voice Models',
        '300 Minutes / month',
        'Ultra-HD Quality',
        'Priority Rendering',
        'Emotional Controls'
      ],
      icon: Sparkles,
      color: 'bg-indigo-600 text-white',
      popular: true
    },
    {
      name: 'Enterprise',
      backendPlan: 'ENTERPRISE',
      price: 'Custom',
      description: 'Large scale content pipelines.',
      features: [
        'API Access',
        'Custom Voice Ownership',
        'Unlimited Minutes',
        'Dedicated Manager',
        'SSO & Security'
      ],
      icon: Building2,
      color: 'bg-slate-900 text-white'
    }
  ];

const handleAction = async (plan: any) => {
  // 🔐 Not logged in → login first
  if (!user) {
    navigate('/login', { state: { from: '/pricing' } });
    return;
  }

  // 🏢 Enterprise → contact page
  if (plan.backendPlan === 'ENTERPRISE') {
    navigate('/enterprise');
    return;
  }

  // 🚀 PRO PLAN → RAZORPAY FLOW
  if (plan.backendPlan === 'PRO') {
    try {
      // 1️⃣ Create Razorpay order
      const orderRes = await api.post('/payment/create-order', {
        plan: 'PRO'
      });

      const order = orderRes.data;

      // 2️⃣ Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'VoxClone AI',
        description: 'Pro Plan Subscription',
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // 3️⃣ Verify payment
            await api.post('/payment/verify', {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              plan: 'PRO'
            });

            // 4️⃣ Update frontend state
            setUser({
              ...user,
              plan: 'PRO'
            });

            alert('Payment successful! Pro plan activated.');
          } catch (err: any) {
            alert(err.response?.data?.message || 'Payment verification failed');
          }
        },
        theme: {
          color: '#4f46e5'
        }
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Unable to start payment');
    }
  }
};


  return (
    <div className="max-w-6xl mx-auto space-y-12 py-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900">
          Simple, Transparent Pricing
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Choose the plan that's right for your voice production needs.
          Scalability built-in.
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const isCurrent = user?.plan === plan.backendPlan;

          return (
            <div
              key={plan.name}
              className={`relative flex flex-col p-8 rounded-3xl border ${
                plan.popular
                  ? 'border-indigo-200 shadow-2xl shadow-indigo-100 scale-105'
                  : 'border-slate-200 shadow-sm'
              } bg-white transition-all`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${plan.color}`}
                >
                  <plan.icon className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                  {plan.name}
                </h3>

                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-extrabold text-slate-900">
                    {plan.price}
                  </span>
                  {plan.price !== 'Custom' && (
                    <span className="text-slate-500 font-medium">
                      / month
                    </span>
                  )}
                </div>

                <p className="text-slate-500 mt-4 text-sm">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-slate-600"
                  >
                    <Check className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                disabled={isCurrent}
                onClick={() => handleAction(plan)}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  isCurrent
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                {isCurrent
                  ? 'Current Plan'
                  : plan.backendPlan === 'ENTERPRISE'
                    ? 'Contact Sales'
                    : user
                      ? `Upgrade to ${plan.name}`
                      : 'Sign in to Upgrade'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 text-center">
        <h4 className="font-bold text-slate-900 mb-2">
          Need a custom solution?
        </h4>
        <p className="text-slate-500 text-sm mb-6">
          We offer tailored packages for podcast networks, gaming studios, and
          localization firms.
        </p>
        <button
          onClick={() => navigate('/enterprise')}
          className="text-indigo-600 font-bold hover:underline"
        >
          Get in touch with our team →
        </button>
      </div>
    </div>
  );
};

export default PricingPage;
