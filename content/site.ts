/* Navigation, services, conditions, approach, FAQ and referral content.
 * Trimmed from the source document for the web: each condition list appears
 * once, in the section it belongs to. */

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About DIRA' },
  { href: '/dr-gaurang-deshpande/', label: 'Dr Deshpande' },
  { href: '/conditions/', label: 'Conditions' },
  { href: '/services/', label: 'Services' },
  { href: '/for-doctors/', label: 'For Doctors' },
  { href: '/patient-education/', label: 'Patient Education' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/contact/', label: 'Contact' },
] as const

/* ---------------------------------------------------------------- triage --
 * The homepage's most important block: most visitors do not have a diagnosis.
 * This tells them they are in the right place before anything else. */
export const triage = [
  {
    heading: 'Joint & musculoskeletal symptoms',
    items: [
      'Joint pain or swelling',
      'Morning stiffness',
      'Recurrent arthritis',
      'Back or spinal pain',
      'Tendon or enthesis-related symptoms',
      'Muscle pain or weakness',
      'Persistent unexplained musculoskeletal symptoms',
    ],
  },
  {
    heading: 'Skin & immune-related problems',
    items: [
      'Recurrent rashes',
      'Unexplained itching or swelling',
      'Inflammatory skin conditions with possible systemic involvement',
      'Skin changes where an autoimmune or inflammatory disorder is suspected',
    ],
  },
  {
    heading: 'Allergy & immune concerns',
    items: [
      'Suspected or recurrent allergic symptoms',
      'Food-related reactions or concerns',
      'Drug-related reactions',
      'Abnormal allergy or immune-related blood tests',
      'Concerns about “weak immunity” or “overactive immunity”',
      'Suspected immune dysfunction',
    ],
  },
  {
    heading: 'Complex or unclear cases',
    items: [
      'A positive ANA or other autoimmune test',
      'Elevated inflammatory markers without a clear explanation',
      'Recurrent fever or unexplained inflammation',
      'Multiple unexplained symptoms involving different organs',
      'Difficult-to-diagnose rheumatological conditions',
      'Second opinions',
    ],
  },
] as const

/* -------------------------------------------------------------- services -- */
export const services = [
  {
    slug: 'consultation',
    title: 'Specialist Consultation',
    summary:
      'Comprehensive evaluation for established, suspected and complex rheumatological or immune-related conditions.',
    body: [],
  },
  {
    slug: 'second-opinions',
    title: 'Second Opinions',
    summary:
      'A fresh specialist assessment, where an existing diagnosis or treatment plan needs clarifying.',
    body: [
      'A second opinion can help answer questions that are difficult to resolve in a single consultation:',
    ],
    questions: [
      'Is this really autoimmune?',
      'Is the diagnosis correct?',
      'Do I need all these investigations?',
      'Is my treatment appropriate?',
      'What should happen next?',
    ],
  },
  {
    slug: 'immunology-allergy',
    title: 'Clinical Immunology & Allergy Evaluation',
    summary:
      'Assessment of suspected immune-mediated and allergic conditions, with emphasis on identifying whether the immune system is actually responsible for the symptoms.',
    body: [
      'The aim is to avoid both missing a genuine disorder and over-investigating symptoms that have another explanation.',
    ],
  },
  {
    slug: 'rheumatology',
    title: 'Rheumatology Care',
    summary:
      'Diagnosis and management of inflammatory and autoimmune diseases affecting joints, muscles, skin, spine, blood, nerves, lungs, kidneys and other organs.',
    body: [],
  },
  {
    slug: 'chronic-pain',
    title: 'Chronic Pain Management',
    summary:
      'Pain that continues for months or years can affect almost every aspect of life. The cause is assessed before the treatment is chosen.',
    body: ['We assess whether pain is:'],
    questions: [
      'Inflammatory',
      'Mechanical',
      'Musculoskeletal',
      'Nerve-related',
      'Disease-associated',
      'Or due to a combination of factors',
    ],
    closing:
      'Treatment may combine medical management, physical rehabilitation, lifestyle measures and other appropriate interventions. The aim is not simply to reduce a pain score — it is to restore function.',
  },
  {
    slug: 'physiotherapy',
    title: 'Physiotherapy & Rehabilitation',
    summary:
      'For patients requiring structured rehabilitation, physiotherapy can be integrated with medical management.',
    body: ['The focus may include:'],
    questions: [
      'Improving mobility',
      'Strengthening',
      'Joint protection',
      'Functional recovery',
      'Posture and movement',
      'Maintaining independence',
      'Safe return to activity',
    ],
  },
  {
    slug: 'laboratory',
    title: 'Laboratory & Diagnostic Support',
    summary:
      'Access to appropriate laboratory investigations and diagnostic support for evaluation and monitoring.',
    body: [
      'The principle is simple: test when the clinical question requires it — not simply because a test is available.',
    ],
  },
  {
    slug: 'pharmacy',
    title: 'Pharmacy Support',
    summary:
      'Convenient access to prescribed medications where available, helping improve continuity and reduce fragmentation of care.',
    body: [],
  },
  {
    slug: 'multidisciplinary',
    title: 'Multidisciplinary Care',
    summary:
      'Some immune-mediated diseases require input from more than one speciality. Where appropriate, DIRA coordinates that care.',
    body: ['Coordination may involve:'],
    questions: [
      'Pulmonology',
      'Nephrology',
      'Dermatology',
      'Neurology',
      'Gastroenterology',
      'Paediatrics',
      'Cardiology',
      'Orthopaedics',
      'Pain & Rehabilitation',
      'Psychology',
    ],
  },
] as const

