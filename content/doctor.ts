import { TODO } from './clinic'

export const doctor = {
  name: 'Dr Gaurang Deshpande',
  shortName: 'Dr Deshpande',
  title: 'Consultant Rheumatologist & Clinical Immunologist',
  degrees: ['MBBS', 'MD Internal Medicine', 'DM Clinical Immunology & Rheumatology'],
  yearsAsConsultant: 5,

  intro:
    'Dr Gaurang Deshpande is a Consultant Rheumatologist and Clinical Immunologist with specialised training in the evaluation and management of rheumatological, autoimmune and immune-mediated diseases.',

  training: [
    {
      qualification: 'MBBS',
      /** TODO Exact official name of the medical college, as it should be displayed. */
      institution: TODO,
      marker: 'ADD MBBS COLLEGE NAME',
    },
    {
      qualification: 'MD Internal Medicine',
      institution: 'Kasturba Medical College, Mangalore',
      marker: '',
    },
    {
      qualification: 'DM Clinical Immunology & Rheumatology',
      institution: "Nizam's Institute of Medical Sciences (NIMS), Hyderabad",
      marker: '',
    },
  ],

  interests: [
    {
      title: 'Rheumatoid Arthritis',
      body: 'Diagnosis, disease activity assessment, treat-to-target management and long-term prevention of disability.',
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
