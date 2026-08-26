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
 * These live under /services/ — e.g. /services/arthritis-treatment-in-bangalore/.
 * Build every link with serviceHref() rather than writing the path by hand, so
 * the prefix lives in exactly one place.
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
    /** Trailing note rendered after the list — caveats, availability, context. */
    note?: string
  }[]
  /** Short answers shown as an FAQ block, also emitted as FAQPage schema. */
  faqs: { q: string; a: string }[]
}

export const servicePages: ServicePage[] = [
  {
    slug: 'arthritis-treatment-in-bangalore',
    navLabel: 'Arthritis',
    title: 'Arthritis Treatment',
    metaTitle: 'Arthritis Treatment in Bangalore',
    metaDescription:
      'Arthritis treatment in Indiranagar, Bangalore — assessment and personalised care for osteoarthritis, rheumatoid arthritis, inflammatory arthritis, joint pain and stiffness, from a consultant rheumatologist and clinical immunologist.',
    eyebrow: 'Arthritis',
    cat: 'cat-brand',
    icon: 'joint',
    lede: 'Living with arthritis can make simple everyday activities such as walking, climbing stairs, working, or even getting out of bed uncomfortable. At DIRA, we focus on helping patients understand their joint problems and receive personalised care based on their symptoms, condition, and overall health.',
    sections: [
      {
        heading: 'Comprehensive arthritis care at DIRA',
        body: [
          'Arthritis is not just one condition. It can affect people differently and may involve pain, stiffness, swelling, tenderness, or difficulty moving the affected joints. Early evaluation can help identify the underlying cause and guide an appropriate treatment plan.',
          'Our approach begins with understanding your symptoms, medical history, lifestyle, and joint-related concerns. Depending on your condition, your doctor may recommend appropriate clinical evaluation and investigations to understand the problem better.',
        ],
      },
      {
        heading: 'Conditions we help manage',
        body: [
          'Our arthritis care is designed for patients experiencing a range of joint and musculoskeletal concerns, including:',
        ],
        list: [
          'Osteoarthritis and age-related joint problems',
          'Rheumatoid arthritis',
          'Joint pain and stiffness',
          'Knee, shoulder, hip, and other joint problems',
          'Inflammatory arthritis',
          'Recurring joint swelling and discomfort',
          'Mobility difficulties associated with arthritis',
        ],
      },
      {
        heading: 'Personalised arthritis treatment',
        body: [
          'The right treatment depends on the type and severity of arthritis, the joints involved, and individual patient needs. No single treatment works for everyone with arthritis, so the aim is a care plan suited to your specific condition and daily needs.',
          'Treatment may include appropriate medicines, lifestyle guidance, physical activity or rehabilitation recommendations, and other clinically suitable approaches. Your doctor will explain the available options and help you understand the benefits, precautions, and expected outcomes of your treatment.',
          'The goal is not only to address joint discomfort but also to help you maintain mobility and manage your condition over the long term.',
        ],
      },
      {
        heading: 'Why choose DIRA',
        body: [
          'Good arthritis care starts with listening to the patient. The clinic provides a comfortable environment where you can openly discuss your pain, stiffness, movement difficulties, and other concerns.',
          'Our approach focuses on:',
        ],
        list: [
          'Individualised assessment and treatment planning',
          'Clear communication and patient education',
          'Practical guidance for managing joint health',
          'Ongoing monitoring when required',
          'A patient-centred approach to long-term arthritis management',
        ],
      },
      {
        heading: 'Take the first step towards better joint health',
        body: [
          'Persistent joint pain or stiffness should not be ignored or dismissed as a normal part of ageing. Getting the right evaluation can help you understand what is causing your symptoms and what treatment options may be appropriate.',
          'If you are looking for arthritis treatment in Bangalore, DIRA is here to support you with personalised care focused on your comfort, mobility, and overall well-being.',
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
        q: 'Is joint pain simply a normal part of getting older?',
        a: 'Some joint wear is common with age, but persistent pain, stiffness or swelling should not be dismissed as inevitable. An evaluation can establish what is actually causing the symptoms and whether treatment would help.',
      },
    ],
  },

  {
    slug: 'immunology-and-rheumatology-treatment-in-bangalore',
    navLabel: 'Immunology & Rheumatology',
    title: 'Immunology & Rheumatology Treatment',
    metaTitle: 'Immunology & Rheumatology Treatment, Bangalore',
    metaDescription:
      'Personalised immunology and rheumatology care in Indiranagar, Bangalore — rheumatoid arthritis, lupus and connective tissue disorders, psoriatic arthritis, ankylosing spondylitis, Sjögren’s disease, scleroderma, vasculitis and gout, assessed by a consultant rheumatologist and clinical immunologist.',
    eyebrow: 'Immunology & rheumatology',
    cat: 'cat-teal',
    icon: 'immune',
    lede: 'Autoimmune and rheumatic conditions can affect more than just your joints. Persistent joint pain, stiffness, swelling, fatigue, muscle discomfort, skin changes or unexplained inflammation may sometimes be linked to an underlying immune-system disorder.',
    sections: [
      {
        heading: 'Comprehensive immunology & rheumatology care',
        body: [
          'Rheumatology focuses on conditions affecting the joints, muscles, bones and connective tissues, while immunology helps understand disorders involving the body’s immune system. In autoimmune diseases, the immune system can mistakenly attack healthy tissues. Conditions such as rheumatoid arthritis, lupus, Sjögren’s disease, scleroderma and other inflammatory disorders may involve multiple parts of the body.',
          'At DIRA, we take a patient-focused approach to evaluating symptoms and identifying possible causes. Your consultation may include a detailed medical history, physical examination, and appropriate laboratory or imaging investigations when required.',
          'There is often no single test that can diagnose an autoimmune or rheumatic condition, so a complete clinical assessment is important.',
        ],
      },
      {
        heading: 'Conditions we help manage',
        body: [
          'Symptoms can vary significantly between individuals. Early medical evaluation can be particularly important when inflammatory or autoimmune disease is suspected, as timely treatment may help control inflammation and reduce the risk of long-term complications.',
        ],
        list: [
          'Rheumatoid arthritis',
          'Lupus and connective tissue disorders',
          'Psoriatic arthritis',
          'Ankylosing spondylitis and other inflammatory arthritis',
          'Sjögren’s disease',
          'Scleroderma',
          'Vasculitis and other immune-mediated conditions',
          'Gout and selected metabolic joint disorders',
          'Unexplained joint pain, swelling or prolonged stiffness',
        ],
      },
      {
        heading: 'Personalised treatment plans',
        body: [
          'There is no single treatment approach for every rheumatology or immunology condition. At DIRA, treatment recommendations are based on your diagnosis, symptoms, disease activity, medical history and individual needs.',
          'Depending on the condition, treatment may involve medicines to control inflammation or modify disease activity, along with lifestyle guidance, physical therapy or other supportive care when appropriate. Long-term conditions may also require regular monitoring and adjustments to treatment over time.',
          'Our aim is to help you better understand your condition, manage symptoms, protect joint and organ health where possible, and maintain your everyday quality of life.',
        ],
      },
      {
        heading: 'Why choose DIRA?',
        body: [
          'At DIRA, we believe effective care begins with listening carefully to each patient. We focus on clear communication and personalised treatment rather than taking a one-size-fits-all approach.',
        ],
        list: [
          'Detailed evaluation of symptoms and medical history',
          'Appropriate diagnostic assessment',
          'Individualised treatment planning',
          'Guidance for long-term disease management',
          'Regular monitoring when required',
          'Patient-friendly explanations about your condition and treatment',
        ],
      },
      {
        heading: 'Get the right care for your symptoms',
        body: [
          'If you have persistent joint pain, morning stiffness, recurring swelling, unexplained fatigue, or symptoms that may be related to an autoimmune condition, consulting a rheumatology specialist can help you understand what may be causing them.',
          'If you are looking for immunology and rheumatology treatment in Bangalore, DIRA provides personalised care designed around your health needs.',
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
      'Physiotherapy clinic in Indiranagar, Bangalore. Personalised assessment and rehabilitation for back and neck pain, knee and shoulder pain, arthritis, sports and ligament injuries, fractures and post-surgical recovery — planned alongside medical care.',
    eyebrow: 'Physiotherapy',
    cat: 'cat-fresh',
    icon: 'rehab',
    lede: 'Pain, stiffness, muscle weakness or difficulty moving can affect your work, your exercise, your sleep and your everyday activities. Whether you are recovering from an injury, managing joint pain or living with a long-term musculoskeletal condition, the right physiotherapy can improve movement and function.',
    sections: [
      {
        heading: 'Personalised physiotherapy care at DIRA',
        body: [
          'Physiotherapy is an important part of rehabilitation for many musculoskeletal conditions, including back pain, osteoarthritis, rheumatoid arthritis, fractures and other conditions that affect movement and mobility.',
          'Your physiotherapy begins with an assessment of your symptoms, movement, strength, flexibility and functional limitations. From that assessment, the team develops an individualised treatment and rehabilitation plan suited to your needs.',
          'The focus is not simply on managing discomfort. The aim is to improve mobility, build strength, restore confidence in movement, and help you return to your normal activities as safely as possible.',
        ],
      },
      {
        heading: 'Conditions physiotherapy can help with',
        body: [
          'Physiotherapy may be recommended for a wide range of conditions and recovery needs. It can also support people recovering from illness, injury or surgery, and those managing an age-related decline in physical function.',
        ],
        list: [
          'Back and neck pain',
          'Knee and shoulder pain',
          'Joint stiffness and mobility problems',
          'Arthritis-related movement difficulties',
          'Sports injuries',
          'Muscle and ligament injuries',
          'Post-surgical rehabilitation',
          'Recovery after fractures or other injuries',
          'Muscle weakness and reduced mobility',
          'Posture and movement-related problems',
        ],
      },
      {
        heading: 'Our approach to physiotherapy',
        body: [
          'Every patient is different, so treatment should not follow a one-size-fits-all approach. A plan is tailored to your condition, your physical ability, your recovery goals and the progress you make.',
          'Depending on what you need, your programme may include therapeutic exercise, mobility and flexibility work, strengthening, movement retraining, posture guidance and other appropriate rehabilitation techniques.',
          'Your physiotherapist can also give you guidance on exercises and daily activities that help you manage your condition and support your recovery outside the clinic.',
        ],
      },
      {
        heading: 'Rehabilitation planned alongside your medical care',
        body: [
          'Physiotherapy for an inflamed joint is not the same as physiotherapy for a mechanical problem, and pushing the wrong programme can set a patient back. Because rehabilitation here is planned alongside the medical assessment, the programme reflects what is actually happening in the joint.',
          'It can also be adjusted as your condition changes, rather than running to a fixed script.',
        ],
      },
      {
        heading: 'Why choose DIRA',
        body: [
          'Effective physiotherapy starts with understanding the person, not only the symptoms. The aim is to keep your treatment comfortable, clearly explained and focused on practical results — improving or maintaining how you function, so you can be as independent as possible in everyday life.',
        ],
        list: [
          'A detailed assessment before treatment begins',
          'Personalised rehabilitation plans',
          'Exercise-based physiotherapy',
          'Guidance for safe movement and daily activities',
          'Progress monitoring where it is needed',
          'Plain explanations of what is being done and why',
        ],
      },
    ],
    faqs: [
      {
        q: 'Should I exercise if my joints are painful?',
        a: 'Usually yes, but what kind and how much depends on whether the joint is actively inflamed. That is exactly the judgement a programme planned alongside your medical assessment is meant to get right.',
      },
      {
        q: 'How long does rehabilitation take?',
        a: 'It varies with the condition, how long symptoms have been present and what function you are working back towards. Realistic expectations are set at the start rather than left open-ended.',
      },
      {
        q: 'Do I need a referral to see a physiotherapist here?',
        a: 'No. You can book directly. If an assessment suggests an underlying inflammatory or immune-related condition, that can be evaluated in the same clinic.',
      },
    ],
  },

  {
    slug: 'pharmacy-service-in-bangalore',
    navLabel: 'Pharmacy',
    title: 'Pharmacy Service',
    metaTitle: 'Pharmacy Service in Bangalore',
    metaDescription:
      'Pharmacy service at DIRA Clinic, Indiranagar, Bangalore — convenient access to prescribed medicines, with careful prescription-based dispensing and clear medication guidance.',
    eyebrow: 'Pharmacy',
    cat: 'cat-plum',
    icon: 'pharmacy',
    lede: 'Getting the right medicines at the right time is an important part of your healthcare journey. Our pharmacy service is designed to make accessing prescribed medicines more convenient, while keeping patient safety and medication awareness at the centre of care.',
    sections: [
      {
        heading: 'Convenient pharmacy service at DIRA Clinic',
        body: [
          'Whether you are visiting the clinic for a consultation, managing a long-term condition, or following a treatment plan, having convenient access to your prescribed medicines can make healthcare simpler and more organised.',
          'Our pharmacy service supports patients by providing access to medicines prescribed by qualified healthcare professionals. We aim to make the process simple, reliable and comfortable for patients and their families.',
          'Every prescription should be reviewed carefully to ensure that the medicine, dose, dosage form, route and intended use are appropriate. Proper dispensing and clear medicine labelling are also important aspects of medication safety.',
          'We encourage patients to understand their medicines and to follow the instructions provided by their doctor or healthcare professional.',
        ],
      },
      {
        heading: 'Medicines for your healthcare needs',
        body: [
          'Our pharmacy service can support patients receiving treatment for a variety of healthcare needs, subject to prescription and availability. This may include medicines prescribed for:',
        ],
        list: [
          'Arthritis and rheumatology conditions',
          'Autoimmune and inflammatory conditions',
          'Pain and musculoskeletal problems',
          'Other conditions managed through DIRA Clinic',
          'Ongoing or long-term treatment plans',
        ],
        note: 'The availability of medicines may vary, and prescription medicines are provided in accordance with applicable requirements.',
      },
      {
        heading: 'Focus on medication safety',
        body: [
          'Taking medicines correctly is an important part of effective treatment. Medication errors can sometimes occur because of similar medicine names, incorrect doses, unclear instructions, or confusion about how a medicine should be taken. Healthcare guidance recommends appropriate checks during dispensing, and clear patient education about medicines.',
          'Our pharmacy service aims to support patients with clear information about their prescribed medicines, including the instructions provided by the treating doctor. If you have questions about a medicine, its dosage, timing, or any concern you have about it, discuss them with your doctor or pharmacist rather than changing your medication on your own.',
        ],
      },
      {
        heading: 'Why choose DIRA Clinic pharmacy?',
        body: [
          'We understand that patients value convenience as well as dependable healthcare support. Having pharmacy services within a clinical setting can make it easier to continue your treatment plan after your consultation.',
          'Our approach focuses on:',
        ],
        list: [
          'Convenient access to prescribed medicines',
          'Careful prescription-based dispensing',
          'Patient-friendly medication guidance',
          'Attention to medicine storage and handling',
          'Support for patients managing ongoing treatment',
          'A coordinated healthcare experience',
        ],
        note: 'Medicines are an important part of patient care, and maintaining appropriate standards for their quality, safety and distribution is a key part of India’s healthcare regulatory framework.',
      },
      {
        heading: 'Pharmacy support in Bangalore',
        body: [
          'Managing healthcare can involve consultations, investigations, prescriptions and regular medicines. Our pharmacy service is intended to make this experience more convenient by bringing medication access closer to your healthcare journey.',
          'If you are looking for a pharmacy service in Bangalore, DIRA Clinic provides a patient-focused and convenient option for accessing prescribed medicines as part of your overall care.',
          'Visit DIRA Clinic or speak with our team to learn more about our pharmacy services and medicine availability.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do I need a prescription?',
        a: 'Yes. Prescription medicines are dispensed only against a valid prescription, in accordance with applicable requirements.',
      },
      {
        q: 'Will you have my medicine in stock?',
        a: 'Availability varies. If something is not held, the clinic will tell you directly rather than leaving you to find out later.',
      },
      {
        q: 'Who do I ask if I am unsure about a medicine?',
        a: 'Speak to your doctor or the pharmacist about the medicine, its dosage or timing, or any concern you have about it. Do not change or stop a prescribed medicine on your own.',
      },
    ],
  },

  {
    slug: 'day-care-infusion-diagnostics-in-indiranagar',
    navLabel: 'Day Care Infusion & Diagnostics',
    title: 'Day Care Infusion & Diagnostics',
    metaTitle: 'Day Care Infusion & Diagnostics, Indiranagar',
    metaDescription:
      'Day care infusion and diagnostic services at DIRA Clinic, Indiranagar, Bangalore — planned, medically supervised infusion therapy and the investigations that support ongoing treatment, without an overnight hospital stay.',
    eyebrow: 'Day care & diagnostics',
    cat: 'cat-teal',
    icon: 'lab',
    lede: 'Managing a chronic condition or undergoing regular treatment can mean several hours in a hospital, or repeated visits for investigations and therapy. Our day care service is designed to make planned treatment and essential investigations more convenient and comfortable, without the need for an overnight stay.',
    sections: [
      {
        heading: 'What is day care infusion therapy?',
        body: [
          'Day care infusion therapy involves administering prescribed medicines or fluids through an intravenous route under appropriate medical supervision. Depending on the patient’s condition and treatment plan, certain therapies can be provided in a monitored day care setting rather than as an inpatient.',
          'Infusion therapy may be recommended for selected patients with rheumatological, autoimmune, inflammatory or other chronic conditions. Whether it is suitable depends on the diagnosis, the prescribed medication, the medical history and individual patient requirements.',
          'At DIRA Clinic, the treatment plan is determined by the treating doctor, and patients are monitored during the infusion as appropriate.',
        ],
      },
      {
        heading: 'Diagnostic services at DIRA Clinic',
        body: [
          'Accurate diagnosis and regular monitoring are important parts of managing many chronic and inflammatory conditions. Diagnostic investigations may help doctors understand a patient’s condition, assess disease activity, monitor the response to treatment, or evaluate overall health.',
          'Depending on your medical requirements, investigations may include appropriate blood tests and other diagnostic assessments recommended by your healthcare professional.',
          'We aim to make the process straightforward by coordinating investigations with your ongoing clinical care wherever appropriate.',
        ],
      },
      {
        heading: 'Comfortable and convenient day care',
        body: [
          'We understand that patients receiving recurring treatment value comfort, safety and convenience. Our day care service is designed to provide a calm setting in which patients can receive planned care while remaining under appropriate medical supervision.',
          'A typical visit may include:',
        ],
        list: [
          'Review of your treatment plan and medical history',
          'Appropriate pre-treatment assessment',
          'Administration of prescribed infusion therapy when indicated',
          'Monitoring during treatment',
          'Diagnostic investigations when required',
          'Post-treatment guidance and follow-up recommendations',
        ],
        note: 'The exact process and its duration can vary depending on the treatment and individual patient needs.',
      },
      {
        heading: 'Who may benefit from day care services?',
        body: [
          'Day care infusion and diagnostic services may be suitable for patients who require planned, medically supervised treatment but do not need hospital admission. This can be particularly convenient for patients undergoing recurring treatment or monitoring for a chronic condition.',
          'Your doctor will determine whether day care treatment is appropriate, based on your diagnosis, medication, medical history and current health status.',
        ],
      },
      {
        heading: 'Why choose DIRA Clinic?',
        body: [
          'We believe healthcare should be organised around the needs of the patient. Our day care services are designed to combine medical supervision with a comfortable and convenient care experience.',
          'Our approach focuses on:',
        ],
        list: [
          'Personalised treatment planning',
          'Appropriate medical assessment before treatment',
          'Supervised infusion care',
          'Convenient diagnostic support',
          'Patient-friendly communication',
          'Follow-up and ongoing care when required',
        ],
        note: 'By bringing treatment and diagnostic support together, we aim to reduce unnecessary inconvenience for patients who require regular medical care.',
      },
      {
        heading: 'Day care infusion and diagnostics in Indiranagar',
        body: [
          'If you have been advised infusion therapy, regular investigations or ongoing monitoring as part of your treatment, DIRA Clinic can help you understand the process and the care options available to you.',
          'If you are looking for day care infusion and diagnostics in Indiranagar, Bangalore, DIRA Clinic provides a patient-focused setting for planned treatment and diagnostic support.',
          'Contact the clinic to discuss your treatment requirements and arrange an appointment.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How long does an infusion take?',
        a: 'It depends on the medicine — some take under an hour, others several hours including the observation period afterwards. You will be told what to expect beforehand so that you can plan the day.',
      },
      {
        q: 'Can I go home the same day?',
        a: 'Yes. These are day care procedures, with observation after the infusion before you leave. No overnight stay is involved.',
      },
      {
        q: 'How do I know whether day care infusion is right for me?',
        a: 'That is decided by the treating doctor, based on your diagnosis, the medication prescribed, your medical history and your current health. If infusion therapy has been advised elsewhere, bring the prescription and previous records to the consultation.',
      },
      {
        q: 'Why do I need blood tests so often?',
        a: 'Investigations are used to assess disease activity, monitor the response to treatment and check overall health while treatment continues. Which tests are needed, and how often, is decided by the treating doctor.',
      },
    ],
  },
]

/** The one place the /services/ prefix is defined. */
export const SERVICES_BASE = '/services'

/** Canonical path for a service page. Always use this rather than a literal. */
export function serviceHref(slug: string): string {
  return `${SERVICES_BASE}/${slug}/`
}

/** Menu entries for the Services dropdown. */
export const serviceMenu = servicePages.map((p) => ({
  href: serviceHref(p.slug),
  label: p.navLabel,
}))
