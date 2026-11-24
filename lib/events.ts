/**
 * The next run of The Unstoppable You, shown in the registration section at the
 * bottom of /growth, the course section on the home page, the first-visit popup
 * and the registration/payment modal. Edit the values here to update them all.
 */
export const unstoppableYou = {
  // Sent with each Paystack payment so the server only confirms payments for
  // this run. Give every new run its own id.
  id: 'unstoppable-you-2027-01',
  title: 'The Unstoppable You',
  // Tagline and highlights are worded exactly as on the flyer.
  tagline: 'The Unstoppable You is the Growing You',
  highlights: ['Master Personal Transformation', 'Unlock Your Power', 'Enrich Your Life'],
  dates: 'Friday 8 & Saturday 9 January 2027',
  // The first-visit popup stops showing once this moment has passed.
  startsAt: '2027-01-08T10:00:00+01:00',
  time: '10:00am – 12:00pm WAT, both days',
  location: 'Live online. Joining link sent by email before the course begins',
  // Amount in Naira. Deliberately not shown anywhere on the site; visitors only
  // see it on the Paystack checkout screen.
  feeNaira: 25000,
  flyer: '/unstoppable-you-flyer.jpg',
  flyerAlt:
    'The Unstoppable You is the Growing You: a virtual course experience with Eden Chineze Ononye, January 8th & 9th, 2027. Master personal transformation, unlock your power, enrich your life.',
}

export const formatNaira = (amount: number) => `₦${amount.toLocaleString('en-US')}`

export const unstoppableYouDetails = [
  { label: 'Dates', value: unstoppableYou.dates },
  { label: 'Time', value: unstoppableYou.time },
  { label: 'Where', value: unstoppableYou.location },
]
