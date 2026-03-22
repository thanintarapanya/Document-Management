import { create } from 'zustand';

export type Entry = {
  id: number;
  created: string;
  lastUpdate: string;
  nameEn: string;
  nameTh: string;
  seriesRace: string;
  gradeRace: string;
  carNumber: string;
  // full form data
  formData?: any;
};

export type DeletedItem = {
  id: string;
  type: string;
  name: string;
  deletedBy: string;
  deletedAt: string;
  expires: string;
  originalData?: any;
};

interface AppState {
  entries: Entry[];
  deletedItems: DeletedItem[];
  addEntry: (entry: Omit<Entry, 'id' | 'created' | 'lastUpdate'>) => void;
  updateEntry: (id: number, entry: Partial<Entry>) => void;
  deleteEntry: (id: number) => void;
  restoreItem: (id: string) => void;
}

const initialEntries: Entry[] = [
  { id: 1, created: '2025-06-06 00:19:50', lastUpdate: '2025-07-05 15:44:05', nameEn: 'STEVEN FITZSIMMONS', nameTh: 'STEVEN FITZSIMMONS', seriesRace: 'SIAM GT', gradeRace: 'PRO', carNumber: '6' },
  { id: 2, created: '2025-06-06 00:21:52', lastUpdate: '2025-06-16 14:05:38', nameEn: 'TIM ZIELINSKI', nameTh: 'TIM ZIELINSKI', seriesRace: 'SIAM GT', gradeRace: 'PRO', carNumber: '12' },
  { id: 3, created: '2025-06-06 00:23:20', lastUpdate: '2025-06-16 14:05:38', nameEn: 'NAT NIMMANWUDIPONG', nameTh: 'ณัฐ นิมมานวุฒิพงษ์', seriesRace: 'SIAM GT', gradeRace: 'PRO', carNumber: '14' },
  { id: 4, created: '2025-06-06 00:24:34', lastUpdate: '2025-06-16 14:05:38', nameEn: 'JAMES RUNACRES', nameTh: 'JAMES RUNACRES', seriesRace: 'SIAM GT', gradeRace: 'PRO', carNumber: '17' },
  { id: 5, created: '2025-06-06 00:25:36', lastUpdate: '-', nameEn: 'SHANE ANG', nameTh: 'SHANE ANG', seriesRace: 'SIAM GT', gradeRace: 'PRO', carNumber: '23' },
  { id: 6, created: '2025-06-06 00:27:01', lastUpdate: '-', nameEn: 'SOMCHAI VIJITR', nameTh: 'สมชาย วิจิตร์', seriesRace: 'SIAM GT', gradeRace: 'PRO', carNumber: '24' },
  { id: 7, created: '2025-06-06 00:28:02', lastUpdate: '-', nameEn: 'MONGKOL KHAMSOONG', nameTh: 'มงคล คำสูง', seriesRace: 'SIAM GT', gradeRace: 'PRO', carNumber: '26' },
  { id: 8, created: '2025-06-06 00:29:09', lastUpdate: '-', nameEn: 'TANONG BOONCHAN', nameTh: 'ทนงค์ บุญจันทร์', seriesRace: 'SIAM GT', gradeRace: 'PRO', carNumber: '27' },
];

const initialDeleted: DeletedItem[] = [
  { id: 'DEL-001', type: 'Entry Form', name: 'Team Red Bull Racing', deletedBy: 'Admin', deletedAt: '2 hours ago', expires: '6 days' },
  { id: 'DEL-002', type: 'Inspection Report', name: 'Track Surface Audit - T1', deletedBy: 'Scrutineer 1', deletedAt: '1 day ago', expires: '5 days' },
  { id: 'DEL-003', type: 'Competitor Request', name: 'REQ-003 Driver Sub', deletedBy: 'System', deletedAt: '3 days ago', expires: '3 days' },
];

export const useAppStore = create<AppState>((set) => ({
  entries: initialEntries,
  deletedItems: initialDeleted,
  addEntry: (entryData) => set((state) => {
    const newId = state.entries.length > 0 ? Math.max(...state.entries.map(e => e.id)) + 1 : 1;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const newEntry: Entry = {
      ...entryData,
      id: newId,
      created: now,
      lastUpdate: '-',
    };
    return { entries: [newEntry, ...state.entries] };
  }),
  updateEntry: (id, updatedData) => set((state) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    return {
      entries: state.entries.map(e => e.id === id ? { ...e, ...updatedData, lastUpdate: now } : e)
    };
  }),
  deleteEntry: (id) => set((state) => {
    const entryToDelete = state.entries.find(e => e.id === id);
    if (!entryToDelete) return state;
    
    const newDeletedItem: DeletedItem = {
      id: `DEL-ENTRY-${entryToDelete.id}`,
      type: 'Entry Form',
      name: entryToDelete.nameEn || `Entry #${entryToDelete.id}`,
      deletedBy: 'Admin',
      deletedAt: 'Just now',
      expires: '7 days',
      originalData: entryToDelete
    };
    
    return {
      entries: state.entries.filter(e => e.id !== id),
      deletedItems: [newDeletedItem, ...state.deletedItems]
    };
  }),
  restoreItem: (id) => set((state) => {
    const itemToRestore = state.deletedItems.find(i => i.id === id);
    if (!itemToRestore) return state;
    
    if (itemToRestore.type === 'Entry Form' && itemToRestore.originalData) {
      return {
        deletedItems: state.deletedItems.filter(i => i.id !== id),
        entries: [itemToRestore.originalData, ...state.entries]
      };
    }
    
    return {
      deletedItems: state.deletedItems.filter(i => i.id !== id)
    };
  })
}));
