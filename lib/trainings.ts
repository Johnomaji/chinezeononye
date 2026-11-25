/**
 * The Signature Course Experiences and ways to engage, shown on both /growth and
 * /trainings. Edit them here to update both pages at once.
 */

export type SignatureCourse = {
  num: string
  title: string
  tagline: string
  body: string[]
  forYouIf?: string[]
  closing?: string
  format: string
  // Falls back to defaultAccountability when a course doesn't word it differently.
  accountability?: string
}

export const signatureCourses: SignatureCourse[] = [
  {
    num: '01',
    title: 'The Unstoppable You',
    tagline: 'The Unstoppable You is the Growing You',
    body: [
      'Your proven, practical pathway to wholesome personal transformation, personal power and a more enriched life.',
      'More than a Course Experience, The Unstoppable You equips you with a practical formula for lifelong growth and transformation - empowering you to continually unlock your potential, take intentional action, and create the outcomes you desire across different areas of your life.',
    ],
    forYouIf: [
      'feel stuck, stagnant or frustrated with your current reality.',
      'know you are capable of more but struggle to translate your potential to progress.',
      'desire greater clarity, confidence and direction.',
      'are ready to take ownership of your growth and create meaningful, lasting change.',
    ],
    closing: 'Who you are becoming is foundational to everything you do, including your wealth creation.',
    format: 'The Unstoppable You is a 2 - 3hrs 2 day interactive group Coaching Call.',
  },
  {
    num: '02',
    title: 'The Trophy Employee',
    tagline: 'Developing The Individual. Elevating Workplace Performance',
    body: [
      'The Trophy Employee is a Signature professional development experience built on the conviction that Organisational excellence is strengthened by the personal growth levels of the employees who drive it.',
      'Through a holistic, structured approach to individual development, the program engages the employee as a whole person, fostering the self-awareness, personal responsibility, mindset and capacity needed to thrive both personally and professionally.',
      'By connecting personal growth with workplace expectations and Organisational objectives, the experience equips employees to move beyond performing assigned duties to wholesomely engaging meaningfully, taking ownership and contributing to sustained Organisational excellence.',
    ],
    format: 'The Trophy Employee is a 4-hour 2 day Organization wide or Group Coaching call.',
  },
  {
    num: '03',
    title: 'Wow Them - Win Them',
    tagline: 'Where Personal Growth Translates into Service Excellence, Customer Loyalty and Revenue Growth',
    body: [
      'Wow Them - Win Them is a holistic Customer Service and support development experience designed to help organizations embed service excellence into their culture, strengthen customer relationships, retain their customer base and grow revenue.',
      'Recognizing that exceptional customer engagement is influenced by the employee delivering the service, the experience goes beyond operational service skills to engage the employee as a whole person.',
      'By integrating personal development with practical customer service strategies, the experience equips employees with empathy, professionalism, personal ownership and a genuine commitment to delivering value beyond just the task. This is because an employee cannot truly and lastingly give what he is not experiencing in his personal life.',
      'The result is a workforce better equipped to deliver consistently excellent customer experiences, build lasting customer relationships, strengthen customer loyalty and contribute to sustainable business growth.',
    ],
    format: 'The Wow Them - Win Them is a 4-hour 2 day Organization wide or Group Coaching call.',
  },
  {
    num: '04',
    title: 'The Onboarding that Shapens & Sharpens',
    tagline: 'Beyond Welcoming. Into Equipping. Towards Excellence.',
    body: [
      'The first formal contact with new employees is the best time to truly equip them towards excellence in the workplace. A time to equip them to position and align properly while serving at a higher scale.',
      'The quality of an employee’s contribution is influenced by the quality of the individual behind the position. Let’s strategically partner with you on this. Get the foundation right and the stage to soar is set.',
    ],
    format: 'The Onboarding that Shapens & Sharpens is a 3-hour 2 day Course Experience.',
    accountability:
      'A one-hour accountability session follows 90 days after for employees to feedback on experience thus far.',
  },
]

export const defaultAccountability =
  'A one-hour accountability session follows 90 days after strictly for participants to share feedback on growth thus far.'

export const engagements = [
  {
    title: 'Executive & Leadership Coaching',
    desc: 'One-on-one partnership with leaders carrying real weight — clarifying identity, sharpening vision, and building the inner structure the role demands.',
  },
  {
    title: 'Team & Organisational Training',
    desc: 'Structured sessions that build shared language and capability across a team, so growth and transformation become a shared culture rather than individual efforts.',
  },
  {
    title: 'Bespoke Growth Frameworks',
    desc: 'Frameworks designed around the specific institution — its people, pressures, and goals.',
  },
  {
    title: 'Institutional Advisory',
    desc: 'Advisory and advocacy work on the policies, systems, and environments that shape whether people in an institution are developed or merely managed.',
  },
  {
    title: 'Group Coaching Series',
    desc: 'A sustained series rather than a single sitting, layering structured growth on identity and value using proven strategies and tools; with accountability in place.',
  },
  {
    title: 'Keynotes & Masterclasses',
    desc: 'The Unstoppable You, delivered to a room — as a keynote that shifts the air or an extended masterclass that sends people home with tools.',
  },
]
