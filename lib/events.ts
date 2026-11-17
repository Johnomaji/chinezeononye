/**
 * The next run of The Unstoppable You, shown in the registration section at the
 * bottom of /growth and in its registration/payment modal. Edit the values here
 * to update both at once.
 *
 * TODO: `dates`, `time` and `feeNaira` are PLACEHOLDERS — replace them with the
 * real details before this goes live.
 */
export const unstoppableYou = {
  title: 'The Unstoppable You',
  tagline: 'The ‘Unstoppable’ You is the ‘Growing’ You!',
  summary:
    'Your proven, practical pathway to wholesome personal transformation, personal power and a more enriched life.',
  dates: 'Saturday 16 & Sunday 17 January 2027', // PLACEHOLDER
  time: '10:00am – 1:00pm WAT, both days', // PLACEHOLDER
  location: 'Live online. Joining link sent by email after registration',
  // PLACEHOLDER — amount in Naira. Deliberately not shown anywhere on the site;
  // visitors only see it on the Paystack checkout screen.
  feeNaira: 25000,
  flyer: '/unstoppable-you-flyer.png',
}

export const formatNaira = (amount: number) => `₦${amount.toLocaleString('en-US')}`

export const unstoppableYouDetails = [
  { label: 'Dates', value: unstoppableYou.dates },
  { label: 'Time', value: unstoppableYou.time },
  { label: 'Where', value: unstoppableYou.location },
]
