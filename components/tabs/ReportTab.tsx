'use client';

import { motion } from 'motion/react';
import { FileText, Download, Printer, CheckCircle, XCircle } from 'lucide-react';

const REPORTS = [
  { id: 'RPT-001', team: 'Porsche Team Manthey', car: '#911', class: 'GT3', status: 'Passed', date: '2026-03-22', weight: '1250kg', restrictor: '38mm' },
  { id: 'RPT-002', team: 'BMW M Motorsport', car: '#42', class: 'GT3', status: 'Passed', date: '2026-03-22', weight: '1265kg', restrictor: '39mm' },
  { id: 'RPT-003', team: 'Audi Sport Team WRT', car: '#32', class: 'GT3', status: 'Failed', date: '2026-03-21', weight: '1245kg (Under)', restrictor: '38mm' },
  { id: 'RPT-004', team: 'Aston Martin Racing', car: '#95', class: 'GT4', status: 'Pending', date: '2026-03-21', weight: '-', restrictor: '-' },
];

export default function ReportTab() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-light tracking-tight text-slate-900 mb-2">Scrutineering Reports</h1>
          <p className="text-slate-500 font-light text-sm">Post-inspection compliance documents.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors text-sm text-slate-700">
            <Download className="w-4 h-4" /> Export All
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-500 text-slate-900 rounded-xl transition-all shadow-[0_0_15px_rgba(249,115,22,0.2)] text-sm font-medium">
            <Printer className="w-4 h-4" /> Print Batch
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REPORTS.map((report, i) => (
          <motion.div 
            key={report.id}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ delay: i * 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium text-sm border ${
                  report.status === 'Passed' ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30' :
                  report.status === 'Failed' ? 'bg-rose-500/20 text-rose-500 border-rose-500/30' :
                  'bg-amber-500/20 text-amber-500 border-amber-500/30'
                }`}>
                  {report.car}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-800">{report.id}</h3>
                  <p className="text-xs text-slate-500">{report.date}</p>
                </div>
              </div>
              {report.status === 'Passed' ? (
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              ) : report.status === 'Failed' ? (
                <XCircle className="w-5 h-5 text-rose-500" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
              )}
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-sm font-medium text-slate-900">{report.team}</p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Class</p>
                  <p className="text-sm text-slate-700">{report.class}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Weight</p>
                  <p className={`text-sm ${report.weight.includes('Under') ? 'text-rose-500' : 'text-slate-700'}`}>{report.weight}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Restrictor</p>
                  <p className="text-sm text-slate-700">{report.restrictor}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Seals</p>
                  <p className="text-sm text-emerald-500">Intact</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-700 transition-colors flex items-center justify-center gap-2">
                <FileText className="w-3 h-3" /> View PDF
              </button>
              <button className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-700 transition-colors flex items-center justify-center gap-2">
                <Printer className="w-3 h-3" /> Print
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
