'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Progress from '@radix-ui/react-progress';
import { Check, AlertCircle, Search, Filter } from 'lucide-react';

const INITIAL_TEAMS = [
  { id: 1, name: 'Porsche Team Manthey', car: '#911', class: 'GT3', items: [true, true, false, true, false] },
  { id: 2, name: 'BMW M Motorsport', car: '#42', class: 'GT3', items: [true, true, true, true, true] },
  { id: 3, name: 'Audi Sport Team WRT', car: '#32', class: 'GT3', items: [false, false, false, false, false] },
  { id: 4, name: 'Aston Martin Racing', car: '#95', class: 'GT4', items: [true, false, true, false, false] },
  { id: 5, name: 'Mercedes-AMG Team', car: '#4', class: 'GT3', items: [true, true, true, false, true] },
];

const CHECKLIST_ITEMS = [
  'Safety Tank Cert',
  'Roll Cage Cert',
  'Transponder',
  'Driver Gear',
  'Extinguisher'
];

export default function ChecklistTab() {
  const [teams, setTeams] = useState(INITIAL_TEAMS);
  const [search, setSearch] = useState('');

  const toggleItem = (teamId: number, itemIndex: number) => {
    setTeams(teams.map(team => {
      if (team.id === teamId) {
        const newItems = [...team.items];
        newItems[itemIndex] = !newItems[itemIndex];
        return { ...team, items: newItems };
      }
      return team;
    }));
  };

  const filteredTeams = teams.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.car.includes(search)
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-light tracking-tight text-slate-900 mb-2">Candidate Checklist</h1>
          <p className="text-slate-500 font-light text-sm">Pre-scrutineering compliance matrix.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search teams or cars..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-sm font-light focus:outline-none focus:border-orange-500/50 transition-colors"
            />
          </div>
          <button className="p-2 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
            <Filter className="w-4 h-4 text-slate-700" />
          </button>
        </div>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-white">
                <th className="p-4 font-medium text-sm text-slate-700 whitespace-nowrap">Team / Car</th>
                <th className="p-4 font-medium text-sm text-slate-700 whitespace-nowrap w-48">Progress</th>
                {CHECKLIST_ITEMS.map((item, i) => (
                  <th key={i} className="p-4 font-medium text-xs text-slate-500 uppercase tracking-wider text-center whitespace-nowrap">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredTeams.map((team) => {
                  const completedCount = team.items.filter(Boolean).length;
                  const progress = (completedCount / CHECKLIST_ITEMS.length) * 100;
                  const isComplete = progress === 100;

                  return (
                    <motion.tr 
                      key={team.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors group"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium text-sm border ${
                            isComplete ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30' : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}>
                            {team.car}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">{team.name}</p>
                            <p className="text-xs text-slate-500">{team.class}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Progress.Root 
                            className="relative overflow-hidden bg-slate-100 rounded-full w-full h-2 border border-slate-100" 
                            value={progress}
                          >
                            <Progress.Indicator
                              className={`h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                                isComplete ? 'bg-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]'
                              }`}
                              style={{ transform: `translateX(-${100 - progress}%)` }}
                            />
                          </Progress.Root>
                          <span className={`text-xs font-medium w-8 text-right ${isComplete ? 'text-emerald-500' : 'text-slate-500'}`}>
                            {Math.round(progress)}%
                          </span>
                        </div>
                      </td>
                      {team.items.map((isChecked, i) => (
                        <td key={i} className="p-4 text-center">
                          <button
                            onClick={() => toggleItem(team.id, i)}
                            className={`w-8 h-8 rounded-lg border flex items-center justify-center mx-auto transition-all duration-300 ${
                              isChecked 
                                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-500 shadow-[0_0_15px_rgba(52,211,153,0.2)]' 
                                : 'bg-white border-slate-200 text-transparent hover:border-slate-300'
                            }`}
                          >
                            <AnimatePresence>
                              {isChecked && (
                                <motion.div
                                  initial={{ scale: 0, rotate: -45 }}
                                  animate={{ scale: 1.1, rotate: 0 }}
                                  exit={{ scale: 0, rotate: 45 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                >
                                  <Check className="w-5 h-5" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </button>
                        </td>
                      ))}
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
