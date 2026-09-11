/* Doctor profiles live under /doctors/, alongside the listing page, the same
 * way service pages sit under /services/. Build every link with doctorHref()
 * rather than writing the path by hand. */
export const DOCTORS_BASE = '/doctors'

export function doctorHref(slug: string): string {
  return `${DOCTORS_BASE}/${slug}/`
}

export const doctor = {
  name: 'Dr Gaurang Deshpande',
  shortName: 'Dr Deshpande',
  /** URL segment under /doctors/. */
  slug: 'dr-gaurang-deshpande',
  title: 'Consultant Rheumatologist & Clinical Immunologist',
  degrees: ['MBBS', 'MD Internal Medicine', 'DM Clinical Immunology & Rheumatology'],
  /** Displayed as “8+ years”. Experience in clinical immunology and rheumatology. */
  yearsOfExperience: 8,

  intro:
    'Dr Gaurang Deshpande is a Consultant Rheumatologist and Clinical Immunologist with specialised training in the evaluation and management of rheumatological, autoimmune and immune-mediated diseases.',

  training: [
    {
      qualification: 'MBBS',
      institution: 'Dr. Panjabrao Alias Bhausaheb Deshmukh Memorial Medical College, Amravati',
    },
    {
      qualification: 'MD Internal Medicine',
      institution: 'Kasturba Medical College, Mangalore',
    },
    {
      qualification: 'DM Clinical Immunology & Rheumatology',
      institution: "Nizam's Institute of Medical Sciences (NIMS), Hyderabad",
    },
  ],

  /**
   * Consultation languages. Bangalore is multilingual and patients routinely
   * ask before booking, so this is worth stating plainly.
   */
  languages: ['English', 'Hindi', 'Kannada', 'Marathi', 'Telugu'],

  /** Professional bodies. Only stated where the membership is specific. */
  memberships: ['Indian Rheumatology Association'],

  /**
   * Presentations, papers and academic contributions. Listed newest first.
   * `note` marks a distinction where one was awarded.
   */
  academic: [
    {
      title:
        'Factors predicting flares in lupus after attainment of low lupus disease activity state (LLDAS)',
      venue: 'IRACON 2023, Hyderabad',
      note: 'First place, e-poster abstract session',
    },
    {
      title: 'Management of septic arthritis',
      venue: 'Academic CME, NIMS Hyderabad, 2023',
      note: 'Panellist',
    },
    {
      title: 'Atypical presentation of necrotising vasculitis in lupus',
      venue: 'South Zone IRACON 2022, Trivandrum',
      note: 'Oral presentation',
    },
    {
      title:
        'COVID-19 infection in patients with autoimmune rheumatic disease: report from the outpatient setting of a tertiary care hospital',
      venue: '',
      note: '',
    },
    {
      title: 'MRI reveals cascade sign in parenchymal neuro-Behçet’s syndrome',
      venue: '',
      note: '',
    },
    {
      title: 'Hyper-IgE syndrome: case series with review of literature',
      venue: 'PID CME 2019, Hyderabad',
      note: 'Oral paper presentation',
    },
    {
      title: 'Unique presentation of Takayasu’s arteritis',
      venue: 'KAPICON 2016, Mysore',
      note: 'Poster presentation',
    },
  ] as ReadonlyArray<{ title: string; venue: string; note: string }>,

  interests: [
    {
      title: 'Rheumatoid Arthritis',
      body: 'Diagnosis, disease activity assessment, treat-to-target management and long-term prevention of disability, including juvenile arthritis.',
    },
    {
      title: 'Osteoarthritis',
      body: 'Comprehensive management of pain, mobility, function and long-term joint health.',
    },
    {
      title: 'Autoimmune & Inflammatory Diseases',
      body: 'Including connective tissue diseases, inflammatory arthritis, vasculitis, myositis and other systemic autoimmune conditions.',
    },
    {
      title: 'Clinical Immunology',
      body: 'Evaluation of suspected immune-mediated disease, immune-related symptoms and complex diagnostic presentations.',
    },
    {
      title: 'Allergy & Immune-Related Concerns',
      body: 'Assessment of suspected allergic or immune-mediated symptoms, and clarification of whether an immune mechanism is actually present.',
    },
    {
      title: 'Inflammatory Skin, Muscle & Joint Disorders',
      body: 'Assessment of patients where skin, muscle and musculoskeletal manifestations may be part of a broader inflammatory or autoimmune disease.',
    },
    {
      title: 'Inflammatory Spinal Disorders',
      body: 'Evaluation and management of inflammatory back pain and spondyloarthritis-spectrum diseases.',
    },
    {
      title: 'Autoimmune Haematological & Neurological Disorders',
      body: 'Assessment of suspected immune-mediated blood and neurological disorders, in collaboration with relevant specialists where required.',
    },
    {
      title: 'Osteoporosis & Bone Health',
      body: 'Assessment and management of osteoporosis, fragility fractures and other metabolic bone disease.',
    },
    {
      title: 'Rheumatology in Transplant & Cancer Care',
      body: 'Management of rheumatological and immune-related problems in renal transplant recipients and in patients undergoing cancer treatment.',
    },
  ],

  /** The personal note. Set as displayed lines — the line breaks are load-bearing. */
  note: {
    pullquote:
      'Not every symptom is an autoimmune disease. But every unexplained concern deserves a thoughtful evaluation.',
    paragraphs: [
      'Patients are often told that they have “weak immunity”, “high immunity”, “allergy” or an “autoimmune problem”. Sometimes these descriptions are correct. Sometimes they are not.',
      'My approach is to first understand the patient’s symptoms, timeline, examination findings and available investigations, and then determine whether there is evidence of an immune-mediated disease.',
      'I believe good rheumatology is not simply about prescribing medicines. It is about understanding the patient, making the diagnosis carefully, explaining the disease clearly, and choosing treatment that fits both the disease and the person.',
      'For patients living with chronic disease, the goal should be to make the disease less visible in everyday life — to preserve mobility, independence, work and quality of life. That is the philosophy behind DIRA.',
    ],
  },
} as const
