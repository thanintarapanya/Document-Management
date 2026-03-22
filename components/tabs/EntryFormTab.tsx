'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, UploadCloud, Search, ArrowLeft } from 'lucide-react';

const steps = [
  { id: 1, label: 'Series Race' },
  { id: 2, label: 'Personal Info' },
  { id: 3, label: 'Driver & Team Info' },
  { id: 4, label: 'Document for Register' },
  { id: 5, label: 'Confirmation' }
];

const seriesOptions = ['SIAM GT', 'SIAM 1500', 'SIAM GROUP N', 'SIAM GROUP A', 'SIAM TRUCK', 'SIAM ECO'];
const gradeOptions = ['PRO', 'AM', 'GT PRO CLASS 1', 'GT PRO CLASS 2'];
const stadiumOptions = ['Chang International Circuit', 'PT Songkhla Street Circuit'];
const bloodTypes = ['A', 'B', 'AB', 'O'];

const dummyEntries = [
  { id: 1, created: '2025-06-06 00:19:50', lastUpdate: '2025-07-05 15:44:05', nameEn: 'STEVEN FITZSIMMONS', nameTh: 'STEVEN FITZSIMMONS', seriesRace: 'SIAM GT', gradeRace: 'PRO', carNumber: '6' },
  { id: 2, created: '2025-06-06 00:21:52', lastUpdate: '2025-06-16 14:05:38', nameEn: 'TIM ZIELINSKI', nameTh: 'TIM ZIELINSKI', seriesRace: 'SIAM GT', gradeRace: 'PRO', carNumber: '12' },
  { id: 3, created: '2025-06-06 00:23:20', lastUpdate: '2025-06-16 14:05:38', nameEn: 'NAT NIMMANWUDIPONG', nameTh: 'ณัฐ นิมมานวุฒิพงษ์', seriesRace: 'SIAM GT', gradeRace: 'PRO', carNumber: '14' },
  { id: 4, created: '2025-06-06 00:24:34', lastUpdate: '2025-06-16 14:05:38', nameEn: 'JAMES RUNACRES', nameTh: 'JAMES RUNACRES', seriesRace: 'SIAM GT', gradeRace: 'PRO', carNumber: '17' },
  { id: 5, created: '2025-06-06 00:25:36', lastUpdate: '-', nameEn: 'SHANE ANG', nameTh: 'SHANE ANG', seriesRace: 'SIAM GT', gradeRace: 'PRO', carNumber: '23' },
  { id: 6, created: '2025-06-06 00:27:01', lastUpdate: '-', nameEn: 'SOMCHAI VIJITR', nameTh: 'สมชาย วิจิตร์', seriesRace: 'SIAM GT', gradeRace: 'PRO', carNumber: '24' },
  { id: 7, created: '2025-06-06 00:28:02', lastUpdate: '-', nameEn: 'MONGKOL KHAMSOONG', nameTh: 'มงคล คำสูง', seriesRace: 'SIAM GT', gradeRace: 'PRO', carNumber: '26' },
  { id: 8, created: '2025-06-06 00:29:09', lastUpdate: '-', nameEn: 'TANONG BOONCHAN', nameTh: 'ทนงค์ บุญจันทร์', seriesRace: 'SIAM GT', gradeRace: 'PRO', carNumber: '27' },
];

