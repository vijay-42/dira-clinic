/* Service detail pages.
 *
 * URLs come from the site-structure sheet. Two of the entries there were
 * written as plain phrases rather than slugs, so they are slugified here:
 *
 *   "immunology & rheumatology treatment in bangalore"
 *       -> immunology-and-rheumatology-treatment-in-bangalore   ("&" is a
 *          reserved character in a URL and would have to be percent-encoded)
 *   "physiotherapy clinic in bangalore"  -> physiotherapy-clinic-in-bangalore
 *   "pharmacy service in bangalore"      -> pharmacy-service-in-bangalore
 *   "day care infusion diagnostics in indiranagar"
 *       -> day-care-infusion-diagnostics-in-indiranagar
 *
 * These sit at the top level (/arthritis-treatment-in-bangalore/) rather than
 * under /services/, matching the sheet and targeting the search phrase directly.
 * Changing that later means adding redirects, so it is worth confirming.
 *
 * Compliance note: no superlatives, no success rates, no testimonials, no cure
 * claims anywhere in this file. See docs/dira-plan.html, Section 08.
 */

export type ServicePage = {
  slug: string
  /** Short label for the navigation menu. */
  navLabel: string
  /** H1 on the page. */
  title: string
  /** <title> tag. Kept under ~60 characters where possible. */
  metaTitle: string
  metaDescription: string
  eyebrow: string
  lede: string
  /** Which of the four condition families colours this page. */
  cat: 'cat-brand' | 'cat-teal' | 'cat-fresh' | 'cat-plum'
  icon: 'joint' | 'immune' | 'rehab' | 'pharmacy' | 'lab'
  sections: {
    heading: string
    body?: string[]
    list?: string[]
  }[]
  /** Short answers shown as an FAQ block, also emitted as FAQPage schema. */
  faqs: { q: string; a: string }[]
}

