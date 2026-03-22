'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, ChevronLeft, UploadCloud, FileText } from 'lucide-react';

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

export default function EntryFormTab() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      }, 3000);
    }, 1500);
  };

  const renderInput = (label: string, field: keyof typeof formData, type = 'text', placeholder = '', className = '') => (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-xs text-slate-500 font-medium">{label}</label>
      <input 
        type={type} 
        value={formData[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-light text-slate-900 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all placeholder:text-slate-400"
        placeholder={placeholder || label}
      />
    </div>
  );

  const renderSelect = (label: string, field: keyof typeof formData, options: string[], className = '') => (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-xs text-slate-500 font-medium">{label}</label>
      <select 
        value={formData[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-light text-slate-900 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all appearance-none"
      >
        <option value="" disabled>Select {label}</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );

  const renderRadioGroup = (label: string, field: keyof typeof formData, options: string[]) => (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-slate-900">{label}</h3>
      <div className="space-y-2">
        {options.map(opt => (
          <div 
            key={opt}
            onClick={() => handleChange(field, opt)}
            className={`border rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-colors ${formData[field] === opt ? 'border-orange-500 bg-orange-50/50' : 'border-slate-200 hover:border-orange-500/30'}`}
          >
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData[field] === opt ? 'border-orange-500' : 'border-slate-300'}`}>
              {formData[field] === opt && <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
            </div>
            <span className="text-sm font-light text-slate-800">{opt}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFileUpload = (label: string, hint?: string) => (
    <div className="space-y-1.5">
      <label className="text-xs text-slate-500 font-medium">{label}</label>
      <div className="flex items-center gap-2">
        <label className="flex-shrink-0 cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm px-4 py-2.5 rounded-lg transition-colors font-medium">
          Choose File
          <input type="file" className="hidden" />
        </label>
        <div className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-light text-slate-400 truncate">
          No file chosen
        </div>
      </div>
      {hint && <p className="text-xs text-rose-500 mt-1">{hint}</p>}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-tight text-slate-900 mb-2">Create Entry Form</h1>
      </div>

      <div className="glass-panel p-8">
        {/* Stepper */}
        <div className="relative mb-12">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-orange-500 -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
          <div className="relative z-10 flex justify-between">
            {steps.map((step) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              return (
                <div key={step.id} className="flex flex-col items-center gap-2">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 
                      isCompleted ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                  </div>
                  <span className={`text-xs font-medium ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && (
                <div className="space-y-8">
                  <h2 className="text-lg font-medium text-orange-500 mb-6">Series and Grade Race</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {renderRadioGroup('Series', 'series', seriesOptions)}
                    {renderRadioGroup('Grades', 'grade', gradeOptions)}
                    <div className="space-y-6">
                      {renderInput('Car Number', 'carNumber')}
                      {renderSelect('Stadium', 'stadium', stadiumOptions)}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-lg font-medium text-orange-500 mb-6">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderInput('Name In Thai', 'nameThai')}
                      {renderInput('Name In English', 'nameEnglish')}
                      {renderInput('Date of Birth', 'dob', 'date')}
                      {renderSelect('Blood Type', 'bloodType', bloodTypes)}
                      {renderInput('Nationality', 'nationality')}
                      {renderInput('I.D.Card No. / Passport No.', 'idCard')}
                      {renderInput('Address', 'address', 'text', '', 'md:col-span-2')}
                      {renderInput('Postcode', 'postcode')}
                    </div>
                  </div>
                  <div className="pt-6 border-t border-slate-100">
                    <h2 className="text-lg font-medium text-orange-500 mb-6">Contact</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {renderInput('Email', 'email', 'email')}
                      {renderInput('Mobile No.', 'mobileNo')}
                      {renderInput('ID Line', 'idLine')}
                      {renderInput('Instagram / IG', 'instagram')}
                      {renderInput('Facebook', 'facebook')}
                      {renderInput('Youtube', 'youtube')}
                      {renderInput('Tiktok', 'tiktok')}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-lg font-medium text-orange-500 mb-6">Driver Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {renderInput('Competition License No.', 'competitionLicenseNo')}
                      {renderInput('Categorization / Grade', 'categorizationGrade')}
                      {renderInput('Issued By', 'issuedBy')}
                      {renderInput('Date of Issued', 'dateOfIssued', 'date')}
                      {renderInput('Expiry Date', 'expiryDate', 'date')}
                      {renderInput('Car Manufacturer', 'carManufacturer')}
                      {renderInput('Model', 'model')}
                      {renderInput('Color', 'color')}
                      {renderInput('Year', 'year')}
                      {renderInput('Engine Size (CC.)', 'engineSize')}
                      {renderInput('Engine Code', 'engineCode')}
                    </div>
                  </div>
                  <div className="pt-6 border-t border-slate-100">
                    <h2 className="text-lg font-medium text-orange-500 mb-6">Team Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {renderInput('Team Name', 'teamName')}
                      {renderInput('Team Manager\'s Name', 'teamManagerName')}
                      {renderInput('Mobile No.', 'managerMobileNo')}
                      {renderInput('Require together for pit area', 'requireTogetherForPitArea', 'text', '', 'md:col-span-3')}
                      {renderInput('Address for send document', 'addressForSendDocument', 'text', '', 'md:col-span-3')}
                      {renderInput('Postcode', 'teamPostcode')}
                      {renderInput('Mobile No.', 'teamMobileNo')}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-8">
                  <h2 className="text-lg font-medium text-orange-500 mb-6">Upload Document for Register</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {renderFileUpload('Driver\'s Photo (Wear A Racing Suit)', 'File Size not less than 1 MB.')}
                    {renderFileUpload('Copy of ID.Card or A Copy of Passport')}
                    {renderFileUpload('Copy of Driver\'s License')}
                    {renderFileUpload('Slip for payment')}
                    {renderFileUpload('Copy of Book Bank')}
                    {renderFileUpload('Other Documents')}
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-8">
                  <h2 className="text-lg font-medium text-orange-500 mb-6">Indemnity Declaration / Consent for Personal Data Collection, Use, and Disclosure</h2>
                  
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-sm font-light text-slate-600 space-y-4 h-64 overflow-y-auto">
                    <p>
                      I hereby agree not to claim any damages resulting from accidents during the competition and agree to be fully responsible for any damages, on behalf of the organizer of the competition and all parties involved in organizing the event, including the venue owner, sponsors, donors of the event, and all officials, representatives, and agents of the aforementioned, in the event of legal proceedings, claims for compensation, expenses, or costs that may arise from the litigation or legal actions, as well as claims for damages related to death, injury, loss, or other damages to the person or property of the competitor. This applies regardless of whether the damages result from or are connected with the approval of the application or participation in this competition, and regardless of whether such damages occurred due to the actions or negligence of the aforementioned legal entities, employees, agents, representatives, or other parties.
                    </p>
                    <p>
                      I consent to the company collecting, using, and/or disclosing my personal data, and I also consent to the collection of my personal data in the above-mentioned documents for the purpose of registering for the PT MAXNITRON RACING SERIES road racing competition, both for myself as a competitor and for the team. This consent is in accordance with the Personal Data Protection Act B.E. 2562 (2019) or other applicable laws and regulations. I also agree to allow the verification of the accuracy of the competition registration details.
                    </p>
                    <p>
                      I hereby sign to acknowledge and consent to the above-mentioned terms.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderInput('Consenting & Acknowledging Party', 'consentingParty')}
                    {renderInput('Sign Date', 'signDate', 'date')}
                    <div className="md:col-span-2">
                      {renderFileUpload('Digital Signature (Upload Image or PDF)', 'Please upload your signature as an image (JPG, PNG) or PDF file')}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-slate-100">
          <button
            onClick={handleBack}
            disabled={currentStep === 1 || isSubmitting || isSubmitted}
            className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
              currentStep === 1 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-slate-500 hover:bg-slate-600 text-white shadow-md shadow-slate-500/20'
            }`}
          >
            Back
          </button>

          {currentStep < 5 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-md shadow-orange-500/20"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || isSubmitted}
              className="px-8 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-md shadow-orange-500/20 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isSubmitted ? (
                <>
                  <CheckCircle2 className="w-5 h-5" /> Submitted
                </>
              ) : (
                'Submit'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
