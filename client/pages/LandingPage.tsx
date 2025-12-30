
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Waves, Mic2, Cpu, ShieldCheck, ArrowRight, Zap, Play, Building2, Check, Sparkles } from 'lucide-react';

  const user = null; // Replace with actual user data from context, props, or state
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for exploring AI cloning.',
      features: ['1 Voice Model', '10 Minutes / month', 'Standard Quality', 'Community Support'],
      icon: Zap,
      color: 'bg-slate-100 text-slate-600',
      button: 'Current Plan',
      current: user?.plan === 'free'
    },
    {
      name: 'Pro',
      price: '$49',
      description: 'Built for creators and small studios.',
      features: ['Unlimited Voice Models', '300 Minutes / month', 'Ultra-HD Quality', 'Priority Rendering', 'Emotional Controls'],
      icon: Sparkles,
      color: 'bg-indigo-600 text-white',
      button: 'Upgrade to Pro',
      popular: true,
      current: user?.plan === 'pro'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Large scale content pipelines.',
      features: ['API Access', 'Custom Voice Ownership', 'Unlimited Minutes', 'Dedicated Manager', 'SSO & Security'],
      icon: Building2,
      color: 'bg-slate-900 text-white',
      button: 'Contact Sales',
      current: user?.plan === 'enterprise'
    }
  ];

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Waves className="text-indigo-600 w-8 h-8" />
          <span className="text-xl font-bold tracking-tight">VoxClone AI</span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          <a href="#features" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Features</a>
          <a href="#pricing" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Pricing</a>
          {/* <a href="#about" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Enterprise</a> */}
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-slate-700 hover:text-indigo-600 font-semibold px-4">Login</Link>
          <Link to="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-indigo-200 transition-all">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-8 animate-bounce">
          <Zap className="w-4 h-4" />
          <span>V3.0 Model Now Live — 99% Similarity</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight max-w-4xl mx-auto">
          Clone Any Voice with <span className="text-indigo-600 italic">Precision</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          High-fidelity AI voice cloning for creators and enterprise. Create ultra-realistic speech from just 30 seconds of audio data.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group transition-all">
            Start Cloning Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:border-indigo-200 text-slate-700 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all">
            <Play className="w-5 h-5 text-indigo-600" />
            Watch Demo
          </button>
        </div>

        {/* Hero Image Mockup */}
        <div className="mt-20 relative max-w-5xl mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl blur-3xl opacity-20"></div>
            <img 
                src="https://picsum.photos/seed/voxclone/1200/600" 
                alt="Product Dashboard Mockup" 
                className="relative w-full h-[500px] object-cover rounded-2xl border border-slate-200 shadow-2xl"
            />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-slate-50 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why choose VoxClone?</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Our state-of-the-art neural networks capture the subtle nuances of speech, emotion, and prosody.</p>
          </div>
          {/* Enterprise Features   */}
          <section id="pricing">

              <div className="max-w-6xl mx-auto space-y-12 py-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900">Simple, Transparent Pricing</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">Choose the plan that's right for your voice production needs. Scalability built-in.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`relative flex flex-col p-8 rounded-3xl border ${
                plan.popular ? 'border-indigo-200 shadow-2xl shadow-indigo-100 scale-105' : 'border-slate-200 shadow-sm'
            } bg-white transition-all`}
          >
            {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Most Popular
                </div>
            )}

            <div className="mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${plan.color}`}>
                    <plan.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-slate-500 font-medium">/ month</span>}
                </div>
                <p className="text-slate-500 mt-4 text-sm">{plan.description}</p>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                        <Check className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                        {feature}
                    </li>
                ))}
            </ul>

            <button 
                type="button"
                onClick={() => plan.name === 'Enterprise' && navigate('/enterprise')}
                disabled={plan.current}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                    plan.current 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : plan.popular
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
            >
                {plan.button}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 text-center">
        <h4 className="font-bold text-slate-900 mb-2">Need a custom solution?</h4>
        <p className="text-slate-500 text-sm mb-6">We offer tailored packages for podcast networks, gaming studios, and localization firms.</p>
        <button onClick={() => navigate('/enterprise')} className="text-indigo-600 font-bold hover:underline">Get in touch with our team &rarr;</button>
      </div>
    </div>
    </section>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "One-Shot Cloning", icon: Mic2, desc: "Only requires 30 seconds of source audio to build a perfect digital twin." },
              { title: "Emotion Control", icon: Cpu, desc: "Adjust pitch, tone, and emotional intensity to fit your project perfectly." },
              { title: "Enterprise Security", icon: ShieldCheck, desc: "Built-in watermarking and strict authentication protocols for IP protection." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-xl transition-shadow group">
                <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
                <Waves className="text-indigo-400 w-8 h-8" />
                <span className="text-2xl font-bold">VoxClone AI</span>
            </div>
            <div className="flex gap-8 text-slate-400 text-sm">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
                <a href="#" className="hover:text-white">API Reference</a>
            </div>
            <p className="text-slate-500 text-sm">© 2024 VoxClone AI Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