export default function EntryFormTab() {
  const [view, setView] = useState<'list' | 'form'>('list');
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [search, setSearch] = useState('');

  const [formData, setFormData] = useState({
    // Step 1
    series: '',
    grade: '',
    carNumber: '',
    stadium: '',
    // Step 2
    nameThai: '',
    nameEnglish: '',
    dob: '',
    bloodType: '',
    nationality: '',
    idCard: '',
    address: '',
    postcode: '',
    email: '',
    mobileNo: '',
    idLine: '',
    instagram: '',
    facebook: '',
    youtube: '',
    tiktok: '',
    // Step 3
    competitionLicenseNo: '',
    categorizationGrade: '',
    issuedBy: '',
    dateOfIssued: '',
    expiryDate: '',
    carManufacturer: '',
    model: '',
    color: '',
    year: '',
    engineSize: '',
    engineCode: '',
    teamName: '',
    teamManagerName: '',
    managerMobileNo: '',
    requireTogetherForPitArea: '',
    addressForSendDocument: '',
    teamPostcode: '',
    teamMobileNo: '',
    // Step 5
    consentingParty: '',
    signDate: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setCurrentStep(1);
        setView('list');
      }, 2000);
    }, 1500);
  };

  const renderInput = (label: string, field: keyof typeof formData, type = 'text', placeholder = '', className = '') => (
    <div className={`space-y-2 ${className}`}>
      <label className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">{label}</label>
      <input 
        type={type} 
        value={formData[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-light text-slate-900 focus:outline-none focus:bg-white focus:border-slate-300 focus:ring-4 focus:ring-slate-100/50 transition-all placeholder:text-slate-300"
        placeholder={placeholder || label}
      />
    </div>
  );

  const renderSelect = (label: string, field: keyof typeof formData, options: string[], className = '') => (
    <div className={`space-y-2 ${className}`}>
      <label className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">{label}</label>
      <select 
        value={formData[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-light text-slate-900 focus:outline-none focus:bg-white focus:border-slate-300 focus:ring-4 focus:ring-slate-100/50 transition-all appearance-none"
      >
        <option value="" disabled>Select {label}</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );

  const renderFileUpload = (label: string, hint?: string) => (
    <div className="space-y-2">
      <label className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">{label}</label>
      <div className="border border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50/50 transition-colors cursor-pointer group">
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <UploadCloud className="w-5 h-5 text-slate-500" />
        </div>
        <span className="text-sm font-medium text-slate-700">Click to upload</span>
        <span className="text-xs font-light text-slate-400 mt-1">or drag and drop</span>
      </div>
      {hint && <p className="text-[11px] text-slate-400 mt-2">{hint}</p>}
    </div>
  );

  if (view === 'list') {
    const filteredEntries = dummyEntries.filter(entry => 
      entry.nameEn.toLowerCase().includes(search.toLowerCase()) || 
      entry.nameTh.includes(search) ||
      entry.carNumber.includes(search)
    );

    return (
      <motion.div 
        key="list-view"
        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-8 pb-12 max-w-[1400px] mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-light tracking-tight text-slate-900 mb-3">Entry Form</h1>
            <p className="text-slate-500 font-light text-sm">Manage and review competitor entry forms.</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search entries..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-full py-2.5 pl-11 pr-5 text-sm font-light focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all placeholder:text-slate-400"
              />
            </div>
            <button 
              onClick={() => {
                setCurrentStep(1);
                setView('form');
              }}
              className="whitespace-nowrap px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-sm font-medium transition-all shadow-sm shadow-slate-900/10"
            >
              Create Entry Form
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_2px_20px_rgb(0,0,0,0.02)] border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr>
                  <th className="px-6 py-5 font-medium text-[10px] text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-slate-100">Created</th>
                  <th className="px-6 py-5 font-medium text-[10px] text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-slate-100">Last Update</th>
                  <th className="px-6 py-5 font-medium text-[10px] text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-slate-100">Name (EN)</th>
                  <th className="px-6 py-5 font-medium text-[10px] text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-slate-100">Name (TH)</th>
                  <th className="px-6 py-5 font-medium text-[10px] text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-slate-100">Series Race</th>
                  <th className="px-6 py-5 font-medium text-[10px] text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-slate-100">Grade Race</th>
                  <th className="px-6 py-5 font-medium text-[10px] text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-slate-100">Car Number</th>
                  <th className="px-6 py-5 font-medium text-[10px] text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-slate-100 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredEntries.map((entry) => (
                    <motion.tr 
                      key={entry.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <div className="text-sm text-slate-500 font-light whitespace-pre-line">
                          {entry.created.replace(' ', '\n')}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm text-slate-500 font-light whitespace-pre-line">
                          {entry.lastUpdate.replace(' ', '\n')}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm text-slate-900 font-medium">{entry.nameEn}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm text-slate-600 font-light">{entry.nameTh}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm text-slate-600 font-light">{entry.seriesRace}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm text-slate-600 font-light">{entry.gradeRace}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm text-slate-900 font-medium">{entry.carNumber}</span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="text-[11px] uppercase tracking-wider font-medium text-slate-400 hover:text-slate-900 transition-colors">
                            View
                          </button>
                          <button className="text-[11px] uppercase tracking-wider font-medium text-slate-400 hover:text-slate-900 transition-colors">
                            Edit
                          </button>
                          <button className="text-[11px] uppercase tracking-wider font-medium text-rose-400 hover:text-rose-600 transition-colors">
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    );
  }

  // Form View
  return (
    <motion.div 
      key="form-view"
      initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-4xl mx-auto pb-12"
    >
      <div className="mb-10 flex items-center gap-6">
        <button 
          onClick={() => setView('list')}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 transition-colors text-slate-500"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-4xl font-light tracking-tight text-slate-900 mb-2">Create Entry Form</h1>
          <p className="text-slate-500 font-light text-sm">Please fill in the required information below.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_2px_20px_rgb(0,0,0,0.02)] border border-slate-100 p-8 md:p-12">
        {/* Minimal Stepper */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Step {currentStep} of {steps.length}</span>
            <span className="text-sm font-medium text-slate-900">{steps[currentStep - 1].label}</span>
          </div>
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-slate-900 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / steps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="min-h-[400px] max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderSelect('Series Race', 'series', seriesOptions)}
                  {renderSelect('Grade Race', 'grade', gradeOptions)}
                  {renderInput('Car Number', 'carNumber', 'number')}
                  {renderSelect('Stadium', 'stadium', stadiumOptions)}
                </div>
              )}

              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderInput('Name (Thai)', 'nameThai')}
                  {renderInput('Name (English)', 'nameEnglish')}
                  {renderInput('Date of Birth', 'dob', 'date')}
                  {renderSelect('Blood Type', 'bloodType', bloodTypes)}
                  {renderInput('Nationality', 'nationality')}
                  {renderInput('ID Card / Passport No.', 'idCard')}
                  <div className="md:col-span-2">
                    {renderInput('Address', 'address')}
                  </div>
                  {renderInput('Postcode', 'postcode')}
                  {renderInput('Email', 'email', 'email')}
                  {renderInput('Mobile No.', 'mobileNo', 'tel')}
                  {renderInput('ID Line', 'idLine')}
                  {renderInput('Instagram', 'instagram')}
                  {renderInput('Facebook', 'facebook')}
                  {renderInput('Youtube', 'youtube')}
                  {renderInput('Tiktok', 'tiktok')}
                </div>
              )}

              {currentStep === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 border-b border-slate-100 pb-4 mb-2">
                    <h2 className="text-lg font-light text-slate-900">Driver License</h2>
                  </div>
                  {renderInput('Competition License No.', 'competitionLicenseNo')}
                  {renderInput('Categorization Grade', 'categorizationGrade')}
                  {renderInput('Issued By', 'issuedBy')}
                  {renderInput('Date of Issued', 'dateOfIssued', 'date')}
                  {renderInput('Expiry Date', 'expiryDate', 'date')}

                  <div className="md:col-span-2 border-b border-slate-100 pb-4 mb-2 mt-4">
                    <h2 className="text-lg font-light text-slate-900">Car Info</h2>
                  </div>
                  {renderInput('Car Manufacturer', 'carManufacturer')}
                  {renderInput('Model', 'model')}
                  {renderInput('Color', 'color')}
                  {renderInput('Year', 'year', 'number')}
                  {renderInput('Engine Size (CC)', 'engineSize', 'number')}
                  {renderInput('Engine Code', 'engineCode')}

                  <div className="md:col-span-2 border-b border-slate-100 pb-4 mb-2 mt-4">
                    <h2 className="text-lg font-light text-slate-900">Team Info</h2>
                  </div>
                  {renderInput('Team Name', 'teamName')}
                  {renderInput('Team Manager Name', 'teamManagerName')}
                  {renderInput('Manager Mobile No.', 'managerMobileNo', 'tel')}
                  {renderInput('Require together for pit area (Team Name)', 'requireTogetherForPitArea')}
                  <div className="md:col-span-2">
                    {renderInput('Address for send document', 'addressForSendDocument')}
                  </div>
                  {renderInput('Postcode', 'teamPostcode')}
                  {renderInput('Mobile No.', 'teamMobileNo', 'tel')}
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderFileUpload('1. Copy of ID Card / Passport')}
                    {renderFileUpload('2. Copy of Competition License')}
                    {renderFileUpload('3. Medical Certificate')}
                    {renderFileUpload('4. Driver Photo (1 inch)')}
                    {renderFileUpload('5. Car Photo (Front, Back, Left, Right)')}
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-8">
                  <div className="bg-slate-50/50 p-8 rounded-2xl border border-slate-100 text-sm font-light text-slate-600 space-y-6 h-72 overflow-y-auto leading-relaxed">
                    <p>
                      I hereby agree not to claim any damages resulting from accidents during the competition and agree to be fully responsible for any damages, on behalf of the organizer of the competition and all parties involved in organizing the event, including the venue owner, sponsors, donors of the event, and all officials, representatives, and agents of the aforementioned, in the event of legal proceedings, claims for compensation, expenses, or costs that may arise from the litigation or legal actions, as well as claims for damages related to death, injury, loss, or other damages to the person or property of the competitor. This applies regardless of whether the damages result from or are connected with the approval of the application or participation in this competition, and regardless of whether such damages occurred due to the actions or negligence of the aforementioned legal entities, employees, agents, representatives, or other parties.
                    </p>
                    <p>
                      I consent to the company collecting, using, and/or disclosing my personal data, and I also consent to the collection of my personal data in the above-mentioned documents for the purpose of registering for the PT MAXNITRON RACING SERIES road racing competition, both for myself as a competitor and for the team. This consent is in accordance with the Personal Data Protection Act B.E. 2562 (2019) or other applicable laws and regulations. I also agree to allow the verification of the accuracy of the competition registration details.
                    </p>
                    <p className="font-medium text-slate-900">
                      I hereby sign to acknowledge and consent to the above-mentioned terms.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderInput('Consenting & Acknowledging Party', 'consentingParty')}
                    {renderInput('Sign Date', 'signDate', 'date')}
                    <div className="md:col-span-2">
                      {renderFileUpload('Digital Signature', 'Please upload your signature as an image (JPG, PNG) or PDF file')}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-100 max-w-3xl mx-auto">
          <button
            onClick={handleBack}
            disabled={currentStep === 1 || isSubmitting || isSubmitted}
            className={`px-8 py-3 rounded-full text-sm font-medium transition-all ${
              currentStep === 1 
                ? 'text-slate-300 cursor-not-allowed' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            Back
          </button>

          {currentStep < 5 ? (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-sm font-medium transition-all shadow-sm shadow-slate-900/10"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || isSubmitted}
              className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-sm font-medium transition-all shadow-sm shadow-slate-900/10 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isSubmitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Submitted
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
