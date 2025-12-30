import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../App';

const EnterprisePage: React.FC = () => {
  const { user } = useAuth();
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [name, setName] = useState(user?.name || '');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/enterprise/contact', { name, email, company, message });
      alert('Thanks — our sales team will reach out soon.');
      setCompany('');
      setMessage('');
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100">
          <Building2 className="w-8 h-8 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold">Enterprise Solutions</h1>
          <p className="text-slate-500 mt-1">Custom voice solutions, SSO, dedicated support, and flexible SLAs for teams of any size.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold mb-3">Why choose Enterprise?</h3>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-3"><strong className="text-indigo-600">SSO & Security:</strong> SAML / OIDC, audit logs, and SOC-ready controls.</li>
            <li className="flex items-start gap-3"><strong className="text-indigo-600">Dedicated Support:</strong> SLA-backed response, onboarding & voice engineers.</li>
            <li className="flex items-start gap-3"><strong className="text-indigo-600">Custom Integrations:</strong> Private API access and on-prem / VPC options.</li>
            <li className="flex items-start gap-3"><strong className="text-indigo-600">Ownership & Compliance:</strong> Custom voice ownership and compliance add-ons for regulated industries.</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold mb-4">Contact Sales</h3>

          <label className="block mb-3">
            <span className="text-sm text-slate-600">Full name</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>

          <label className="block mb-3">
            <span className="text-sm text-slate-600">Company email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>

          <label className="block mb-3">
            <span className="text-sm text-slate-600">Company</span>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>

          <label className="block mb-4">
            <span className="text-sm text-slate-600">What are you looking to build?</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-lg font-bold text-white ${loading ? 'bg-slate-300' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {loading ? 'Sending…' : 'Contact Sales'}
            </button>
            <button
              type="button"
              onClick={() => { setCompany(''); setMessage(''); }}
              className="px-4 py-2 rounded-lg border border-slate-200 text-sm"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-sm text-slate-600">
        <strong>Note:</strong> After you submit, a sales engineer will reach out to schedule a short technical scoping call and provide a tailored pricing proposal.
      </div>
    </div>
  );
};

export default EnterprisePage;