export const servicePages: ServicePage[] = [
  {
    slug: 'arthritis-treatment-in-bangalore',
    navLabel: 'Arthritis & Allergy',
    title: 'Arthritis & Allergy Treatment',
    metaTitle: 'Arthritis Treatment in Bangalore',
    metaDescription:
      'Assessment and treatment of arthritis and allergic conditions in Indiranagar, Bangalore. Rheumatoid arthritis, osteoarthritis, gout, psoriatic arthritis, and suspected allergy — evaluated by a consultant rheumatologist and clinical immunologist.',
    eyebrow: 'Arthritis & allergy',
    cat: 'cat-brand',
    icon: 'joint',
    lede: 'Joint pain has many causes, and they are treated very differently. The first job of a consultation is to establish which kind of arthritis is present — or whether the problem is arthritis at all.',
    sections: [
      {
        heading: 'Arthritis is not one disease',
        body: [
          'Inflammatory arthritis, degenerative joint disease and crystal arthritis can all present as a painful, swollen joint, but they need different treatment and carry different long-term risks. Getting the distinction right early matters, because inflammatory arthritis can cause joint damage that is far easier to prevent than to reverse.',
          'Assessment combines the pattern of joint involvement, the timing of symptoms, examination findings and — where the clinical question requires it — blood tests and imaging.',
        ],
      },
      {
        heading: 'Forms of arthritis assessed and managed here',
        list: [
          'Rheumatoid arthritis',
          'Osteoarthritis',
          'Gout and other crystal arthritis',
          'Psoriatic arthritis',
          'Spondyloarthritis and inflammatory back pain',
          'Arthritis associated with connective tissue disease',
          'Undifferentiated arthritis, where a firm diagnosis has not yet emerged',
        ],
      },
      {
        heading: 'Allergy and immune-related symptoms',
        body: [
          'Allergy is assessed alongside rheumatology because both are questions about how the immune system is behaving. Many patients arrive having been told they have an allergy without that ever having been confirmed, or with reactions that turn out to have a different explanation.',
          'The aim is to establish whether an allergic or immune mechanism is genuinely present, and to avoid both missing a real disorder and over-investigating symptoms that have another cause.',
        ],
        list: [
          'Recurrent or unexplained allergic symptoms',
          'Drug reactions and drug allergy labels that have never been tested',
          'Food-related reactions and concerns',
          'Skin and respiratory allergic symptoms',
          'Abnormal allergy or immune blood tests',
        ],
      },
      {
        heading: 'What treatment may involve',
        body: [
          'Treatment is chosen to fit the diagnosis and the person. For inflammatory arthritis that usually means disease-modifying treatment with structured monitoring, alongside pain management and rehabilitation. For osteoarthritis the emphasis falls on pain control, movement, muscle strength and joint protection.',
          'Where medication is started, what it is for, how it will be monitored and what to watch for are explained before it begins.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How do I know if my joint pain is inflammatory?',
        a: 'Inflammatory joint pain typically comes with stiffness that is worse in the morning or after rest, lasts more than an hour, and improves with movement. Mechanical pain usually behaves the other way round. The distinction is made clinically, not by a blood test alone.',
      },
      {
        q: 'Do I need a rheumatologist for osteoarthritis?',
        a: 'Not always. A rheumatology opinion is useful where the diagnosis is uncertain, where inflammation may also be present, or where pain and function are not responding to initial management.',
      },
      {
        q: 'Can allergy testing tell me what I am allergic to?',
        a: 'Testing can support or argue against a suspected allergy, but results are only meaningful alongside the history of what actually happened. A positive test without matching symptoms does not by itself establish an allergy.',
      },
    ],
  },

  {
    slug: 'immunology-and-rheumatology-treatment-in-bangalore',
    navLabel: 'Immunology & Rheumatology',
    title: 'Immunology & Rheumatology Treatment',
    metaTitle: 'Immunology & Rheumatology Treatment, Bangalore',
    metaDescription:
      'Specialist care for autoimmune and immune-mediated disease in Indiranagar, Bangalore — lupus, vasculitis, myositis, connective tissue disease, immune dysregulation and unexplained inflammation.',
    eyebrow: 'Immunology & rheumatology',
    cat: 'cat-teal',
    icon: 'immune',
    lede: 'Immune-mediated disease rarely stays in one place. When symptoms cross several organ systems, or blood tests are abnormal without an obvious cause, the question is whether the immune system is driving it.',
    sections: [
      {
        heading: 'When an immunology opinion helps',
        body: [
          'Autoimmune and immune-mediated conditions can affect joints, skin, muscles, blood, nerves, lungs and kidneys, sometimes several at once. That pattern is often what first suggests an immune cause — and it is also why these cases are difficult to place with a single-organ specialist.',
          'Dr Deshpande holds a DM in Clinical Immunology & Rheumatology, a super-speciality qualification covering both, so allergy, immune dysregulation and multisystem illness are assessed here rather than referred onward.',
        ],
      },
      {
        heading: 'Conditions commonly seen',
        list: [
          'Systemic lupus erythematosus',
          'Sjögren’s disease',
          'Systemic sclerosis',
          'Inflammatory myositis',
          'Vasculitis',
          'Mixed and undifferentiated connective tissue disease',
          'Autoimmune blood disorders',
          'Autoimmune neurological conditions',
          'Immune dysregulation and unexplained inflammation',
        ],
      },
      {
        heading: 'A positive test is a starting point, not a diagnosis',
        body: [
          'Many patients are referred because of a positive ANA or another abnormal immune result. A positive test in the absence of matching symptoms and examination findings frequently turns out not to indicate disease at all.',
          'Investigations are interpreted in clinical context, and further tests are requested only when the answer would change what happens next. Establishing that no immune-mediated disease is present is a legitimate and useful outcome.',
        ],
      },
      {
        heading: 'Long-term management',
        body: [
          'Immune-mediated disease is usually managed over years rather than weeks. That means tracking disease activity, adjusting treatment as it changes, monitoring for medication side effects, and watching for the complications that particular conditions carry.',
          'Where more than one speciality is needed — pulmonology, nephrology, dermatology, neurology, haematology — care is coordinated rather than fragmented across separate appointments.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is the difference between rheumatology and clinical immunology?',
        a: 'Rheumatology focuses on inflammatory and autoimmune disease affecting joints, muscles and connective tissue. Clinical immunology covers immune system disorders more broadly, including allergy and immune dysregulation. The two overlap heavily, which is why they are a combined super-speciality in India.',
      },
      {
        q: 'Does a positive ANA mean I have lupus?',
        a: 'No. A positive ANA is common in people without any autoimmune disease and has to be interpreted alongside symptoms, examination and other findings. On its own it does not establish a diagnosis.',
      },
      {
        q: 'Will I need to take medication for life?',
        a: 'It depends on the condition. Some are controlled and treatment gradually reduced; others need long-term treatment to prevent damage. What is realistic for your diagnosis is discussed openly rather than left vague.',
      },
    ],
  },

  {
    slug: 'physiotherapy-clinic-in-bangalore',
    navLabel: 'Physiotherapy',
    title: 'Physiotherapy & Rehabilitation',
    metaTitle: 'Physiotherapy Clinic in Bangalore',
    metaDescription:
      'Physiotherapy and rehabilitation integrated with rheumatology care in Indiranagar, Bangalore. Mobility, strengthening, joint protection and functional recovery for arthritis and inflammatory disease.',
    eyebrow: 'Physiotherapy',
    cat: 'cat-fresh',
    icon: 'rehab',
    lede: 'Medication controls disease activity. Movement is what restores function. For most patients with arthritis or inflammatory disease, the two work together or neither works well.',
    sections: [
      {
        heading: 'Rehabilitation planned around the diagnosis',
        body: [
          'Physiotherapy for an inflamed joint is not the same as physiotherapy for a mechanical problem, and pushing the wrong programme can set a patient back. Because rehabilitation here is planned alongside the medical assessment, the programme reflects what is actually happening in the joint and where the disease currently sits.',
          'That also means it can be adjusted as disease activity changes rather than running to a fixed script.',
        ],
      },
      {
        heading: 'What a programme may focus on',
        list: [
          'Restoring and maintaining joint range of movement',
          'Strengthening the muscles that support affected joints',
          'Joint protection and techniques for daily tasks',
          'Posture and movement patterns',
          'Functional recovery after a flare or a period of immobility',
          'Maintaining independence in everyday activities',
          'Safe, graded return to work and physical activity',
        ],
      },
      {
        heading: 'Who it helps',
        body: [
          'Rehabilitation is useful across inflammatory arthritis, osteoarthritis, inflammatory back pain, myositis and chronic musculoskeletal pain — and for patients recovering function after a disease flare.',
          'It is equally relevant where no inflammatory disease is found: mechanical and soft-tissue problems often respond better to structured rehabilitation than to medication.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Should I exercise if my joints are painful?',
        a: 'Usually yes, but what kind and how much depends on whether the joint is actively inflamed. That is exactly the judgement a programme planned alongside your rheumatology assessment is meant to get right.',
      },
      {
        q: 'How long does rehabilitation take?',
        a: 'It varies with the condition, how long symptoms have been present and what function you are working back towards. Realistic expectations are set at the start rather than left open-ended.',
      },
    ],
  },

  {
    slug: 'pharmacy-service-in-bangalore',
    navLabel: 'Pharmacy',
    title: 'Pharmacy Support',
    metaTitle: 'Pharmacy Service in Bangalore',
    metaDescription:
      'Pharmacy support for rheumatology and immunology patients in Indiranagar, Bangalore — access to prescribed medicines, with counselling on how they are taken, stored and monitored.',
    eyebrow: 'Pharmacy',
    cat: 'cat-plum',
    icon: 'pharmacy',
    lede: 'Rheumatology treatment often involves medicines that are not stocked everywhere, taken on unusual schedules, and monitored with regular blood tests. Continuity matters more here than in most specialities.',
    sections: [
      {
        heading: 'Why it is part of the clinic',
        body: [
          'Treatment for inflammatory and autoimmune disease frequently depends on taking a medicine consistently over months or years. Gaps caused by a medicine being unavailable, or by confusion over how it should be taken, undo work that treatment has already done.',
          'Having pharmacy support alongside the consultation reduces the number of places a patient has to chase, and means questions about a prescription can be answered by people who can see why it was written.',
        ],
      },
      {
        heading: 'What this covers',
        list: [
          'Access to prescribed medicines where they are available',
          'Explanation of how and when each medicine should be taken',
          'Guidance on storage, including medicines that need refrigeration',
          'Clarity on which blood tests are due and when',
          'What to do about a missed dose',
          'Which side effects warrant contacting the clinic',
        ],
      },
      {
        heading: 'Monitoring is part of the prescription',
        body: [
          'Several of the medicines used in rheumatology require periodic blood monitoring for safety. Those requirements are explained when treatment starts and tracked alongside it, so monitoring does not quietly lapse.',
          'No medicine is dispensed without a valid prescription, and treatment decisions always rest with the treating doctor.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can I get my regular medicines here?',
        a: 'Prescribed medicines are available where stocked. If something is not held, the clinic will say so directly rather than leaving you to find out later.',
      },
      {
        q: 'Do I need a prescription?',
        a: 'Yes. Medicines are dispensed only against a valid prescription.',
      },
    ],
  },

  {
    slug: 'day-care-infusion-diagnostics-in-indiranagar',
    navLabel: 'Day Care Infusion & Diagnostics',
    title: 'Day Care Infusion & Diagnostics',
    metaTitle: 'Day Care Infusion & Diagnostics, Indiranagar',
    metaDescription:
      'Day care infusion therapy and diagnostic support for rheumatology and immunology patients in Indiranagar, Bangalore — supervised infusions and the laboratory tests that guide treatment.',
    eyebrow: 'Day care & diagnostics',
    cat: 'cat-teal',
    icon: 'lab',
    lede: 'Some treatments are given by infusion under supervision rather than taken at home. Having that happen where your rheumatologist works means the person overseeing it already knows your case.',
    sections: [
      {
        heading: 'Day care infusion',
        body: [
          'A number of treatments used in inflammatory and autoimmune disease are given intravenously at set intervals, with the patient observed during and after the infusion. These are day care procedures — you come in, the infusion is given under supervision, and you go home the same day.',
          'Before a first infusion, what the medicine is for, how long it takes, what is monitored during it and what to expect afterwards are all explained.',
        ],
      },
      {
        heading: 'What day care involves',
        list: [
          'Pre-infusion checks, including any blood tests required beforehand',
          'The infusion given under clinical supervision',
          'Observation during and after, for infusion-related reactions',
          'A record of what was given and when the next dose is due',
          'Clear instructions on what to watch for once you are home',
        ],
      },
      {
        heading: 'Diagnostic support',
        body: [
          'Rheumatology and immunology depend heavily on laboratory work, both to reach a diagnosis and to monitor treatment safely over time. Access to that testing alongside the consultation shortens the loop between a clinical question and an answer.',
          'The principle stays the same as everywhere else on this site: test when the clinical question requires it, not simply because a test is available. Every investigation should have a reason you can be told.',
        ],
        list: [
          'Inflammatory markers and disease activity monitoring',
          'Autoimmune serology, interpreted in clinical context',
          'Safety monitoring for disease-modifying and immunosuppressive treatment',
          'Baseline testing before starting a new treatment',
        ],
      },
    ],
    faqs: [
      {
        q: 'How long does an infusion take?',
        a: 'It depends on the medicine — some take under an hour, others several hours including the observation period afterwards. You will be told what to expect before the first one so you can plan the day.',
      },
      {
        q: 'Can I go home the same day?',
        a: 'Yes. These are day care procedures, with observation after the infusion before you leave.',
      },
      {
        q: 'Why do I need blood tests so often?',
        a: 'Several rheumatology treatments require periodic monitoring to catch side effects early, while they are still easily managed. The schedule is explained when treatment starts.',
      },
    ],
  },
]

/** Menu entries for the Services dropdown. */
export const serviceMenu = servicePages.map((p) => ({
  href: `/${p.slug}/`,
  label: p.navLabel,
}))
