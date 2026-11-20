/**
 * The next run of The Unstoppable You, shown in the registration section at the
 * bottom of /growth and in its registration/payment modal. Edit the values here
 * to update both at once.
 */
export const unstoppableYou = {
  // Sent with each Paystack payment so the server only confirms payments for
  // this run. Give every new run its own id.
  id: 'unstoppable-you-2027-01',
  title: 'The Unstoppable You',
  tagline: 'The ‘Unstoppable’ You is the ‘Growing’ You!',
  summary:
    'Your proven, practical pathway to wholesome personal transformation, personal power and a more enriched life.',
  dates: 'Friday 8 & Saturday 9 January 2027',
  time: '10:00am – 12:00pm WAT, both days',
  location: 'Live online. Joining link sent by email after registration',
  // Amount in Naira. Deliberately not shown anywhere on the site; visitors only
  // see it on the Paystack checkout screen.
  feeNaira: 25000,
  flyer: '/unstoppable-you-flyer.jpg',
}

export const formatNaira = (amount: number) => `₦${amount.toLocaleString('en-US')}`

export const unstoppableYouDetails = [
  { label: 'Dates', value: unstoppableYou.dates },
  { label: 'Time', value: unstoppableYou.time },
  { label: 'Where', value: unstoppableYou.location },
]