/* ------------------------------------------------------------ conditions -- */
export const conditionGroups = [
  {
    id: 'rheumatology',
    title: 'Rheumatology',
    intro:
      'Inflammatory and autoimmune diseases affecting the joints, spine, muscles and connective tissue.',
    items: [
      'Rheumatoid arthritis',
      'Osteoarthritis',
      'Spondyloarthritis',
      'Psoriatic arthritis',
      'Gout and other crystal arthritis',
      'Connective tissue diseases',
      'Lupus',
      'Sjögren’s disease',
      'Systemic sclerosis',
      'Inflammatory myositis',
      'Vasculitis',
      'Other inflammatory and autoimmune rheumatic diseases',
    ],
  },
  {
    id: 'immunology',
    title: 'Immunology',
    intro:
      'Immune-mediated disease, immune dysregulation, and multisystem presentations where an immune cause is being considered.',
    items: [
      'Immune-mediated diseases',
      'Suspected autoimmune disorders',
      'Immune dysregulation',
      'Unexplained inflammatory conditions',
      'Autoimmune blood disorders',
      'Autoimmune neurological conditions',
      'Complex multisystem immune-related disorders',
    ],
  },
  {
    id: 'allergy',
    title: 'Allergy & Immune Concerns',
    intro:
      'Suspected allergic disease, and the common question of whether symptoms are allergic at all.',
    items: [
      'Allergic symptoms',
      'Recurrent unexplained reactions',
      'Drug-related reactions',
      'Food-related concerns',
      'Skin and respiratory allergic symptoms',
      'Abnormal allergy or immune investigations',
      'Uncertainty regarding immune or allergic disease',
    ],
  },
  {
    id: 'pain',
    title: 'Pain & Musculoskeletal Problems',
    intro:
      'Pain and musculoskeletal difficulty, whether or not an inflammatory disease is present.',
    items: [
      'Chronic pain',
      'Mechanical joint pain',
      'Persistent back pain',
      'Muscle pain',
      'Soft-tissue pain',
      'Functional musculoskeletal problems',
    ],
  },
] as const

/* -------------------------------------------------------------- approach -- */
export const approach = [
  {
    title: 'Listen',
    body: 'Understand the symptoms, concerns, expectations and previous medical journey.',
  },
  {
    title: 'Assess',
    body: 'Review history, examination findings and previous investigations carefully.',
  },
  {
    title: 'Clarify',
    body: 'Determine whether the symptoms fit an autoimmune, inflammatory, allergic, mechanical or another medical condition.',
  },
  {
    title: 'Treat',
    body: 'Use evidence-based pharmacological and non-pharmacological treatment appropriate to the diagnosis.',
  },
  {
    title: 'Monitor',
    body: 'Track disease activity, treatment response, safety and long-term risks.',
  },
  {
    title: 'Rebuild',
    body: 'Focus on mobility, function, confidence, independence and quality of life.',
  },
] as const

/* --------------------------------------------------------- the difference -- */
export const difference = [
  { not: 'We don’t begin with the assumption.', is: 'We begin with the patient.' },
  {
    not: 'We don’t believe every abnormal test needs treatment.',
    is: 'We interpret investigations in the clinical context.',
  },
  {
    not: 'We don’t define success only by laboratory numbers.',
    is: 'We look at function and quality of life too.',
  },
  {
    not: 'We don’t want chronic disease to become the patient’s identity.',
    is: 'We want patients to live beyond their disease.',
  },
] as const

/* ------------------------------------------------------------- referrals -- */
export const referralReasons = [
  'Unexplained inflammatory disease',
  'Positive autoimmune serology',
  'Possible connective tissue disease',
  'Suspected vasculitis',
  'Inflammatory arthritis',
  'Unexplained muscle disease',
  'Possible autoimmune neurological disease',
  'Autoimmune or inflammatory skin disease',
  'Complex multisystem illness',
  'Unexplained pain or fatigue where inflammatory disease is being considered',
  'Diagnostic uncertainty requiring a rheumatology or immunology opinion',
] as const

/* ----------------------------------------------------- patient education -- */
export const educationPoints = [
  'What their disease is',
  'What it is not',
  'Why treatment is required',
  'What improvement can realistically be expected',
  'What warning signs to watch for',
  'How medicines should be monitored',
  'What lifestyle and rehabilitation measures can help',
] as const

/* ------------------------------------------------------------------- FAQ -- */
export const faqs = [
  {
    q: 'Do I need a confirmed autoimmune disease to consult DIRA?',
    a: 'No. Patients with symptoms or concerns where an immune or inflammatory disease is suspected can also be evaluated.',
  },
  {
    q: 'Does a positive ANA mean I have an autoimmune disease?',
    a: 'Not necessarily. Autoimmune tests need to be interpreted in the context of symptoms, examination and other findings.',
  },
  {
    q: 'Can I come for a second opinion?',
    a: 'Yes. DIRA welcomes patients seeking clarification of an existing diagnosis or treatment plan.',
  },
  {
    q: 'Do you treat chronic pain even if it is not autoimmune?',
    a: 'Yes. The cause of pain is assessed first, and management may include medical treatment, physiotherapy, rehabilitation and other appropriate approaches.',
  },
  {
    q: 'Do you treat allergy?',
    a: 'DIRA evaluates suspected allergic and immune-related conditions, and helps determine whether symptoms are actually due to an allergic or immune mechanism.',
  },
  {
    q: 'Do you see children?',
    a: 'Paediatric patients with suspected rheumatological or immune-related conditions can be evaluated, with appropriate paediatric multidisciplinary support where required.',
  },
  {
    q: 'Can other doctors refer patients to DIRA?',
    a: 'Yes. DIRA is open to referrals from physicians and specialists for rheumatological, immunological and diagnostically uncertain cases.',
  },
] as const
